import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import { Strategy } from "passport-google-oauth20";
dotenv.config();

const authRouter = express.Router();

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};

const AUTH_OPTIONS = {
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
};

const verfiyCallback = (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  done(null, profile);
};

passport.use(new Strategy(AUTH_OPTIONS, verfiyCallback));

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google",
    successRedirect: "/",
    session: false,
  })
);
export default authRouter;
