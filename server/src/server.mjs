import http from "node:http";
import app from "./app.mjs";
const PORT = 8000;

const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
