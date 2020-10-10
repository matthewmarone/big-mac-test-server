/**
 * @jest-environment node
 */

const query = require("./test_modules/testClientAndServer");
const { getLocation } = require("./test_modules/query");
// eslint-disable-next-line no-unused-vars
const prettyFormat = require("pretty-format");

/**
 * Shows normal, sucessful response
 */
test("Testing GraphQL query getLocation (ip-vigilate) with ip address 8.8.8.8", async () => {
  const { data, errors } = await runLocationQuery("8.8.8.8");
  expect(data).toMatchSnapshot();
  expect(errors).toBeUndefined();
});

/**
 * Expect error response, because query was made with ipv6, not ipv4
 */
test("Testing GraphQL query getLocation (ip-vigilate) with ipv6 address", async () => {
  const { data, errors } = await runLocationQuery(
    "2001:0db8:85a3:0000:0000:8a2e:0370:7334"
  );
  expect(data).toMatchSnapshot();
  expect(errors).toBeDefined();
});

/**
 * Expect error response
 */
test("Testing GraphQL query getLocation (ip-vigilate) with malformed ip address 14 8.102.115.177", async () => {
  const { data, errors } = await runLocationQuery("14 8.102.115.177");
  expect(data).toMatchSnapshot();
  expect(errors).toBeDefined();
});

/**
 * Expect error, because of empty String
 */
test("Testing GraphQL query getLocation (ip-vigilate) with empty IP Address", async () => {
  const { data, errors } = await runLocationQuery("");
  expect(data).toMatchSnapshot();
  expect(errors).toBeDefined();
});

/**
 * Expect error because ip-vigilate only works with public ip addresses
 */
test("Testing GraphQL query getLocation (ip-vigilate) with local ip address (192.168.1.1)", async () => {
  const { data, errors } = await runLocationQuery("192.168.1.1");
  expect(data).toMatchSnapshot();
  expect(errors).toBeDefined();
});

/**
 * This error won't even return data, because it violates the schema, and therefore 
 * will not even be sent to the server by the client
 */
test("Testing GraphQL query getLocation (ip-vigilate) with ipv4 as null", async () => {
  const { data, errors } = await runLocationQuery(null);
  expect(data).toBeUndefined();
  expect(errors).toBeDefined();
});

/**
 * Like the test for null, but with undefined. 
 */
test("Testing GraphQL query getLocation (ip-vigilate) with ipv4 as undefined", async () => {
  const { data, errors } = await runLocationQuery(undefined);
  expect(data).toBeUndefined();
  expect(errors).toBeDefined();
});

const runLocationQuery = async (ip) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { errors, data } = await query({
      query: getLocation,
      variables: { ip },
    });
    // console.log(prettyFormat(data));
    // console.log(prettyFormat(errors));
    return { errors, data };
  } catch (e) {
    // console.log(e);
    throw e;
  }
};
