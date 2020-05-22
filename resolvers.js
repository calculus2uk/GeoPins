const fakeData = require('./models/dummyData');

module.exports = {
	Query: {
		me: () => fakeData,
	},
};
