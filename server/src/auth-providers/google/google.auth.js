import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { userExists, createUser } from "../../models/user/user.model.js";
import generateToken from "../../utils/jwt/token.js";

dotenv.config();

const config = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

const AUTH_OPTIONS = {
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  passReqToCallback: true,
};

const verifyCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const email = profile.emails[0].value;
    const action = req.query.state;

    if (action === "signin") {
      const existingUser = await userExists(email);
      existingUser
        ? done(null, existingUser)
        : done(null, false, { message: "Account not found" });
    } else if (action === "signup") {
      const existingUser = await userExists(email);
      if (existingUser) {
        done(null, false, { message: "Email already registered" });
      } else {
        try {
          const newUser = await createUser(profile);
          done(null, newUser);
        } catch (error) {
          done(error, null);
        }
      }
    }
  } catch (error) {
    done(error, null);
  }
};

passport.use(new GoogleStrategy(AUTH_OPTIONS, verifyCallback));

export const googleAuth = (req, res, next, action) => {
  const authenticator = passport.authenticate("google", {
    scope: ["email"],
    state: action,
  });
  authenticator(req, res, next);
};

export const googleCallback = (req, res, next) => {
  passport.authenticate("google", (err, user) => {
    if (err || !user) {
      return res.redirect(`/authentication/failure`);
    }

    const token = generateToken(user);
    res.cookie("ssjwt", token, {
      httpOnly: true,
      sameSite: "Strict",
    });
    res.redirect(`/authentication/success`);
  })(req, res, next);
};

export const signOutUser = (req, res) => {
  res.clearCookie("ssjwt");
  res.redirect("/");
};
