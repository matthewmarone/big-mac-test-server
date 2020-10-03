const { gql } = require("apollo-server");

// A GraphQL schema is a collection of type definitions
// that together define the "shape" of queries that are executed against
// the server's data.

/**
 * This Schema defines three types: Location, BigMacIndex, and CountryList; 
 * and four querries agenst those types: 
 * getLocation(ip: String!), listLatestBigMacIndex, 
 * getLatestBigMacIndex(country: String!), and listSupportedCountries
 */
const typeDefs = gql`
  type Location {
    # Models the current location for a given IP address
    id: ID! # Same as ipv4
    ipv4: String!
    country: String!
    city: String
  }
  type BigMacIndex {
    # Models a single line of the big-mac-indx.csv file
    id: ID! # compound key as 'country#date', or 'country#LATEST'
    country: String!
    date: Int! # Date in Epoch seconds
    localPrice: Float!
    dollarExchange: Float!
    dollarPrice: Float!
    dollarPPP: Float!
    dollarValuation: Float!
  }
  type CountryList {
    # Models a list of countries
    id: ID!
    countries: [String]!
  }
  type Query {
    # Returns type 'Locaton' given an IP address
    getLocation(ip: String!): Location

    # Retuns an array of BigMacIndex depicting the most recent known index for each country
    listLatestBigMacIndex: [BigMacIndex]

    # Retuns big-mac-index.csv as an array of type BigMacIndex
    getLatestBigMacIndex(country: String!): BigMacIndex

    # Returns a CountryList to show with countries are available on the server
    listSupportedCountries: CountryList!
  }
`;

module.exports = typeDefs;
