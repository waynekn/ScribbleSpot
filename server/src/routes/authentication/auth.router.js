import express from "express";
import {
  googleAuth,
  googleCallback,
  signOutUser,
} from "../../auth-providers/google/google.auth.js";

const authRouter = express.Router();

authRouter.get("/google/signin", (req, res, next) => {
  googleAuth(req, res, next, "signin");
});

authRouter.get("/google/signup", (req, res, next) => {
  googleAuth(req, res, next, "signup");
});

authRouter.get("/google/callback", googleCallback);

authRouter.post("/logout", signOutUser);

export default authRouter;
