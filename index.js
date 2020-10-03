const { ApolloServer, gql } = require("apollo-server");
const getLocation = require("./data-sources/ip-vigilante");
const BigMacIndex = require("./data-sources/big-mac-index");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Location {
    id: ID! # Same as ipv4
    ipv4: String!
    country: String!
    city: String!
  }
  type BigMacIndex {
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
    id: ID!
    countries: [String]!
  }
  type Query {
    getLocation(ip: String!): Location
    listLatestBigMacIndex: [BigMacIndex]
    getLatestBigMacIndex(country: String!): BigMacIndex
    listSupportedCountries: CountryList!
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getLocation: async (parent, args, context, info) => {
      const {
        ipv4,
        country_name: country,
        city_name: city,
      } = await getLocation(args.ip);
      return { id: ipv4, ipv4, country, city };
    },
    listLatestBigMacIndex: async () => {
      const bmIdx = await BigMacIndex.getLatestIndex();
      const retVal = [];
      Object.entries(bmIdx).forEach(([, e]) => {
        const [latestEntry] = e;
        latestEntry.id = `${latestEntry.country}#LATEST`;
        retVal[retVal.length] = latestEntry;
      });
      // console.log(retVal);
      return retVal;
    },
    getLatestBigMacIndex: async (parent, args, context, info) => {
      const bmIdx = await BigMacIndex.getLatestIndex([args.country]);
      const [retVal] = bmIdx[args.country] || [];
      if (retVal) retVal.id = `${args.country}#LATEST`;
      return retVal;
    },
    listSupportedCountries: async () => {
      const countries = await BigMacIndex.getCountries();
      return { id: "LATEST", countries };
    },
  },
  BigMacIndex: {
    date: (parent) => {
      // In producton a date library may be necessary
      return Math.round(Date.parse(parent.date) / 1000);
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
