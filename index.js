const { ApolloServer } = require("apollo-server");
const typeDefs = require("./GraphQL/schema");
const resolvers = require("./GraphQL/resolvers");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
// The GraphQL schema in typeDefs defines this server's public api
// and the resolvers are the method in which availble data from ip-vigilante 
// and the big-mac-index.csv are transformed into GraphQL responses,
// as defined in the typeDefs schema.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
