import { createContext } from 'react';

const Context = createContext({
	currentUser: null,
	isAuth: false,
	draft: null,
	pins: [],
	CurrentPin: null,
});

export default Context;
