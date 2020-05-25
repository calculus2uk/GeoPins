const mongoose = require('mongoose');

// fix error
const PinSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		image: String,
		latitude: Number,
		longitude: Number,
		comments: [
			{
				text: String,
				createdAt: { type: Date, default: Date.now },
				author: { type: mongoose.Schema.ObjectId, ref: 'User' },
			},
		],
		author: { type: mongoose.Schema.ObjectId, ref: 'User' },
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Pin', PinSchema);
