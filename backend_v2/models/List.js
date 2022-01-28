const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new mongoose.Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	title: {
		type: String,
		required: true
	},
	items: [{
		content: {
			type: String,
			required: true
		},
		startDate: {
			type: Date,
			required: false
		},
		endDate: {
			type: Date,
			required: false
		},
		tag: {
			type: [String],
			required: false
		}
	}],
	status: {
		finished: Boolean,
		default: false
	},
	createdDate: {
		type: Date,
		default: Date.now
	},
	startDate: {
		type: Date,
		required: false
	},
	deadline: {
		type: Date,
		required: false
	},
	tag: {
		type: [String],
		required: false
	},
	description: {
		type: String,
		required: false
	}
});

module.exports = mongoose.model('list', ListSchema);

