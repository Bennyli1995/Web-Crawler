const {normalizeURL} = require('./crawl.js')
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