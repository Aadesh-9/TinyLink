// Route for handling redirects
const express = require("express");
const router = express.Router();
const { handleRedirect } = require("../controllers/redirectController");

// GET /:code
router.get("/:code", handleRedirect);

module.exports = router;
