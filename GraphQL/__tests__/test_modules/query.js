const listSupportedCountries = `
  query listSupportedCountries{
      listSupportedCountries{
        id
        countries
      }
    }
`;
exports.listSupportedCountries = listSupportedCountries;
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
exports.listLatestBigMacIndex = listLatestBigMacIndex;
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
exports.getLatestBigMacIndex = getLatestBigMacIndex;
const getLocation = `
query getLocation($ip: String!){
    getLocation(ip:$ip){
      country
      city
    }
  }
`;
exports.getLocation = getLocation;
