// import frameworks
const express = require('express');
const report = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');
const cors = require('cors');

report.use(cors());

// import database schema
const User = require('../../../models/User');
const reportBug = require('../../../models/BugReport');
const { model } = require('mongoose');

// handel request
report.get('/', (req, res) => {
    res.send('This is the support / report route');
});

module.exports = report;