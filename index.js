require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { createDBConnection } = require("./src/services/db-conection.service");

const httpPort = process.env.HTTP_PORT;

// Connect to database
createDBConnection();

// Create express server
const server = express();
server.use(cors());
server.use("/api", require("./routes"));

// Create http server
const httpServer = http.createServer(server);

httpServer.listen(httpPort, () => {
  console.log(`HTTP server running on port: ${httpPort}`);
});
