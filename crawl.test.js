const {normalizeURL, getURLsFromHTML} = require('./crawl.js')
const {test, expect} = require('@jest/globals')

test('normalizeURL strip protocol', () => {
  const input = "https://blog.boot.dev/path";
  const actual_output = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual_output).toEqual(expected);
}) 

test('normalizeURL strip protocol with slash', () => {
  const input = "https://blog.boot.dev/path/";
  const actual_output = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual_output).toEqual(expected);
}) 

test('normalizeURL capitals', () => {
  const input = "https://blog.boot.dev/PATH/";
  const actual_output = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual_output).toEqual(expected);
}) 

test('getURLsFromHTML absolute', () => {
  const inputHTMLBody = `
    <html>
      <body>
        <a href="https://blog.boot.dev">
          Boot.dev Blog
        </a>
      <body />
    <html />
  `
  const inputBaseUrl = "https://blog.boot.dev/";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = ["https://blog.boot.dev/"]
  expect(actual).toEqual(expected);
}) 

test('getURLsFromHTML relative', () => {
  const inputHTMLBody = `
    <html>
      <body>
        <a href="/path/">
          Boot.dev Blog
        </a>
      <body />
    <html />
  `
  const inputBaseUrl = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = ["https://blog.boot.dev/path/"]
  expect(actual).toEqual(expected);
}) 

test('getURLsFromHTML both', () => {
  const inputHTMLBody = `
    <html>
      <body>
        <a href="/path/">
          Boot.dev Blog
        </a>
        <a href="https://blog.about.boot.dev/path1/">
          Boot.dev Blog
        </a>
      <body />
    <html />
  `
  const inputBaseUrl = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = ["https://blog.boot.dev/path/","https://blog.about.boot.dev/path1/" ]
  expect(actual).toEqual(expected);
}) 

test('getURLsFromHTML invalid', () => {
  const inputHTMLBody = `
    <html>
      <body>
        <a href="invalid">
          Boot.dev Blog
        </a>
      <body />
    <html />
  `
  const inputBaseUrl = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = []
  expect(actual).toEqual(expected);
}) 