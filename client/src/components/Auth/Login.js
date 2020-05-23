import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { GoogleLogin } from 'react-google-login';
import { GraphQLClient } from 'graphql-request';
// import Typography from "@material-ui/core/Typography";

//VARIABLESS

const clientId = process.env.REACT_APP_GEOPINS_GOOGLE_ID;
const serverULR = process.env.REACT_APP_GEOPINS_SERVER_URL;
const ME_QUERY = `{
	me {
	  _id
	  name
	  email
	  picture
	}
  }
`;
//
const Login = ({ classes }) => {
	const onSuccess = async (googleUser) => {
		try {
			const idToken = googleUser.getAuthResponse().id_token;
			const client = new GraphQLClient(serverULR, {
				headers: { authorization: idToken },
			});

			const data = await client.request(ME_QUERY);
			console.log({ data });
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<GoogleLogin clientId={clientId} onSuccess={onSuccess} isSignedIn='true' />
	);
};

const styles = {
	root: {
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
	},
};

export default withStyles(styles)(Login);
