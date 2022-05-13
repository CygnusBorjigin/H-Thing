// import frameworks
const express = require('express');
const register = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');
const cors = require('cors');

register.use(cors());

const User = require('../../../models/User');

// check if the route is accessable
register.get('/', (re, res) => {
	res.send('This is the user / register route');
});

// POST request to register a new user
// This is a public rout
register.post('/', 
            check('email', 'Email is required').isEmail(),
            check('password', 'A password of length 6 or more is required').isLength({ min: 6 }),
            async (req, res) => {
                //check for errors during the validation process
                const validation_error = validationResult(req);
                if (!validation_error.isEmpty()){
                        res.status(400).json({ 
                                            errors:validation_error.array(), 
                                        })
                } else {
                // There is no error in the validation
                    // check if the user has already been registered
                    const { name, email, password } = req.body;
                    try {
                        let user = await User.findOne({email});
                        if (user) {
                            // The user exist in the database
				res.status(400).json({
					message: 'The user has already been registered'
				});
                        } else {
                            // The use is indeed new
                            if (name === "") {
                                name = "unnamed_user";
                            }
                            user = new User({
                                name,
                                email,
                                password
                            });
                            const salt = await bcrypt.genSalt(10);
                            user.password = await bcrypt.hash(password, salt);
                            await user.save();
                            
                            // Send the json web token to the user
                            const payload = {user:{id: user.id}};
                            jwt.sign(payload,
                                     config.get("jwtSecret"),
                                     {expiresIn: "1 days"},
                                     (err, token) => {
                                         if (err) throw err;
                                         res.json({token});
                                     })
                        }
                    } catch (error) {
                        res.status(500).json({
                            errors: "server error",
                        });
                    }
                }
            });


module.exports = register;
