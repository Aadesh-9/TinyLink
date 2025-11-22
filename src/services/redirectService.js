// Service for redirect logic
const {
  findByCode,
  incrementClicks,
  updateLastClicked,
} = require("../db/linkQueries");

const processRedirect = async (code) => {
  // Look up the link
  const link = await findByCode(code);
  if (!link) return null;

  // Update stats
  await incrementClicks(code);
  await updateLastClicked(code);

  return link;
};

module.exports = { processRedirect };
