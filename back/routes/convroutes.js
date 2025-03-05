const express = require('express');
const router = express.Router();


const Conversation = require('../models/conversation');


// new conversation 
router.post('/', async (req,res)=> {
    const newConversation = new Conversation({
        members:[req.body.senderId, req.body.receiverId  ]
    })

    try {
        const saveCon = await newConversation.save();
        res.status(200).json(saveCon)

    } catch {
        res.status(500).json(error)
    }
})

//getConversation
router.get('/:userId', async (req, res) => {
    try {
const conversation = await Conversation.find({
    members: {$in: [req.params.userId]}
})
res.status(200).json(conversation)

     } catch(err) {
    res.status(500).json(err)
     }
})







module.exports = router;