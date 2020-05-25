const { AuthentcationError } = require('apollo-server');
const Pin = require('./models/Pin');
//const fakeData = require('./models/dummyData');

Pin;

const authenticated_HOF = (next) => (parent, args, ctx, info) => {
	if (!ctx) {
		throw new AuthentcationError('Sorry You must be Logged in');
	}
	return next(parent, args, ctx, info);
};
module.exports = {
	Query: {
		/*me: () => fakeData,*/
		me: authenticated_HOF((parent, args, ctx) => ctx.currentUser),
	},
	Mutation: {
		createPin: authenticated_HOF(async (root, args, { currentUser }, info) => {
			const newPin = await Pin({
				...args.input,
				author: currentUser._id,
			}).save();
			const PinAdded = await Pin.populate(newPin, 'author');
			return PinAdded;
		}),
	},
};
