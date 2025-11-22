const express = require("express");
const cors = require("cors");
const linkRoutes = require("./routes/links");
const migrate = require("./db/migrate");
const redirectRoutes = require("./routes/redirects");
const app = express();

// Parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/links", linkRoutes);

app.use("/", redirectRoutes);

// Health check
app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

// Start server
const startServer = async () => {
  await migrate(); // auto-create tables
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};

startServer();
