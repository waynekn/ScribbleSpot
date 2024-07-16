import path from "node:path";
import { fileURLToPath } from "url";
import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import morgan from "morgan";
import cors from "cors";

import authRouter from "./routes/authentication/auth.router.mjs";
import userRouter from "./routes/user/user.router.mjs";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(passport.initialize());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "..", "public")));

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.ssjwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      //assign the decoded token to the req.user object
      req.user = user;
      console.log(chalk.blue(req.user.displayName));
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.use("/auth", authRouter);
app.use("/users", authenticateJWT, userRouter);

app.get("/secret", authenticateJWT, (req, res) => {
  res.json({ success: true });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

export default app;
