const db = require("./index");
const fs = require("fs");
const path = require("path");

async function migrate() {
  const schemaPath = path.resolve(__dirname, "./schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");

  await db.query(schema); // <-- FIXED (uses pool, not client)
}

module.exports = migrate;
