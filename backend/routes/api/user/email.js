// import framewarks
const express = require('express');
const email = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');

// import database schema
const User = require('../../../models/User');
const List = require('../../../models/List');

// Handel requests
email.get('/', (req, res) => {
	res.send('This is the user/email route');
});


// PUT request to modify the email of a given user
// This is a private rout
email.put('/',
	   auth,
	   check('new_email', 'a valid email address is required').not().isEmpty(),
	async (req, res) => {
		const validation_error = validationResult(req);
		const new_email = req.body.new_email;
		if (!validation_error.isEmpty()) {
			res.status(400).json({
				errors: validation_error.array()
			});
		} else {
			try {
				const user = await User.findById(req.user.id);
				if (!user) {
					res.status(400).json({
						message: "user does not exit"
					});
				} else {
					user.email = new_email;
					user.save();
					res.json({
						message: "Email updated"
					});
				}
			} catch (err) {
				res.status(500).json({
					message: "server error"
				});
			}
		}
	})


module.exports = email;
