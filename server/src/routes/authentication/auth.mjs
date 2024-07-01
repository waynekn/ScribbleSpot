import express from "express";
import {
  googleAuth,
  googleCallback,
} from "../../auth-providers/google/google.auth.mjs";

const authRouter = express.Router();

authRouter.get("/google", googleAuth);
authRouter.get("/google/callback", googleCallback);

export default authRouter;
