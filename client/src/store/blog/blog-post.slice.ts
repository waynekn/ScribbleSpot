import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uploadContent } from "../../api-requests/requests";

type BlogState = {
  notification: string | null;
  isLoading: boolean;
};

const initialState: BlogState = {
  notification: null,
  isLoading: false,
};

type Doc = {
  title: string;
  blogContent: string;
};

export const postBlog = createAsyncThunk(
  "blog/postBlog",
  async (doc: Doc, { rejectWithValue }) => {
    try {
      const title = doc.title;
      const blogContent = doc.blogContent;
      const response = await uploadContent(title, blogContent);
      return response.message;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setNotificationMessage(state: BlogState, action: PayloadAction<string>) {
      state.notification = action.payload;
    },
    clearNotificationMessage(state: BlogState) {
      state.notification = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postBlog.pending, (state: BlogState) => {
        state.isLoading = true;
        state.notification = null;
      })
      .addCase(
        postBlog.fulfilled,
        (state: BlogState, action: PayloadAction<string>) => {
          (state.isLoading = false), (state.notification = action.payload);
        }
      )
      .addCase(postBlog.rejected, (state: BlogState, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.notification = action.payload;
        } else {
          state.notification = "An error occurred";
        }
      });
  },
});

export const { setNotificationMessage, clearNotificationMessage } =
  blogSlice.actions;

export const blogReducer = blogSlice.reducer;
