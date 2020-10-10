/**
 * @jest-environment node
 */

const query = require("./test_modules/testClientAndServer");
// eslint-disable-next-line no-unused-vars
const prettyFormat = require("pretty-format");
const {
  listLatestBigMacIndex,
  listSupportedCountries,
  getLatestBigMacIndex,
} = require("./test_modules/query");

/**
 * There are no variables that this query takes, so this is the only
 * test for listLatestBigMacIndex
 */
test("Testing GraphQL query listLatestBigMacIndex", async () => {
  const { errors, data } = await query({
    query: listLatestBigMacIndex,
  });
  
  expect(errors).toBeUndefined();
  expect(data).toMatchSnapshot();
});
/**
 * There are no variables that this query takes, so this is the only
 * test for listSupportedCountries
 */
test("Testing GraphQL query listSupportedCountries", async () => {
  const { errors, data } = await query({
    query: listSupportedCountries,
  });
  expect(errors).toBeUndefined();
  expect(data).toMatchSnapshot();
});

// What follows are all the test cases for getLatestBigMacIndex

test("Testing GraphQL query getLatestBigMacIndex", async () => {
  const { errors, data } = await query({
    query: getLatestBigMacIndex,
    variables: { country: "Venezuela" },
  });

  expect(errors).toBeUndefined();
  expect(data).toMatchSnapshot();
});

test("Testing GraphQL query getLatestBigMacIndex, with unsupported country", async () => {
  const { errors, data } = await query({
    query: getLatestBigMacIndex,
    variables: { country: "Wakanda" },
  });

  expect(errors).toBeUndefined();
  expect(data).toMatchSnapshot();
});

test("Testing GraphQL query getLatestBigMacIndex, with empty String", async () => {
  const { errors, data } = await query({
    query: getLatestBigMacIndex,
    variables: { country: "" },
  });

  expect(errors).toBeUndefined();
  expect(data).toMatchSnapshot();
});

// The next two requests would be blocked by the client before going to the server
// because it violates the schema.  Country is required.

test("Testing GraphQL query getLatestBigMacIndex, with null country", async () => {
  const { errors, data } = await query({
    query: getLatestBigMacIndex,
    variables: { country: null },
  });

  expect(errors).toBeDefined();
  expect(data).toBeUndefined(); // Becasue it violates the schema
});

test("Testing GraphQL query getLatestBigMacIndex, with undefined country", async () => {
  const { errors, data } = await query({
    query: getLatestBigMacIndex,
    variables: { country: undefined },
  });

  expect(errors).toBeDefined();
  expect(data).toBeUndefined(); // Becasue it violates the schema
});
