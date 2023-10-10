const sortPages = (pages) => {
  const pagesArr = Object.entries(pages);
  pagesArr.sort((a, b) => {
    return a[1] < b[1];
  })

  return pagesArr;
}

const printReport = (pages) => {
  console.log("==================================================================================================================");
  console.log("                                              START OF REPORT ");
  console.log("==================================================================================================================");

  const sortedPages = sortPages(pages);

  for (const page of sortedPages) {
    const url = page[0];
    const hits = page[1];
    console.log(`Found ${hits} links to page: ${url}`); 
  }

  console.log("==================================================================================================================");
  console.log("                                               END OF REPORT ");
  console.log("==================================================================================================================");
}

module.exports = {
  sortPages,
  printReport
}