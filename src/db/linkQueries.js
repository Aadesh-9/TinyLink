// Queries for links table
const db = require("./index");

// Check if a short code already exists AND is not deleted
const checkCodeExists = async (code) => {
  const q = `SELECT id FROM urls WHERE id = $1`;
  const result = await db.query(q, [code]);
  return result.rows.length > 0;
};

// Insert a new link
const insertLink = async (id, long_url) => {
  const q = `
    INSERT INTO urls (id, long_url)
    VALUES ($1, $2)
    RETURNING id, long_url, total_clicks, last_clicked, created_at;
  `;
  const result = await db.query(q, [id, long_url]);
  return result.rows[0];
};

// Find a link by its code
const findByCode = async (code) => {
  const q = `
    SELECT id, long_url, total_clicks, last_clicked, created_at
    FROM urls
    WHERE id = $1 
  `;
  const result = await db.query(q, [code]);
  return result.rows[0] || null;
};

// Increment click counter
const incrementClicks = async (code) => {
  const q = `
    UPDATE urls
    SET total_clicks = total_clicks + 1
    WHERE id = $1
  `;
  await db.query(q, [code]);
};

// Update last clicked timestamp
const updateLastClicked = async (code) => {
  const q = `
    UPDATE urls
    SET last_clicked = NOW()
    WHERE id = $1
  `;
  await db.query(q, [code]);
};

// HARD DELETE
const hardDelete = async (code) => {
  const q = `DELETE FROM urls WHERE id = $1 RETURNING *`;
  const result = await db.query(q, [code]);
  return result.rows[0] || null;
};

// Get all links
const getAllLinks = async () => {
  const q = `
    SELECT id, long_url, total_clicks, last_clicked, created_at
    FROM urls
    ORDER BY created_at DESC
  `;
  const result = await db.query(q);
  return result.rows;
};

// Get stats for one code
const getLinkByCode = async (code) => {
  const q = `
    SELECT id, long_url, total_clicks, last_clicked, created_at
    FROM urls
    WHERE id = $1
  `;
  const result = await db.query(q, [code]);
  return result.rows[0] || null;
};

module.exports = {
  checkCodeExists,
  insertLink,
  findByCode,
  incrementClicks,
  updateLastClicked,
  hardDelete,
  getAllLinks,
  getLinkByCode,
};
