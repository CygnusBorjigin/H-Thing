//import frameworks
const express = require('express');
const support = express.Router();
const cors = require('cors');

support.use(cors());

support.get('/', (req, res) => {
    res.send('This is the support route');
});

//support.use('/reportBug', require('./reportBug.js'));

module.exports = support;