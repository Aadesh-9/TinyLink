// Controller for listing all links
const { fetchAllLinks } = require("../services/listService");

const listLinks = async (req, res) => {
  try {
    const links = await fetchAllLinks();
    return res.json(links);
  } catch (err) {
    console.error("List error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { listLinks };
