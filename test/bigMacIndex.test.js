/**
 * @jest-environment node
 */

const query = require("./testClientAndServer");
// eslint-disable-next-line no-unused-vars
const prettyFormat = require("pretty-format");
const {
  allCountries,
  fullIndexList,
  venezuelaIndex,
} = require("./knownResults");

const listSupportedCountries = `
  query listSupportedCountries{
      listSupportedCountries{
        id
        countries
      }
    }
`;
const listLatestBigMacIndex = `
query listLatestBigMacIndex{
  listLatestBigMacIndex{
    id
    country
    date
    localPrice
    dollarExchange
    dollarPrice
    dollarPPP
    dollarValuation
  }
}
`;
const getLatestBigMacIndex = `
  query getLatestBigMacIndex($country: String!){
    getLatestBigMacIndex(country: $country){
      id
      country
      date
      localPrice
      dollarExchange
      dollarPrice
      dollarPPP
      dollarValuation
    }
  }
`;

test("Testing GraphQL query listLatestBigMacIndex", async () => {
  const {
    errors,
    data: {
      listSupportedCountries: { countries },
    },
  } = await query({
    query: listSupportedCountries,
  });
  expect(errors).toEqual(undefined);
  expect(countries).toEqual(allCountries);
});

test("Testing GraphQL query listSupportedCountries", async () => {
  const { errors, data } = await query({
    query: listLatestBigMacIndex,
  });
  //   console.log(prettyFormat(data));
  expect(errors).toEqual(undefined);
  expect(data).toEqual(fullIndexList.data);
});

test("Testing GraphQL query getLatestBigMacIndex", async () => {
  const { errors, data } = await query({
    query: getLatestBigMacIndex,
    variables: { country: "Venezuela" },
  });
  //   console.log(prettyFormat(data));
  expect(errors).toEqual(undefined);
  expect(data).toEqual(venezuelaIndex.data);
});
