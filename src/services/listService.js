// Service to fetch all links
const { getAllLinks } = require("../db/linkQueries");

const fetchAllLinks = async () => {
  return await getAllLinks();
};

module.exports = { fetchAllLinks };
