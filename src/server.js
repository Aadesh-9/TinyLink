const express = require("express");
const cors = require("cors");
const linkRoutes = require("./routes/links");
const migrate = require("./db/migrate");
const redirectRoutes = require("./routes/redirects");
const deleteRoutes = require("./routes/delete");

const app = express();

// Parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/links", linkRoutes);

app.use("/", redirectRoutes);

app.use("/api/links", deleteRoutes);

// Health check
app.get("/healthz", (req, res) => {
  res.json({
    ok: true,
    version: "1.0",
    uptime: process.uptime(),
    env: process.env.NODE_ENV || "development",
  });
});

const PORT = process.env.PORT || 3000;

// Start server
const startServer = async () => {
  await migrate(); // auto-create tables
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

startServer();
