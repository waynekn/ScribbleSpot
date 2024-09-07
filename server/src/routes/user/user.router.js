import express from "express";

import {
  getUserProfile,
  updateProfile,
  getImageUrl,
} from "../../controllers/user/user.controller.js";
import { processForm } from "../../middleware/multer/multer.js";

const userRouter = express.Router();

userRouter.post("/profile", getUserProfile);
userRouter.post("/profile", processForm, updateProfile);
userRouter.post("/profile/profile-picture", getImageUrl);

export default userRouter;
