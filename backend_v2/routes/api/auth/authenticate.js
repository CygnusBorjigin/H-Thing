// impoer frameworks
const express = require('express');
const authen = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../../middleware/auth.js');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const cors = require('cors');


authen.use(cors());
// import the User module from databse
const User = require('../../../models/User');

authen.get('/', auth, async (req, res) => {
    // obtain the user information from the database
    // try token auth
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({
            message: "server error",
        });
    }
});

authen.post('/', 
            check('email', 'A valid email is required').isEmail(),
            check('password', 'A valid password is required').exists(),
            async (req, res) => {
                // check for errors in the input
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({
                        message: errors.array(),
                    })
                } else {
                    // the input contains no error
                    const { email, password } = req.body;
                    try {
                        // find the user in the database
                        let user = await User.findOne({ email });
                        if (!user) {
                            res.status(400).json({
                                message: 'Invalid Credentials',
                            })
                        } else {
                            // found the user
                            // check if the passwords match
                            const matches = await bcrypt.compare(password, user.password);
                            if (!matches) {
                                // the passwords do not match
                                res.status(400).json({
                                    message: "Invalid Crendentials",
                                });
                            } else {
                                // the password matches
                                const payload = {
                                    user: {
                                        id: user.id
                                    }
                                };
                                jwt.sign(
                                    payload,
                                    config.get('jwtSecret'),
                                    { expiresIn: '1 days' },
                                    (err, token) => {
                                        if (err) throw err;
                                        res.json({token});
                                    }
                                );
                            }
                        }
                    } catch (err) {
                        res.status(500).json({
                            message: 'server error',
                        });
                    }
                }
            });
module.exports = authen;
