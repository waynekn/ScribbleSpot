import http from "node:http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.mjs";
dotenv.config();
const PORT = 8000;
const MONGO_URL = process.env.MONGO_URL;

const server = http.createServer(app);

mongoose.connection.once("open", () => console.log("Mongo db connected"));

mongoose.connection.on("error", (err) => console.warn(err));
const startServer = async () => {
  await mongoose.connect(MONGO_URL);
  server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

startServer();
