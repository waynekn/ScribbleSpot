import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./user/user.slice";

export const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
