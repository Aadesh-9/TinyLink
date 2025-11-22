const express = require("express");
const cors = require("cors");
const linkRoutes = require("./routes/links");
const migrate = require("./db/migrate");
const redirectRoutes = require("./routes/redirects");
const deleteRoutes = require("./routes/delete");
const path = require("path");

const app = express();

app.use(express.static("public"));

// Parse JSON and enable CORS
app.use(express.json());
app.use(cors());

app.use("/api/links", linkRoutes); // POST, GET (list), GET (details)
app.use("/api/links", deleteRoutes); // DELETE /api/links/:code

app.use("/code/js", express.static(path.join(__dirname, "..", "public", "js")));

// Serve stats page at /code/:code
app.get("/code/:code", (req, res, next) => {
  const code = req.params.code;

  // Prevent conflict with static files (like code/js/stats.js)
  if (code === "js") return next();

  res.sendFile(path.join(__dirname, "..", "public", "code.html"));
});

// Health check
app.get("/healthz", (req, res) => {
  res.json({
    ok: true,
    version: "1.0",
    uptime: process.uptime(),
    env: process.env.NODE_ENV || "development",
  });
});
app.use("/", redirectRoutes); // GET /:code (redirect)

const PORT = process.env.PORT || 3000;

// Start server
const startServer = async () => {
  await migrate(); // auto-create tables
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
