import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile } from "../../api-requests/requests";

const INITIAL_USER_STATE = {
  email: "",
  displayName: "",
  profilePicture: "",
  dateJoined: "",
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserProfile();
      return res.data.profile;
    } catch (error) {
      const value = error.response?.data?.error || error.message;
      return rejectWithValue(value);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_USER_STATE,
  reducers: {
    updateCurrentUser(state, action) {
      console.log(state);
      console.log(action);
      return { ...state, ...action.payload };
    },
    clearCurrentUser() {
      return INITIAL_USER_STATE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        return { ...action.payload, isLoggedIn: true, isLoading: false };
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { updateCurrentUser, clearCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
