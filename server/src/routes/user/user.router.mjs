import express from "express";
import { fetchUserProfile } from "./user.controller.mjs";

const userRouter = express.Router();

userRouter.get("/profile", fetchUserProfile);

export default userRouter;
