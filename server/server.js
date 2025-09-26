const jsonServer = require("json-server");
const express = require("express");
const cors = require("cors");
const path = require("path");

const server = express();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// Use CORS to allow cross-origin requests
server.use(cors());

// Use default json-server middlewares
server.use(middlewares);

// Use the json-server router
server.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});