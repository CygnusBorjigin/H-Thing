const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new mongoose.Schema({
	reference_id: {
		type: String,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	order: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true
	},
	items: [{
		item_frontend_id: {
			type: String
		},
		item_order: {
			type: Number,
			required: true
		},
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

