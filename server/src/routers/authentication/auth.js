const express = require("express");
const passport = require("passport");
require("dotenv").config();
const { Strategy } = require("passport-google-oauth20");
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
module.exports = authRouter;
