const {JSDOM} = require('jsdom');

const getURLsFromHTML = (htmlBody, baseURL) => {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll('a');

  for (const link of linkElements) {
    if (link.href.charAt(0) === '/') {
      // working with relative urls
      try {
        const urlObj = new URL(`${baseURL}${link.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with relative url: ${err}`)
      }
    } else {
      try {
        const urlObj = new URL(link.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with absolute url: ${err}`)
      }
    }
  }

  return urls;
}

const normalizeURL = (urlString) => {
  const urlObj = new URL(urlString);
  const result = `${urlObj.hostname}${urlObj.pathname}`
  if (result.length > 0 && result.slice(-1) === '/') {
    return result.slice(0, -1).toLowerCase();
  }

  return result.toLowerCase();
}

module.exports = {
  normalizeURL,
  getURLsFromHTML
}