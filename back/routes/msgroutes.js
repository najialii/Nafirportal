        const express = require('express');
        const router = express.Router();


        const Message = require('../models/message');



        router.post ('/', async (req, res) => {
            const newMessage = new Message(req.body)

            try {
                 const saveMsg = await newMessage.save()
                res.status(200).json(saveMsg)
            } catch (err) {
                res.status(500).json(err)
            }
        })  


        router.get('/:conversationId', async(req, res)=>{
            try{
               const messages = await Message.find({

                   conversationId: req.params.conversationId
                })
                //  console.log("Fetched Messages:", messages);
                res.status(200).json(messages)
            }catch(err) {
                res.status(500).json(err)
            }
        })


        module.exports = router