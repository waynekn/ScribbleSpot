import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./user/user.slice";
import { blogReducer } from "./blog/blog-post.slice";

export const rootReducer = combineReducers({
  user: userReducer,
  postBlog: blogReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
