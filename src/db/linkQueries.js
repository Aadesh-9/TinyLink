// Queries for links table
const db = require("./index");

// Check if a short code exists
const checkCodeExists = async (code) => {
  const q = "SELECT id FROM urls WHERE id = $1 AND is_deleted = FALSE";
  const result = await db.query(q, [code]);
  return result.rows.length > 0;
};

// Insert a new link
const insertLink = async (code, long_url) => {
  const q = `
    INSERT INTO urls (id, long_url)
    VALUES ($1, $2)
    RETURNING id, long_url, total_clicks, last_clicked, created_at;
  `;
  const result = await db.query(q, [code, long_url]);
  return result.rows[0];
};

module.exports = { checkCodeExists, insertLink };
