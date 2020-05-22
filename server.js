const { ApolloServer, gql } = require('apollo-server');

//typeDefs and Resolvers
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// The ApolloServer constructor
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server
	.listen()
	.then(({ url }) => console.log(`🚀  Server ready at ${url}`))
	.catch(() => console.error(` 💥 💥 Server conection failed 💣  `));
