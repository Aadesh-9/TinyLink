// Simple Postgres client setup
const { Client } = require("pg");
require("dotenv").config();

// Create a client using the DATABASE_URL
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to Postgres");
  } catch (err) {
    console.error("Postgres connection error:", err);
    process.exit(1);
  }
}

module.exports = { client, connectDB };
