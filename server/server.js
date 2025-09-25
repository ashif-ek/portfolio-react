// // server.js
// const jsonServer = require("json-server");
// const server = jsonServer.create();
// const router = jsonServer.router("db.json"); // <- your db.json file
// const middlewares = jsonServer.defaults();

// const PORT = process.env.PORT || 5000;

// server.use(middlewares);
// server.use(router);

// server.listen(PORT, () => {
//   console.log(`JSON Server is running on port ${PORT}`);
// });


const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 5000;

server.use(middlewares);
server.use(router);

server.listen(PORT, (err) => {
  if (err) {
    console.error("Server failed to start:", err);
    process.exit(1);
  }
  console.log(`JSON Server is running on port ${PORT}`);
});
