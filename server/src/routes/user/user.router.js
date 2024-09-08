import express from "express";

import {
  getUserProfile,
  updateProfile,
  getImageUrl,
} from "../../controllers/user/user.controller.js";
import { processForm } from "../../middleware/multer/multer.js";

const userRouter = express.Router();

userRouter.all("/profile", getUserProfile);
userRouter.post("/profile/update", processForm, updateProfile);
userRouter.post("/profile/profile-picture", getImageUrl);

export default userRouter;
