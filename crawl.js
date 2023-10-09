function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const result = `${urlObj.hostname}${urlObj.pathname}`
  if (result.length > 0 && result.slice(-1) === '/') {
    return result.slice(0, -1).toLowerCase();
  }

  return result.toLowerCase();
}

module.exports = {
  normalizeURL
}