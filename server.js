const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

//typeDefs and Resolvers
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { findOrCreateUser } = require('./controllers/userController');
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
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const authToken = req.headers.authorization || null;
		let currentUser = null;

		try {
			if (authToken) {
				//1. find or create User

				currentUser = await findOrCreateUser(authToken);
			}
		} catch (error) {
			console.error(`Unable to authenticate User with the token ${authToken}`);
		}
		return { currentUser };
	},
});

// The `listen` method launches a web server.
server
	.listen()
	.then(({ url }) => console.log(`🚀  Server ready at ${url}`))
	.catch(() => console.error(` 💥 💥 Server conection failed 💣  `));
