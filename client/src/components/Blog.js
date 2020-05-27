import React, { useContext } from 'react';

//
import Context from '../context';
import NoContent from './Pin/NoContent';
import CreatePin from './Pin/CreatePin';
import PinContent from './Pin/PinContent';

//
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const Blog = ({ classes }) => {
	const {
		state: { draft, CurrentPin },
	} = useContext(Context);

	let BlogContent;

	if (!draft && !CurrentPin) {
		BlogContent = <NoContent />;
	} else if (draft && !CurrentPin) {
		BlogContent = <CreatePin />;
	} else if (!draft && CurrentPin) {
		BlogContent = <PinContent />;
	}
	return <Paper className={classes.root}>{BlogContent}</Paper>;
};

const styles = {
	root: {
		minWidth: 350,
		maxWidth: 400,
		maxHeight: 'calc(100vh - 64px)',
		overflowY: 'scroll',
		display: 'flex',
		justifyContent: 'center',
	},
	rootMobile: {
		maxWidth: '100%',
		maxHeight: 300,
		overflowX: 'hidden',
		overflowY: 'scroll',
	},
};

export default withStyles(styles)(Blog);
