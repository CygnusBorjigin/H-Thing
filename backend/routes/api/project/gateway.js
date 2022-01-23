// import frameworks
const express = require('express');
const project = express.Router();

project.get('/', (req, res) => {
	res.send('This is the project route');
});

project.use('/list', require('./list.js'));
project.use('/item', require('./item.js'));
project.use('/all', require('./all.js'));

module.exports = project;
