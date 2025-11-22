// Controller for redirecting short codes
const { processRedirect } = require("../services/redirectService");

const handleRedirect = async (req, res) => {
  try {
    const code = req.params.code;

    const result = await processRedirect(code);
    if (!result) {
      return res.status(404).json({ error: "Short link not found" });
    }

    return res.redirect(result.long_url);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { handleRedirect };
