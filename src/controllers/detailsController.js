// Controller to fetch stats of one short code
const { fetchLinkByCode } = require("../services/detailsService");

const getLinkDetails = async (req, res) => {
  try {
    const code = req.params.code;
    const data = await fetchLinkByCode(code);

    if (!data || data.is_deleted) {
      return res.status(404).json({ error: "Short link not found" });
    }

    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getLinkDetails };
