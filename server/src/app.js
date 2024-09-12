import path from "node:path";
import { fileURLToPath } from "url";
import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./routes/authentication/auth.router.js";
import userRouter from "./routes/user/user.router.js";
import { blogRouter } from "./routes/blog/blog.router.js";

import { authenticateJWT } from "./middleware/auth/jwt.auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8000"],
  })
);
app.use(passport.initialize());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/auth", authRouter);
app.use("/users", authenticateJWT, userRouter);
app.use("/posts", authenticateJWT, blogRouter);

app.get("/auth-status", authenticateJWT, (req, res) => {
  res.json(200);
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

export default app;
