// import framewarks
const express = require('express');
const bcrypt = require('bcryptjs');
const password = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');

// import database schema
const User = require('../../../models/User');

// PUT request to modify the password of a given user
// This is a private rout
password.put('/', 
            auth,
            check('old_password', 'a valid password is required').isLength({ min: 6 }),
            check('new_password', 'a valid password is required').isLength({ min: 6 }),
            async (req, res) => {
               const validation_error = validationResult(req);
               const { old_password, new_password } = req.body;
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
                            const matches = await bcrypt.compare(old_password, user.password);
                            if (!matches) {
                                res.status(401).json({
                                    message: 'wrong password'
                                });
                            } else {
                                const salt = await bcrypt.genSalt(10);
                                user.password = await bcrypt.hash(new_password, salt);
                                user.save();
                                res.json({
                                    message: "password changed"
                                });
                            }
                        }
                    } catch (err) {
                       res.status(500).json({
                            errors: "server error",
                        }); 
                    }
                } 
            });

module.exports = password;
