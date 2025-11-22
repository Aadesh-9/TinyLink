// Service for deleting links
const { findByCode, markAsDeleted } = require("../db/linkQueries");

const processDelete = async (code) => {
  const link = await findByCode(code);
  if (!link) return null;

  await markAsDeleted(code);
  return true;
};

module.exports = { processDelete };
