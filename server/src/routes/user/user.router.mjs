import express from "express";

import {
  fetchUserProfile,
  updateProfile,
} from "../../controllers/user.controller.mjs";

const userRouter = express.Router();

userRouter.get("/profile", fetchUserProfile);
userRouter.post("/profile", updateProfile);

export default userRouter;
