// import frameworks
const express = require('express');
const gateway = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');
const cors = require('cors');

gateway.use(cors());

// import database schema
const User = require('../../../models/User');

// making sure the route is reachable
gateway.get('/', (req, res) => {
	res.send('this is the user route');
});


// DELETE request to delete the user
gateway.delete('/',
              check('email', 'A valid email is required').isEmail(),
              auth,
              async (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({
                        message: errors.array()
                    });
                } else {
                    try {
                        const user = await User.findById(req.user.id);
                        const actualEmail = user.email;
                        if (actualEmail == req.body.email) {
                            await User.findByIdAndDelete(req.user.id);    
                            res.status(200).json({
                                message: "user deleted"
                            });
                        } else {
                            res.status(400).json({
                                message: "wrong email"
                            });
                        }
                        
                    } catch (err) {
                        res.status(500).json({
                            message: 'server errors'
                        });
                    }    
                }
                
              });

gateway.use('/register', require('./register.js'));
gateway.use('/email', require('./email.js'));
gateway.use('/info', require('./info.js'));
gateway.use('/password', require('./password.js'));
gateway.use('/username', require('./username.js'));

module.exports = gateway;
