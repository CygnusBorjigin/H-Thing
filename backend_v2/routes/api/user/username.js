// import frameworks
const express = require('express');
const username = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');
const cors = require('cors');

username.use(cors());

// import database schema
const User = require('../../../models/User');
const List = require('../../../models/List');

// Handel requests
username.get('/', (req, res) => {
	res.send('This is the user/username route');
});

// PUT request to modify a user's name
// This is a provate rout
username.put('/', 
            auth,
            check('new_user_name', 'a valid user name is required').not().isEmpty(),
            async (req, res) => {
               const validation_error = validationResult(req);
                if (!validation_error.isEmpty()){
                        res.status(400).json({ 
                                            errors:validation_error.array(), 
                                        });
                } else {
                    try {
                        const user = await User.findById(req.user.id);
                        if (!user) {
                            res.status(400).json({
                                message: 'user does not exist'
                            });
                        } else {
                            user.name = req.body.new_user_name;
                            user.save();
                            res.send(user);
                        }
                    } catch (err) {
                       res.status(500).json({
                            errors: "server error",
                        }); 
                    }
                } 
            });
module.exports = username;
