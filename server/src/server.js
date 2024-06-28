const http = require("node:http");
const app = require("./app");
const PORT = 8000;

const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
