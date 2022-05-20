// import frameworks
const express = require('express');
const report = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');
const cors = require('cors');

report.use(cors());

// import database schema
const ReportBug = require('../../../models/BugReport');

// handel request
report.get('/', (req, res) => {
    res.send('This is the support / report route');
});

report.post('/bug', 
            auth,
            check('bug_detail', 'There is nothing in the report'),
            async (req, res) => {
                // check for error in the input
                const errors = validationResult(req);
                if (!errors.isEmpty()) return res.status(400).json({ message : errors.array()});
                try {
                    const newBugReport = new ReportBug({
                        user: req.user.id,
                        content: req.body.content
                    });
                    await newBugReport.save();
                    res.status(200).json({ message: "reported" })
                } catch (err) {
                    console.log(err);
                        res.status(500).json({
                            errors: "server error",
                        });
                }
});

module.exports = report;