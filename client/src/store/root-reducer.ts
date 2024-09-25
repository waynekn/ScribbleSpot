import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./user/user.slice";
import { blogReducer } from "./blog/blog.slice";
import { profileReducer } from "./profile/profile.slice";

export const rootReducer = combineReducers({
  user: userReducer,
  blog: blogReducer,
  profile: profileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
