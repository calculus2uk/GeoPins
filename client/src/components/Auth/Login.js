import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { GoogleLogin } from 'react-google-login';
import { GraphQLClient } from 'graphql-request';
import Context from '../../context';
import Typography from '@material-ui/core/Typography';
import { ME_QUERY } from '../../graphql/queries';

//VARIABLESS

const clientId = process.env.REACT_APP_GEOPINS_GOOGLE_ID;
const server_ULR = process.env.REACT_APP_GEOPINS_SERVER_URL;

//
const Login = ({ classes }) => {
	const { dispatch } = useContext(Context);
	const onFailure = (err) => console.error('Problem Loging In', err);
	const onSuccess = async (googleUser) => {
		try {
			const idToken = googleUser.getAuthResponse().id_token;
			const client = new GraphQLClient(server_ULR, {
				headers: { authorization: idToken },
			});

			const { me } = await client.request(ME_QUERY);

			dispatch({ type: 'LOGIN_USER', payload: me });
			dispatch({ type: 'IS_LOGGED_IN', payload: googleUser.isSignedIn() });
		} catch (err) {
			onFailure(err);
		}
	};
	return (
		<div className={classes.root}>
			<Typography
				component='h1'
				variant='h3'
				gutterBottom
				noWrap
				style={{ color: 'rgb(66, 133, 244)' }}>
				Welcome
			</Typography>
			<GoogleLogin
				clientId={clientId}
				onSuccess={onSuccess}
				onFailure={onFailure}
				isSignedIn='true'
				theme='dark'
			/>
		</div>
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
