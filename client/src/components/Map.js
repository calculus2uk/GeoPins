import React, { useState, useEffect, useContext } from 'react';
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl';
import { differenceInMinutes } from 'date-fns';

import PinIcon from './PinIcon';
import Context from '../context';
import Blog from './Blog';

//
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/DeleteTwoTone';
import { useClient } from '../useClientHook';

//
import { GET_PINS_QUERY } from '../graphql/queries';

const INITIAL_VIEWPORT = {
	latitude: 37.7577,
	longitude: -122.4376,
	zoom: 15,
};
const Map = ({ classes }) => {
	const [viewport, setViewPort] = useState(INITIAL_VIEWPORT);
	const [userPosition, setuserPosition] = useState(null);
	const { state, dispatch } = useContext(Context);
	const client = useClient();

	//eslint-disable-next-line
	useEffect(() => {
		getUserPosition();
	}, []);

	//eslint-disable-next-line
	useEffect(() => {
		getPins();
	}, []);

	const getPins = async () => {
		try {
			const { getPins } = await client.request(GET_PINS_QUERY);
			dispatch({ type: 'GET_PINS', payload: getPins });
		} catch (error) {
			console.error('error', error);
		}
	};
	const getUserPosition = () => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((pos) => {
				const { latitude, longitude } = pos.coords;

				setViewPort({ ...viewport, latitude, longitude });
				setuserPosition({ latitude, longitude });
			});
		}
	};
	const handleMapClick = ({ lngLat, leftButton }) => {
		if (!leftButton) return;
		if (!state.draft) dispatch({ type: 'CREATE_DRAFT' });

		const [longitude, latitude] = lngLat;
		console.log('object');
		dispatch({
			type: 'UPDATE_DRAFT_LOCATION',
			payload: { longitude, latitude },
		});
	};

	const highlightNewPin = (pin) => {
		const isNewPin =
			differenceInMinutes(Date.now(), Number(pin.createdAt)) <= 30;
		return isNewPin ? 'limegreen' : 'darkblue';
	};
	return (
		<div className={classes.root}>
			<ReactMapGL
				width='100vw'
				height='calc(100vh - 64px)'
				mapStyle='mapbox://styles/mapbox/streets-v11'
				mapboxApiAccessToken={process.env.REACT_APP_GEOPINS_MAPBOX_TOKEN}
				{...viewport}
				onClick={handleMapClick}
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
				{/*Draft Pin */}
				{state.draft && (
					<Marker
						latitude={state.draft.latitude}
						longitude={state.draft.longitude}
						offsetLeft={-19}
						offsetTop={-37}>
						<PinIcon size={40} color='hotpink' />
					</Marker>
				)}

				{/*CREATED PINS */}

				{state.pins.map((pin) => (
					<Marker
						key={pin.latitude + pin.longitude + pin._id}
						latitude={pin.latitude}
						longitude={pin.longitude}
						offsetLeft={-19}
						offsetTop={-37}>
						<PinIcon size={40} color={highlightNewPin(pin)} />
					</Marker>
				))}
			</ReactMapGL>
			<Blog />
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
