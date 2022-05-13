const mongoose = require('mongoose');

const BugReportSchema = new mongoose.Schema({
	user: {
		type: String,
		required: true
	},
	reportDate: {
		type: Date,
		default: Date.now
	},
	content: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('bugReport', BugReportSchema);
