// import frameworks
const express = require('express');
const gateway = express.Router();
const cors = require('cors');

gateway.use(cors());

// make sure this route is reachable
gateway.get('/', (req, res) => {
	res.send('This is the auth gateway');
});

// connect to the sub-routes
gateway.use('/authenticate', require('./authenticate.js'));

module.exports = gateway;

