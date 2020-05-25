import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoTwoTone';
import LandscapeIcon from '@material-ui/icons/LandscapeOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/SaveTwoTone';

import Context from '../../context';
import { CREATE_PIN_MUTATION } from '../../graphql/mutations';
import { useClient } from '../../useClientHook';

const CreatePin = ({ classes }) => {
	const {
		state: {
			draft: { latitude, longitude },
		},
		dispatch,
	} = useContext(Context);
	const client = useClient();
	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');
	const [content, setContent] = useState('');
	const [submitting, setSubmitting] = useState(false);

	const handleDeleteDraft = () => {
		setTitle('');
		setImage('');
		setContent('');
		dispatch({ type: 'DELETE_DRAFT_PIN' });
	};
	const handleImageUpload = async () => {
		const data = new FormData();
		data.append('file', image);
		data.append('upload_preset', 'geopinss');
		data.append('cloud_name', 'affycent');
		const response = await fetch(
			'https://api.cloudinary.com/v1_1/affycent/image/upload',
			{
				method: 'POST',
				body: data,
			},
		);
		const preData = await response.json();

		return preData.url;
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			setSubmitting(true);

			const url = await handleImageUpload();
			const variables = { title, image: url, content, latitude, longitude };
			const { createPin } = await client.request(
				CREATE_PIN_MUTATION,
				variables,
			);
			console.log('CreatedPin', createPin);
			handleDeleteDraft();
		} catch (error) {
			setSubmitting(false);
			console.error('Error in creating Pin', error);
		}
	};
	return (
		<form className={classes.form}>
			<Typography
				className={classes.alignCenter}
				component='h2'
				variant='h4'
				color='secondary'>
				<LandscapeIcon className={classes.iconLarge} /> Pin Location
			</Typography>
			<div>
				<TextField
					name='title'
					label='Title'
					placeholder='Insert Pin Title'
					onChange={(e) => setTitle(e.target.value)}
				/>
				<input
					accept='image/*'
					id='image'
					type='file'
					className={classes.input}
					onChange={(e) => setImage(e.target.files[0])}
				/>
				<label htmlFor='image'>
					<Button
						component='span'
						size='small'
						className={classes.button}
						style={{ color: image && 'green' }}>
						<AddAPhotoIcon />
					</Button>
				</label>
			</div>
			<div className={classes.contentField}>
				<TextField
					name='content'
					label='content'
					multiline
					rows='6'
					margin='normal'
					fullWidth
					variant='outlined'
					onChange={(e) => setContent(e.target.value)}
				/>
			</div>
			<div>
				<Button
					className={classes.button}
					variant='contained'
					color='primary'
					onClick={handleDeleteDraft}>
					<ClearIcon className={classes.leftIcon} />
					Discard
				</Button>
				<Button
					className={classes.button}
					type='submit'
					variant='contained'
					color='secondary'
					disabled={!title.trim() || !image || !content.trim() || submitting}
					onClick={handleSubmit}>
					<SaveIcon className={classes.rightIcon} />
					Submit
				</Button>
			</div>
		</form>
	);
};

const styles = (theme) => ({
	form: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		paddingBottom: theme.spacing.unit,
	},
	contentField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: '95%',
	},
	input: {
		display: 'none',
	},
	alignCenter: {
		display: 'flex',
		alignItems: 'center',
	},
	iconLarge: {
		fontSize: 40,
		marginRight: theme.spacing.unit,
	},
	leftIcon: {
		fontSize: 20,
		marginRight: theme.spacing.unit,
	},
	rightIcon: {
		fontSize: 20,
		marginLeft: theme.spacing.unit,
	},
	button: {
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit,
		marginLeft: 0,
	},
});

export default withStyles(styles)(CreatePin);
