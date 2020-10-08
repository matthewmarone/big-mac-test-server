/**
 * @jest-environment node
 */

const query = require("./testClientAndServer");
// eslint-disable-next-line no-unused-vars
const prettyFormat = require("pretty-format");
const getLocationGQL = `
query getLocation($ip: String!){
    getLocation(ip:$ip){
      country
      city
    }
  }
`;

/**
 *
 */
test("Testing GraphQL query getLocation (ip-vigilate) with ip address 8.8.8.8", () => {
  const expectedReults = {
    errors: undefined,
    data: {
      getLocation: {
        city: "Mountain View",
        country: "United States",
      },
    },
  };
  return expect(runLocationQuery("8.8.8.8")).resolves.toEqual(expectedReults);
});

/**
 *
 */
test("Testing GraphQL query getLocation (ip-vigilate) with ipv6 address", async () => {
  const {
    data: { getLocation },
    errors,
  } = await runLocationQuery("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
  expect(getLocation).toBeNull();
  expect(errors).toBeDefined();
});

/**
 *
 */
test("Testing GraphQL query getLocation (ip-vigilate) with malformed ip address 14 8.102.115.177", async () => {
  const {
    data: { getLocation },
    errors,
  } = await runLocationQuery("14 8.102.115.177");
  expect(getLocation).toBeNull();
  expect(errors).toBeDefined();
});

/**
 *
 */
test("Testing GraphQL query getLocation (ip-vigilate) with empty IP Address", async () => {
  const {
    data: { getLocation },
    errors,
  } = await runLocationQuery("");
  expect(getLocation).toBeNull();
  expect(errors).toBeDefined();
});

/**
 *
 */
test("Testing GraphQL query getLocation (ip-vigilate) with local ip address (192.168.1.1)", async () => {
  const {
    data: { getLocation },
    errors,
  } = await runLocationQuery("192.168.1.1");
  expect(getLocation).toBeNull();
  expect(errors).toBeDefined();
});

/**
 *
 */
test("Testing GraphQL query getLocation (ip-vigilate) with ipv4 as null", async () => {
  const { data, errors } = await runLocationQuery(null);
  expect(data).toBeUndefined();
  expect(errors).toBeDefined();
});

/**
 *
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
      query: getLocationGQL,
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
