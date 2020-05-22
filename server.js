const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

//typeDefs and Resolvers
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const MONGODB_URL = process.env.MONGODB_URL;

//DB CONNECTION
mongoose
	.connect(MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log(' 🚀 DB Successfully connected 🚀  '))
	.catch(() => console.log('  💥 💣 DB Connection failed  💥'));

// The ApolloServer constructor
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server
	.listen()
	.then(({ url }) => console.log(`🚀  Server ready at ${url}`))
	.catch(() => console.error(` 💥 💥 Server conection failed 💣  `));
