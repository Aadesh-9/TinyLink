// All URL validation in one clean reusable function

function validateUrlInput(req) {
  // 1. Body must exist
  if (!req.body || typeof req.body !== "object") {
    return "Request body must be JSON";
  }

  // 2. Empty body
  if (Object.keys(req.body).length === 0) {
    return "Request body cannot be empty";
  }

  const { long_url } = req.body;

  // 3. long_url must exist
  if (!long_url || typeof long_url !== "string") {
    return "long_url is required";
  }

  // 4. Cannot be empty string
  if (long_url.trim().length === 0) {
    return "long_url cannot be empty";
  }

  // 5. Must start with http:// or https://
  if (!/^https?:\/\//i.test(long_url)) {
    return "URL must start with http:// or https://";
  }

  // 6. Try parsing URL
  let urlObj;
  try {
    urlObj = new URL(long_url);
  } catch {
    return "Invalid URL format";
  }

  // 7. Reject localhost/private IPs
  const invalidHosts = ["localhost", "127.0.0.1", "0.0.0.0"];
  if (invalidHosts.includes(urlObj.hostname)) {
    return "Local/private URLs not allowed";
  }

  const privateIPRegex = /^(10|127|172\.(1[6-9]|2\d|3[0-1])|192\.168)\./;

  if (privateIPRegex.test(urlObj.hostname)) {
    return "Private network IPs not allowed";
  }

  // 8. Domain must contain real TLD
  const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!domainRegex.test(urlObj.hostname)) {
    return "Invalid domain name";
  }

  return null; // VALID
}

module.exports = { validateUrlInput };
