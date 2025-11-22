// Router for link-related routes
const express = require("express");
const router = express.Router();
const { createLink } = require("../controllers/linksController");

// POST /api/links
router.post("/", createLink);

module.exports = router;
