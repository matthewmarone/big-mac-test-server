const { createTestClient } = require("apollo-server-testing");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("../../schema");
const resolvers = require("../../resolvers");

// create a test server to test against, using our production typeDefs and
// resolvers
const server = new ApolloServer({
  cors: false,
  typeDefs,
  resolvers,
});

const { query } = createTestClient(server);

/**
 * Run queries on the test server
 */
module.exports = query;
