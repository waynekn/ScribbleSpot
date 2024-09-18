import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  uploadBlog,
  deleteBlogRequest,
  fetchBlogContent,
  BlogContent,
} from "../../api-requests/requests";

type BlogState = {
  notification: string | null;
  isLoading: boolean;
  title: string | null;
  userName: string | null;
  content: string | null;
  datePosted: string;
};

const initialState: BlogState = {
  notification: null,
  isLoading: false,
  title: null,
  userName: null,
  content: null,
  datePosted: new Date().toISOString(),
};

type Blog = {
  title: string;
  blogContent: string;
};

type FetchBlogContentPayload = {
  titleSlug: string;
  userName: string;
};

export const postBlog = createAsyncThunk(
  "blog/postBlog",
  async (doc: Blog, { rejectWithValue }) => {
    try {
      const title = doc.title;
      const blogContent = doc.blogContent;
      const response = await uploadBlog(title, blogContent);
      return response.message;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

export const deleteBlogByTitle = createAsyncThunk(
  "blog/deleteBlogByTitle",
  async (title: string, { rejectWithValue }) => {
    try {
      const response = await deleteBlogRequest(title);
      return response.message;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const getBlog = createAsyncThunk(
  "blog/getBlog",
  async (payload: FetchBlogContentPayload, { rejectWithValue }) => {
    try {
      const { blog } = await fetchBlogContent(
        payload.titleSlug,
        payload.userName
      );
      return blog;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occured");
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
      /**
       * postBlog thunk
       **/
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
      })
      /**
       * deleteBlogByTitle thunk
       */
      .addCase(deleteBlogByTitle.pending, (state: BlogState) => {
        state.isLoading = true;
        state.notification = null;
      })
      .addCase(
        deleteBlogByTitle.fulfilled,
        (state: BlogState, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.notification = action.payload;
        }
      )
      .addCase(deleteBlogByTitle.rejected, (state: BlogState, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.notification = action.payload;
        } else {
          state.notification = "An error occurred";
        }
      })
      /*
       * getBlog thunk
       */
      .addCase(getBlog.pending, (state: BlogState) => {
        state.isLoading = true;
        state.notification = null;
      })
      .addCase(
        getBlog.fulfilled,
        (state: BlogState, action: PayloadAction<BlogContent>) => {
          const newState: BlogState = {
            ...action.payload,
            isLoading: false,
            notification: null,
          };
          return newState;
        }
      )
      .addCase(getBlog.rejected, (state: BlogState, action) => {
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
