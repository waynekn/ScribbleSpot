import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUserProfile, User } from "../../api-requests/requests";
import { AuthError } from "../../api-requests/request-errors/errors";

type ProfileState = User & {
  isLoading: boolean;
};

/**
 * The value of the navigate key is the function returned from react-router-dom's
 * useNavigate() hook. It's used to navigate the user to authenticate themselves if
 * they are not authenticated i.e; when an AuthError occurs.
 */
type FetchUserProfilePayload = {
  userName: string;
  navigate: Function;
};

export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (payload: FetchUserProfilePayload, { rejectWithValue }) => {
    try {
      const profile = await getUserProfile(payload.userName);
      return profile;
    } catch (error) {
      if (error instanceof AuthError) {
        payload.navigate();
      } else if (error instanceof Error) {
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
  likedBlogs: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state: ProfileState) => {
        state.isLoading = true;
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state: ProfileState, action: PayloadAction<User>) => {
          const newProfileState: ProfileState = {
            ...action.payload,
            isLoading: false,
          };
          return newProfileState;
        }
      )
      .addCase(fetchUserProfile.rejected, (state: ProfileState, action) => {
        state.isLoading = false;
      });
  },
});

export const profileReducer = profileSlice.reducer;
