// Basic Express server
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db/index");

const app = express();

// Parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Simple health check route
app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

// Start the server
const startServer = async () => {
  await connectDB();
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};

startServer();
