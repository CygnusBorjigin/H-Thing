// import frameworks
const express = require('express');
const info = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');
const cors = require('cors');

info.use(cors());

// import database schema
const User = require('../../../models/User');

// GET request to get all user information visable to end user
info.get('/', auth,  async (req, res) =>{
	try {
		const userInfo = await User.findById(req.user.id);
		if (!userInfo) return res.status(401).json({message: "User not found"});
		const userName = userInfo.name;
		const userEmail = userInfo.email;
		const userSince = userInfo.createDate;
		const result = {
			name: userName,
			email: userEmail,
			since: userSince
		};
		res.json(result);
	} catch (err){
		res.status(500).json({
			errors: "server error"
		})
	}
})

module.exports = info;

