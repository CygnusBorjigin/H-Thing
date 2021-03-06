// import framewarks
const express = require('express');
const list = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');
const cors = require('cors');

list.use(cors());

// import database schema
const User = require('../../../models/User');
const List = require('../../../models/List');

// Handel requests
list.get('/', (req, res) => {
	res.send('This is the project/list route');
});
// POST request to create a todo list
// This rout is private
list.post('/',
	auth,
	check('title', 'A title is required').not().isEmpty(),
	async (req, res) => {
		//check if there is any error in the input
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({
                        message: errors.array(),
                    });
                } else {
                    // There is no error in the input
                    // Obtain the user information from the database
                    try {
                        // Construct the list object
                        const { title, items, deadline, tag, description, order, reference_id } = req.body;
			            // Restructure the data
			            const final_items = items.map(each => {
				            return({
					            content: each,
				            });
			            });
                        const newList = new List({
                            user: req.user.id,
                            title,
                            order,
                            items: final_items,
                            deadline,
                            tag,
                            description,
                            reference_id
                        });

                        const saved_list = await newList.save();
                        res.json(saved_list);

                    } catch (err) {
                        console.log(err);
                        res.status(500).json({
                            message: "Server error"
                        });
                    }
                }
            });
// DELETE request to remove a list
// This is a provate rout
list.delete('/',
	      auth,
              check('list_id', 'A valid list id is required').not().isEmpty(),
              async (req, res) => {
                // check if any error is in the input
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({
                        message:errors.array(),
                    });
                } else {
                    try {
                        const user = req.user.id;
                        const list = await List.findById(req.body.list_id);
                        if (!list) return res.status(400).json({message : "A valid list id is required"});
                        const list_owner = list.user;
                        if (user == list_owner) {
                            const respond = await List.findByIdAndDelete({_id:req.body.list_id});
                            res.json({message : "Project deleted"});
                        } else {
                            res.status(500).json({message : "The user does not have write access to this list"});
                        }
                    } catch (err) {
                        res.status(500).json({
                            message: "server error",
                        });
                    }
                }
              });

// PUT request to modify the title
// This is a private rout
list.put('/',
            auth,
            check('list_id', 'A valid list ID is required').not().isEmpty(),
            check('title', 'A valid title is required').not().isEmpty(),
            async (req, res) => {
                // check if any error is in the input
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({
                        message: errors.array(),
                    });
                } else {
                    // There is no error in the input
                    try {
                        const user = req.user.id;
                        const list = await List.findById(req.body.list_id);
                        if (!list) return res.status(400).json({message : "A valid list ID is required"});
                        const list_owner = list.user;
                        if (user == list_owner) {
                            const new_list = await List.updateOne({ _id: req.body.list_id }, { title: req.body.title });
                            res.json(new_list);
                        } else {
                            res.send('This user does not have write access the list');
                        }    
                    } catch (err) {
                        res.status(500).json({
                            message: "server error",
                        });
                    }
                    
                }
});

module.exports = list;
