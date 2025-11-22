// Handles short link creation logic
const { nanoid } = require("nanoid");
const { checkCodeExists, insertLink } = require("../db/linkQueries");

// Accept baseUrl so we can build full short_url
async function createShortLink(long_url, custom_code, baseUrl) {
  const codeRegex = /^[A-Za-z0-9]{6,8}$/;

  // If user provided custom code
  if (custom_code) {
    if (!codeRegex.test(custom_code)) {
      return { error: "Custom code must be 6-8 letters/numbers", status: 400 };
    }

    const exists = await checkCodeExists(custom_code);
    if (exists) {
      return { error: "Custom code already exists", status: 409 };
    }

    const saved = await insertLink(custom_code, long_url);
    const short_url = `${baseUrl}/${saved.id}`;

    return { data: { short_url, ...saved }, status: 201 };
  }

  // Generate random 6–8 char code
  const code = nanoid(Math.floor(Math.random() * 3) + 6);

  const exists = await checkCodeExists(code);
  if (exists) {
    return { error: "Please try again", status: 500 };
  }

  const saved = await insertLink(code, long_url);
  const short_url = `${baseUrl}/${saved.id}`;

  return { data: { short_url, ...saved }, status: 201 };
}

module.exports = { createShortLink };
