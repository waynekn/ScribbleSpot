import express from "express";

import {
  fetchUserProfile,
  updateProfile,
} from "../../controllers/user.controller.mjs";
import { processForm } from "../../middleware/multer/multer.mjs";

const userRouter = express.Router();

userRouter.get("/profile", fetchUserProfile);
userRouter.post("/profile", processForm, updateProfile);

export default userRouter;
