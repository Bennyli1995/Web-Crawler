const { getURLsFromHTML, normalizeURL, crawlPage } = require("./crawl");

const main = () => {
  if (process.argv.length < 3) {
    console.log("no website provided");
    process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log("too many command line arguments passed in!");
    process.exit(1);
  }

  const baseURL = process.argv[2];

  try {

  } catch (err) {
    console.log(`Website is invalid. ${err}`);
  }


  console.log(`starting crawl of ${baseURL}`);
  crawlPage(baseURL);
}

main()