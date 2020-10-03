/**
 * @jest-environment node
 */

const query = require("./testClientAndServer");
const prettyFormat = require("pretty-format");

const listSupportedCountries = `
query listSupportedCountries{
    listSupportedCountries{
      id
      countries
    }
  }
`;

/**
 * All supported countries in the big-mac-index.csv
 */
const allCountries = [
  "Argentina",
  "Australia",
  "Austria",
  "Belgium",
  "Brazil",
  "Britain",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Costa Rica",
  "Czech Republic",
  "Denmark",
  "Egypt",
  "Estonia",
  "Euro area",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hong Kong",
  "Hungary",
  "India",
  "Indonesia",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Latvia",
  "Lithuania",
  "Malaysia",
  "Mexico",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Pakistan",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Russia",
  "Saudi Arabia",
  "Singapore",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Thailand",
  "Turkey",
  "UAE",
  "Ukraine",
  "United States",
  "Uruguay",
  "Venezuela",
  "Vietnam",
];

test("Testing GraphQL query listSupportedCountries", async () => {
  const {
    errors,
    data: {
      listSupportedCountries: { countries },
    },
  } = await query({
    query: listSupportedCountries,
  });
  //   console.log(prettyFormat(data));
  expect(errors).toEqual(undefined);
  expect(countries).toEqual(allCountries);
});
