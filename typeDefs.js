const { gql } = require('apollo-server');

module.exports = gql`
	#USER TYPE
	type User {
		_id: ID
		name: String!
		email: String!
		picture: String
	}

	type Query {
		me: User!
	}
`;
