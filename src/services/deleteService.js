const { findByCode, hardDelete } = require("../db/linkQueries");

const processDelete = async (code) => {
  const link = await findByCode(code);
  if (!link) return null; // not found

  const deleted = await hardDelete(code);
  if (!deleted) return null; // deletion failed

  return true;
};

module.exports = { processDelete };
