const getLocation = require("../data-sources/ip-vigilante");
const BigMacIndex = require("../data-sources/big-mac-index");

/**
 * Resolvers to translate server data-sources to types defined in the schema.
 */
const resolvers = {
  Query: {
    // Resolves the request and response from ip-vigilante
    getLocation: async (parent, args, context, info) => {
      if (!args.ip) throw new Error("Missing vaild ipv4 addresss");
      const {
        ipv4,
        country_name: country,
        city_name: city,
      } = await getLocation(args.ip);
      return { id: ipv4, ipv4, country, city };
    },
    // Resolves a request for each country's most recent big-mac-index
    listLatestBigMacIndex: async () => {
      const bmIdx = await BigMacIndex.getLatestIndex();
      const retVal = [];
      // The server stores the big-mac-index in a map by country
      // Here we loop through, flattening the data to fit our GraphQL schema def
      Object.entries(bmIdx).forEach(([, e]) => {
        const [latestEntry] = e;
        latestEntry.id = `${latestEntry.country}#LATEST`;
        retVal[retVal.length] = latestEntry;
      });
      // console.log(retVal);
      return retVal;
    },
    // This query allows for a returning the most recent Big Mac Index
    // for a single country.  Note, the client won't actuall call this
    // as long as a successfull listLatestBigMacIndex has been called
    // and cached first.
    getLatestBigMacIndex: async (parent, args, context, info) => {
      const bmIdx = await BigMacIndex.getLatestIndex([args.country]);
      const [retVal] = bmIdx[args.country] || [];
      if (retVal) retVal.id = `${args.country}#LATEST`;
      return retVal;
    },
    // Resolves BigMacIndex.getCountries() to GraphQL type CountryList
    listSupportedCountries: async () => {
      const countries = await BigMacIndex.getCountries();
      return { id: "LATEST", countries };
    },
  },
  BigMacIndex: {
    // Converts the date field from the big-mac-index.csv to
    // Epoch seconds for any query returning type BigMacIndex
    // or an array of type BigMacIndex
    date: (parent) => {
      // In producton a date library may be necessary
      return Math.round(Date.parse(parent.date) / 1000);
    },
  },
};

module.exports = resolvers;
