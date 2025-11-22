// Handles short link creation logic
const { nanoid } = require("nanoid");
const { checkCodeExists, insertLink } = require("../db/linkQueries");

// Accept baseUrl so we can build full short_url
async function createShortLink(long_url, custom_code, baseUrl) {
  // If user provided custom code
  if (custom_code) {
    const exists = await checkCodeExists(custom_code);
    if (exists) {
      return { error: "Custom code already exists", status: 409 };
    }

    const saved = await insertLink(custom_code, long_url);

    // Add full short URL
    const short_url = `${baseUrl}/${saved.id}`;

    return { data: { short_url, ...saved }, status: 201 };
  }

  // Generate random 6–8 char code
  const code = nanoid(Math.floor(Math.random() * 3) + 6);

  // Extra safety check
  const exists = await checkCodeExists(code);
  if (exists) {
    return { error: "Please try again", status: 500 };
  }

  const saved = await insertLink(code, long_url);

  // Add full short URL
  const short_url = `${baseUrl}/${saved.id}`;

  return { data: { short_url, ...saved }, status: 201 };
}

module.exports = { createShortLink };
