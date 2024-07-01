import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
dotenv.config();

const config = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

const AUTH_OPTIONS = {
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
};

const verifyCallback = (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  done(null, profile);
};

passport.use(new GoogleStrategy(AUTH_OPTIONS, verifyCallback));

export const googleAuth = passport.authenticate("google", {
  scope: ["email"],
});

export const googleCallback = passport.authenticate("google", {
  failureRedirect: "/auth/google",
  successRedirect: "/",
  session: false,
});
