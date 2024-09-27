import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUserProfile } from "../../api-requests/requests";
import { User } from "../../api-requests/requests";

type ProfileState = User & {
  isLoading: boolean;
};

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (userName: string, { rejectWithValue }) => {
    try {
      const { profile } = await getUserProfile(userName);
      return profile;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occured");
    }
  }
);

const initialState: ProfileState = {
  email: "",
  userName: "",
  profilePicture: "",
  dateJoined: "",
  isLoading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state: ProfileState) => {
        state.isLoading = true;
      })
      .addCase(
        fetchProfile.fulfilled,
        (state: ProfileState, action: PayloadAction<User>) => {
          const newProfileState: ProfileState = {
            ...action.payload,
            isLoading: false,
          };
          return newProfileState;
        }
      )
      .addCase(fetchProfile.rejected, (state: ProfileState, action) => {
        state.isLoading = false;
      });
  },
});

export const profileReducer = profileSlice.reducer;
