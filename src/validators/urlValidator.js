function validateUrlInput(req) {
  if (!req.body || typeof req.body !== "object") {
    return "Request body must be JSON";
  }

  if (Object.keys(req.body).length === 0) {
    return "Request body cannot be empty";
  }

  const { long_url } = req.body;

  if (!long_url || typeof long_url !== "string") {
    return "long_url is required";
  }

  if (long_url.trim().length === 0) {
    return "long_url cannot be empty";
  }

  if (!/^https?:\/\//i.test(long_url)) {
    return "URL must start with http:// or https://";
  }

  let urlObj;
  try {
    urlObj = new URL(long_url);
  } catch {
    return "Invalid URL format";
  }

  const invalidHosts = ["localhost", "127.0.0.1", "0.0.0.0"];
  if (invalidHosts.includes(urlObj.hostname)) {
    return "Local/private URLs not allowed";
  }

  const privateIPRegex = /^(10|127|172\.(1[6-9]|2\d|3[0-1])|192\.168)\./;
  if (privateIPRegex.test(urlObj.hostname)) {
    return "Private network IPs not allowed";
  }

  const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!domainRegex.test(urlObj.hostname)) {
    return "Invalid domain name";
  }

  return null;
}

module.exports = { validateUrlInput };
