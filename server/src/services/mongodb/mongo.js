import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => console.log("Mongo db connected"));

mongoose.connection.on("error", (err) => console.warn(err));

const mongoConnect = async () => {
  await mongoose.connect(MONGO_URL);
};

export default mongoConnect;
