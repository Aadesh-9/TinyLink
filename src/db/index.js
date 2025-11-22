const { Pool } = require("pg");
require("dotenv").config();

// Use connection pool (recommended for Neon)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Simple query helper
const query = (text, params) => pool.query(text, params);

module.exports = { query };
