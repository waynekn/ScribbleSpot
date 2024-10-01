import express from "express";

import {
  getUserProfile,
  updateProfile,
  getImageUrl,
  getUserNameSuggestions,
} from "../../controllers/user/user.controller.js";
import { processForm } from "../../middleware/multer/multer.js";

const userRouter = express.Router();

userRouter.post("/", getUserNameSuggestions);
/**
 * Handle all requests to the /profile endpoint.
 * After successful authentication, the client does not have a username available for POST requests.
 * The username is retrieved from the cookie issued during authentication.
 */
userRouter.all("/profile", getUserProfile);
userRouter.post("/profile/update", processForm, updateProfile);
userRouter.post("/profile/profile-picture", getImageUrl);

export default userRouter;
