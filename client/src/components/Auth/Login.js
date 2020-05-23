import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { GoogleLogin } from 'react-google-login';
// import Typography from "@material-ui/core/Typography";

const clientId = process.env.REACT_APP_GEOPINS_GOOGLE_ID;
const Login = ({ classes }) => {
	const onSuccess = (googleUser) => {
		const idToken = googleUser.getAuthResponse().id_token;
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
