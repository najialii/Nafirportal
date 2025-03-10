const express = require('express');
const router = express.Router();


const Conversation = require('../models/conversation');


// new conversation 
router.post('/', async (req,res)=> {

    try {
        const existingConversation = await Conversation.findOne({
            members: { $all: [req.body.senderId, req.body.receiverId] }
        });

        if (existingConversation) {
            return res.status(200).json(existingConversation);
        }

        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId]
        });

        const savedConversation = await newConversation.save();
        res.status(201).json(savedConversation);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    // //check if conversation exist 

    // try {
    //     const saveCon = await newConversation.save();
    //     res.status(200).json(saveCon)

    // } catch {
    //     res.status(500).json(error)
    // }
})

//getConversation
router.get('/:userId', async (req, res) => {
try {
const conversation = await Conversation.find({
    members: {$in: [req.params.userId]}
}).populate('members', 'name profilePicture');

res.status(200).json(conversation)

     } catch(err) {
    res.status(500).json(err)
     }  
})







module.exports = router;