const { gql } = require('apollo-server');

module.exports = gql`
	#USER TYPE
	type User {
		_id: ID
		name: String
		email: String
		picture: String
	}

	#type PIN
	type Pin {
		_id: ID
		createdAt: String
		title: String
		content: String
		image: String
		latitude: Float
		longitude: Float
		author: User
		comments: [Comment]
	}

	#type PIN
	type Comment {
		text: String
		createdAt: String
		author: User
	}

	#QUERY
	type Query {
		me: User
	}
`;
