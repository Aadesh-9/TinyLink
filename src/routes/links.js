// Router for link-related routes
const express = require("express");
const router = express.Router();
const { createLink } = require("../controllers/linksController");
const { listLinks } = require("../controllers/listController");

// POST /api/links
router.post("/", createLink);

// GET /api/links (list all links)
router.get("/", listLinks);

module.exports = router;
