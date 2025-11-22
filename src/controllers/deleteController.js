// Controller for deleting a short link
const { processDelete } = require("../services/deleteService");

const deleteLink = async (req, res) => {
  try {
    const code = req.params.code;

    const result = await processDelete(code);

    if (!result) {
      return res.status(404).json({ error: "Short link not found" });
    }

    return res.json({ message: "Link deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { deleteLink };
