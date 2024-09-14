import express from "express";
import {
  googleAuth,
  googleCallback,
  signOutUser,
} from "../../auth/google/google.auth.js";
import {
  signInLocalUser,
  signUpLocalUser,
} from "../../auth/local/local.auth.js";

const authRouter = express.Router();

authRouter.get("/google/signin", (req, res, next) => {
  googleAuth(req, res, next, "signin");
});

authRouter.get("/google/signup", (req, res, next) => {
  googleAuth(req, res, next, "signup");
});

authRouter.get("/google/callback", googleCallback);

authRouter.post("/local/signin", signInLocalUser);
authRouter.post("/local/signup", signUpLocalUser);

authRouter.post("/logout", signOutUser);

export default authRouter;
