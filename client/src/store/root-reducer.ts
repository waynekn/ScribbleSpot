import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./user/user.slice";
import { blogReducer } from "./blog/blog-post.slice";
import { profileReducer } from "./profile/profile.slice";

export const rootReducer = combineReducers({
  user: userReducer,
  postBlog: blogReducer,
  profile: profileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
