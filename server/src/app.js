const express = require("express");
const path = require("node:path");
const passport = require("passport");
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("./routers/authentication/auth");

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

module.exports = app;
