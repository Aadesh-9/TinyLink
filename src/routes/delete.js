// Route for deleting short links
const express = require("express");
const router = express.Router();
const { deleteLink } = require("../controllers/deleteController");

// DELETE /api/links/:code
router.delete("/:code", deleteLink);

module.exports = router;
