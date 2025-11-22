const { validateUrlInput } = require("../validators/urlValidator");
const { createShortLink } = require("../services/linkService");

const createLink = async (req, res) => {
  try {
    // Basic long_url validation
    const validationError = validateUrlInput(req);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // Accept both formats (custom_code or customCode)
    const { long_url, custom_code, customCode } = req.body;
    const finalCode = custom_code || customCode || null;

    // Build base URL
    const baseUrl =
      process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;

    // Business logic
    const result = await createShortLink(long_url, finalCode, baseUrl);

    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }

    return res.status(result.status).json(result.data);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createLink };
