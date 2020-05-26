export default function reducer(state, { type, payload }) {
	switch (type) {
		case 'LOGIN_USER':
			return { ...state, currentUser: payload };

		case 'IS_LOGGED_IN':
			return { ...state, isAuth: payload };

		case 'SIGNOUT_USER':
			return { ...state, isAuth: false, currentUser: null };

		case 'CREATE_DRAFT':
			return {
				...state,
				draft: { latitude: 0, longitude: 0 },
				CurrentPin: null,
			};

		case 'UPDATE_DRAFT_LOCATION':
			return { ...state, draft: payload };
		case 'DELETE_DRAFT_PIN':
			return { ...state, draft: null };
		case 'GET_PINS':
			return { ...state, pins: payload };
		case 'CREATE_PIN':
			const newPin = payload;
			const prevPins = state.pins.filter((pin) => pin._id !== newPin._id);
			return { ...state, pins: [...prevPins, newPin] };

		case 'DELETE_PIN':
			const deletedPin = payload;
			const filteredPins = state.pins.filter(
				(pin) => pin._id !== deletedPin._id,
			);
			return { ...state, pins: filteredPins, CurrentPin: null };
		case 'SET_PIN':
			return { ...state, CurrentPin: payload, draft: null };

		default:
			return { state };
	}
}
