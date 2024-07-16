import express from "express";
import {
  googleAuth,
  googleCallback,
} from "../../auth-providers/google/google.auth.mjs";

const authRouter = express.Router();

authRouter.get("/google/signin", (req, res, next) => {
  googleAuth(req, res, next, "signin");
});
authRouter.get("/google/signup", (req, res, next) => {
  googleAuth(req, res, next, "signup");
});
authRouter.get("/google/callback", googleCallback);

export default authRouter;
