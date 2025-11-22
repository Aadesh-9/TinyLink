const { validateUrlInput } = require("../validators/urlValidator");
const { createShortLink } = require("../services/linkService");

const createLink = async (req, res) => {
  try {
    // Validate input
    const validationError = validateUrlInput(req);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const { long_url, custom_code } = req.body;

    // Business logic
    const result = await createShortLink(long_url, custom_code);

    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }

    return res.status(result.status).json(result.data);
  } catch (err) {
    console.error("Error creating link:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createLink };
