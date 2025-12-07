const jsonServer = require("json-server");
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config(); // Load environment variables

const server = express();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// Use CORS to allow cross-origin requests
server.use(cors());
server.use(express.static(path.join(__dirname, 'public')));
server.use(middlewares);
server.use(express.json());

// --- Authentication Endpoint ---
server.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.json({ success: true, token: "admin-session-token" });
  }

  return res.status(401).json({ error: "Invalid credentials" });
});

// --- File Upload Configuration ---
const uploadDir = path.join(__dirname, "../my-app/public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Sanitize filename and append simple timestamp to avoid collisions
    const safeName = file.originalname.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
    cb(null, `${Date.now()}-${safeName}`);
  }
});
const upload = multer({ storage: storage });

// --- Upload Endpoint ---
server.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  // Return the path relative to the React public directory
  res.json({
    url: `/uploads/${req.file.filename}`,
    filename: req.file.filename
  });
});


// Use the json-server router
server.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});