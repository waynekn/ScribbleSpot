import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  uploadBlog,
  deleteBlogRequest,
  fetchBlogContent,
  BlogContent,
  BlogReaction,
  BlogReactionResponse,
  submitBlogReaction,
} from "../../api-requests/requests";

type BlogState = {
  notification: string | null;
  isLoading: boolean;
  title: string | null;
  userName: string | null;
  content: string | null;
  datePosted: string;
  _id: string;
  likeCount: number;
  userHasLikedBlog: boolean;
  userHasDislikedBlog: boolean;
};

const initialState: BlogState = {
  notification: null,
  isLoading: false,
  title: null,
  userName: null,
  content: null,
  datePosted: new Date().toISOString(),
  _id: "",
  likeCount: 0,
  userHasLikedBlog: false,
  userHasDislikedBlog: false,
};

type Blog = {
  title: string;
  blogContent: string;
};

export const postBlog = createAsyncThunk(
  "blog/postBlog",
  async (doc: Blog, { rejectWithValue }) => {
    try {
      const title = doc.title;
      const blogContent = doc.blogContent;
      const result = await uploadBlog(title, blogContent);
      return result;
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
      const result = await deleteBlogRequest(title);
      return result;
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
  async (blogId: string, { rejectWithValue }) => {
    try {
      const blog = await fetchBlogContent(blogId);
      return blog;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occured");
    }
  }
);

/**
 * This thunk sends the users reaction to a blog which is either a like or
 * dislike to the server. The reaction is sent along with the ID of the
 * blog which the server will use to determine which blog the reaction is meant
 * for.
 */
export const handleBlogReaction = createAsyncThunk(
  "blog/blogReaction",
  async (reaction: BlogReaction) => {
    const blogReactionResponse = await submitBlogReaction(reaction);
    return blogReactionResponse;
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogNotificationMessage(
      state: BlogState,
      action: PayloadAction<string>
    ) {
      state.notification = action.payload;
    },
    clearBlogNotificationMessage(state: BlogState) {
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
      })
      /**
       * handleBlogReaction thunk.
       * it wont have a case for pending because the UI doesnt need to be updated for pending
       * state as the request to like or dislike should be behind the scenes
       */
      .addCase(
        handleBlogReaction.fulfilled,
        (state: BlogState, action: PayloadAction<BlogReactionResponse>) => {
          state.likeCount = action.payload.likeCount;
          state.userHasLikedBlog = action.payload.userHasLikedBlog;
          state.userHasDislikedBlog = action.payload.userHasDislikedBlog;
        }
      )
      .addCase(handleBlogReaction.rejected, (state: BlogState, action) => {
        if (typeof action.payload === "string") {
          state.notification = action.payload;
        } else {
          state.notification = "Unknown error";
        }
      });
  },
});

export const { setBlogNotificationMessage, clearBlogNotificationMessage } =
  blogSlice.actions;

export const blogReducer = blogSlice.reducer;
