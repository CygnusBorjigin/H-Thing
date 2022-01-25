const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // Get the token from the request header
    const token = req.header('x-auth-token');
    // check if the token exit
    if (!token) {
        res.status(401).json({
            message: "No token is received, auth filed",
            dev_message: "error occured during retriving token, code line 12 middleware/auth.js"
        })
    } else {
        // the token is successfully received
        try{
            jwt.verify(token, config.get('jwtSecret'), (error, decode) => {
                if (error) {
                    res.status(401).json({
                        message: 'Token is invalid',
                        dev_message: "error occured in auth middleware, code line 21 middleware auth.js"
                    })
                } else {
                    req.user = decode.user;
                    next();
                }
            })

        } catch (err) {
            res.status(500).json({
            message: 'server error',
            dev_message: 'error occured in auth middleware, code line 32 middleware/auth.js'
            });
        }
    }
};