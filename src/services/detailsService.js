// Service for fetching stats of one code
const { getLinkByCode } = require("../db/linkQueries");

const fetchLinkByCode = async (code) => {
  return await getLinkByCode(code);
};

module.exports = { fetchLinkByCode };
