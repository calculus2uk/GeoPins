const { AuthentcationError } = require('apollo-server');
const fakeData = require('./models/dummyData');
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
};
