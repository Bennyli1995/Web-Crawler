const {JSDOM} = require('jsdom');

const crawlPage = async (baseURL, currentURL, pages) => {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizeCurrentURL = normalizeURL(currentURL);

  if (pages[normalizeCurrentURL] > 0) {
    pages[normalizeCurrentURL] ++;
    return pages;
  }

  pages[normalizeCurrentURL] = 1;

  console.log(`actively crawling: ${currentURL}`);
  
  try {
    const response = await fetch(currentURL);
    if (response.status > 399) {
      console.log(`Error in fetch with status code: ${response.status}, on page: ${currentURL}`);
      return pages;
    }

    const contentType = response.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`);
      return pages;
    }

    const htmlBody = await response.text();

    const nextURLs = getURLsFromHTML(htmlBody, baseURL);

    for (const nextURL of nextURLs) {
      await crawlPage(baseURL, nextURL, pages);
    }
  } catch (err) {
    console.log(`Error in fetch: ${err.message}, on page: ${currentURL}`);
  }

  return pages;
}

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
  getURLsFromHTML, 
  crawlPage
}