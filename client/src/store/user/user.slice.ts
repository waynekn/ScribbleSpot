import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUserProfile } from "../../api-requests/requests";
import { User } from "../../api-requests/requests";

export type CurrentUser = User & {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: CurrentUser = {
  email: "",
  displayName: "",
  profilePicture: "",
  dateJoined: new Date(),
  isLoggedIn: false,
  isLoading: false,
  error: null,
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
        error: null,
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
    updateCurrentUser(
      state: CurrentUser,
      action: PayloadAction<Partial<CurrentUser>>
    ) {
      return { ...state, ...action.payload };
    },
    clearCurrentUser() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state: CurrentUser) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCurrentUser.fulfilled,
        (state, action: PayloadAction<CurrentUser>) => {
          return {
            ...action.payload,
            isLoggedIn: true,
            isLoading: false,
            error: null,
          };
        }
      )
      .addCase(fetchCurrentUser.rejected, (state: CurrentUser, action) => {
        state.isLoading = false;
      });
  },
});

export const { updateCurrentUser, clearCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
