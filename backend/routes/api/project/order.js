// import frameworks
const express = require('express');
const order = express.Router();
const auth = require('../../../middleware/auth');
const cors = require('cors');

order.use(cors());

// import database schema
const List = require('../../../models/List');

// Handel requests
order.get('/', (req, res) => {
    res.send("This is the project / order route");
});

// PUT requst to '/project' to modify order
order.put(
    '/project', 
    auth,
    async(req, res) => {
        const { firstProject, secondProject } = req.body;
        try {
            // modify the order
            const project1 = await List.findById(firstProject.referenceId);
            const project2 = await List.findById(secondProject.referenceId);
            project1.order = secondProject.order;
            project2.order = firstProject.order;
            await project1.save();
            await project2.save();
            res.status(200).json({message: "order updated"});
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "server error"
            })
        }
});

// PUT request to '/item' to modify order
order.put('/item', auth, async(req, res) => {
    try {
        const {firstItem, secondItem, listId} = req.body;
        const listToChange = await List.findById(listId);
        const newItems = listToChange.items.map(eachItem => {
            if (eachItem._id.toString() === firstItem.referenceId) {
                return {
                    item_frontend_id: eachItem.item_frontend_id,
                    item_order: secondItem.order,
                    content: eachItem.content,
                    tag: eachItem.tag,
                    _id: eachItem._id
                }
            } else if (eachItem._id.toString() === secondItem.referenceId) {
                return {
                    item_frontend_id: eachItem.item_frontend_id,
                    item_order: firstItem.order,
                    content: eachItem.content,
                    tag: eachItem.tag,
                    _id: eachItem._id
                }
            } else {
                return {
                    item_frontend_id: eachItem.item_frontend_id,
                    item_order: eachItem.item_order,
                    content: eachItem.content,
                    tag: eachItem.tag,
                    _id: eachItem._id
                }
            }
        });
        listToChange.items = newItems;
        const result = await listToChange.save();
        res.status(200).send(result);
    } catch (error) {
        
    }

})


module.exports = order;