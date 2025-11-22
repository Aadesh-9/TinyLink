// Router for link-related routes
const express = require("express");
const router = express.Router();
const { createLink } = require("../controllers/linksController");
const { listLinks } = require("../controllers/listController");
const { getLinkDetails } = require("../controllers/detailsController");

// POST /api/links
router.post("/", createLink);

// GET /api/links
router.get("/", listLinks);

// GET /api/links/:code
router.get("/:code", getLinkDetails);

module.exports = router;
