import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getUserProfile,
  User,
  sendLocalAuthRequest,
} from "../../api-requests/requests";

export type CurrentUser = User & {
  isLoggedIn: boolean;
  isLoading: boolean;
  notificationMessage: string | null;
};

type SignInUser = {
  emailOrUsername: string;
  password: string;
  action: "signin";
};

type SignUpUser = {
  email: string;
  userName: string;
  password: string;
  action: "signup";
};

export type AuthCredentials = SignInUser | SignUpUser;

const initialState: CurrentUser = {
  email: "",
  userName: "",
  profilePicture: "",
  dateJoined: "",
  isLoggedIn: false,
  isLoading: false,
  notificationMessage: null,
  likedBlogs: [],
};

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserProfile();
      const { profile } = res;
      return profile;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

/*
 * Local is used technically as in not using other oauth providers
 * Used to sign in user of type SignInUser or
 * sign up a user of type SignUpUser
 */
export const authenticateLocalUser = createAsyncThunk(
  "user/authenticateLocalUser",
  async (user: AuthCredentials, { rejectWithValue }) => {
    try {
      const { profile } = await sendLocalAuthRequest(user);
      return profile;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearCurrentUser() {
      return initialState;
    },
    setCurrentUserNotificationMessage(
      state: CurrentUser,
      action: PayloadAction<string>
    ) {
      state.notificationMessage = action.payload;
    },
    clearCurrentUserNotificationMessage(state: CurrentUser) {
      state.notificationMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /**
       * fetchCurrentUser thunk
       */
      .addCase(fetchCurrentUser.pending, (state: CurrentUser) => {
        state.isLoading = true;
        state.notificationMessage = null;
      })
      .addCase(
        fetchCurrentUser.fulfilled,
        (state: CurrentUser, action: PayloadAction<User>) => {
          const user: CurrentUser = {
            ...action.payload,
            isLoggedIn: true,
            isLoading: false,
            notificationMessage: null,
          };
          return user;
        }
      )
      .addCase(fetchCurrentUser.rejected, (state: CurrentUser, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.notificationMessage = action.payload;
        } else {
          state.notificationMessage = "An unknown error occurred";
        }
      })
      /**
       *authenticateLocalUser thunk
       */
      .addCase(authenticateLocalUser.pending, (state: CurrentUser) => {
        state.isLoading = true;
        state.notificationMessage = null;
      })
      .addCase(
        authenticateLocalUser.fulfilled,
        (state: CurrentUser, action: PayloadAction<User>) => {
          const newUser: CurrentUser = {
            ...action.payload,
            isLoading: false,
            isLoggedIn: true,
            notificationMessage: null,
          };
          return newUser;
        }
      )
      .addCase(authenticateLocalUser.rejected, (state: CurrentUser, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        if (typeof action.payload === "string") {
          state.notificationMessage = action.payload;
        } else {
          state.notificationMessage = "An unknown error occurred";
        }
      });
  },
});

export const {
  clearCurrentUser,
  setCurrentUserNotificationMessage,
  clearCurrentUserNotificationMessage,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
