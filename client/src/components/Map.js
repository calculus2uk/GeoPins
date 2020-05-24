import React, { useState, useEffect } from 'react';
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl';
import { withStyles } from '@material-ui/core/styles';
import PinIcon from './PinIcon';
//import Button from '@material-ui/core/Button';
//import Typography from '@material-ui/core/Typography';
//import DeleteIcon from '@material-ui/icons/DeleteTwoTone';

const INITIAL_VIEWPORT = {
	latitude: 37.7577,
	longitude: -122.4376,
	zoom: 15,
};
const Map = ({ classes }) => {
	const [viewport, setViewPort] = useState(INITIAL_VIEWPORT);
	const [userPosition, setuserPosition] = useState(null);

	useEffect(() => {
		getUserPosition();
	}, []);

	const getUserPosition = () => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((pos) => {
				const { latitude, longitude } = pos.coords;

				setViewPort({ ...viewport, latitude, longitude });
				setuserPosition({ latitude, longitude });
			});
		}
	};
	return (
		<div className={classes.root}>
			<ReactMapGL
				width='100vw'
				height='calc(100vh - 64px)'
				mapStyle='mapbox://styles/mapbox/streets-v11'
				mapboxApiAccessToken={process.env.REACT_APP_GEOPINS_MAPBOX_TOKEN}
				{...viewport}
				onViewportChange={(newviewPort) => setViewPort(newviewPort)}>
				<div className={classes.navigationControl}>
					<NavigationControl
						onViewportChange={(newviewPort) => setViewPort(newviewPort)}
					/>
				</div>
				{userPosition && (
					<Marker
						latitude={userPosition.latitude}
						longitude={userPosition.longitude}
						offsetLeft={-19}
						offsetTop={-37}>
						<PinIcon size={40} color='red' />
					</Marker>
				)}
			</ReactMapGL>
		</div>
	);
};

const styles = {
	root: {
		display: 'flex',
	},
	rootMobile: {
		display: 'flex',
		flexDirection: 'column-reverse',
	},
	navigationControl: {
		position: 'absolute',
		top: 0,
		left: 0,
		margin: '1em',
	},
	deleteIcon: {
		color: 'red',
	},
	popupImage: {
		padding: '0.4em',
		height: 200,
		width: 200,
		objectFit: 'cover',
	},
	popupTab: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
	},
};

export default withStyles(styles)(Map);
