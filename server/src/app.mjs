import path from "node:path";
import { fileURLToPath } from "url";
import express from "express";
import passport from "passport";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./routes/authentication/auth.router.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(passport.initialize());
app.use(express.json());
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/auth", authRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

export default app;
