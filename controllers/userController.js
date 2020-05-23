const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');

//VARIABLES
const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID;

//INSTANCES
const client = new OAuth2Client(OAUTH_CLIENT_ID);

//
const verifyAuthToken = async (token) => {
	try {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: OAUTH_CLIENT_ID,
		});

		return ticket.getPayload();
	} catch (error) {
		console.error('Error verifying token ', error);
	}
};
//

const checkIfUserExist = async (email) => await User.findOne({ email }).exec();

//

const createNewUser = async ({ name, email, picture }) =>
	await new User({ name, email, picture }).save();

//
exports.findOrCreateUser = async (token) => {
	// 1. Verify auth token
	const googleUser = await verifyAuthToken(token);

	// 2. Check if the user exists

	const user = await checkIfUserExist(googleUser.email);

	// 3. If User exists, return them otherwise create new user in DB

	return user ? user : await createNewUser(googleUser);
};
