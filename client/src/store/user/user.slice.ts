import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUserProfile } from "../../api-requests/requests";
import { User } from "../../api-requests/requests";

export type CurrentUser = User & {
  isLoggedIn: boolean;
  isLoading: boolean;
  notificationMessage: string | null;
};

const initialState: CurrentUser = {
  email: "",
  userName: "",
  profilePicture: "",
  dateJoined: new Date(),
  isLoggedIn: false,
  isLoading: false,
  notificationMessage: null,
};

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserProfile();
      const { profile } = res;
      const currentUser: CurrentUser = {
        ...profile,
        isLoggedIn: false,
        isLoading: false,
        notificationMessage: null,
      };
      return currentUser;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
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
      .addCase(fetchCurrentUser.pending, (state: CurrentUser) => {
        state.isLoading = true;
        state.notificationMessage = null;
      })
      .addCase(
        fetchCurrentUser.fulfilled,
        (state, action: PayloadAction<CurrentUser>) => {
          return {
            ...action.payload,
            isLoggedIn: true,
            isLoading: false,
            notificationMessage: null,
          };
        }
      )
      .addCase(fetchCurrentUser.rejected, (state: CurrentUser, action) => {
        state.isLoading = false;
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
