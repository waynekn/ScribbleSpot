import http from "node:http";
import dotenv from "dotenv";
import app from "./app.js";
import mongoConnect from "./services/mongodb/mongo.js";

dotenv.config();
const PORT = 8000;

const startServer = async () => {
  try {
    await mongoConnect();
    const server = http.createServer(app);
    server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {}
};

startServer();
