// Basic Express server
const express = require("express");
const cors = require("cors");

const app = express();

// Parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Simple health check route
app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
