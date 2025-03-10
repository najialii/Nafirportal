        const express = require('express');
        const router = express.Router();
        const crypto = require('crypto')
require('dotenv').config()
        const algorithm = 'aes-256-cbc';
        const key = Buffer.from(process.env.SECRET_KEY, 'hex')
        const iv =crypto.randomBytes(16)

        const Message = require('../models/message');

        const encrypt = (text)=>{
            let cipher = crypto.createCipheriv(algorithm, key,iv)
            let encrypted = cipher.update(text, 'utf-8', 'hex')
            encrypted += cipher.final            ('hex')
            return { encryptedData: encrypted, iv: iv.toString('hex') } 
        }
        

        const decrypt = (encryptedText, iv) => {
            let decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
            let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        };
        

        router.post ('/', async (req, res) => {
            // const newMessage = new Message(req.body)
            try {
                const {sender , conversationId, text} = req.body
                encrypted = encrypt(text)
                const newMessage = new Message({
                    sender,
                    conversationId,
                    text: encrypted.encryptedData,
                    iv: encrypted.iv, 
                });
                 const saveMsg = await newMessage.save()
                res.status(200).json(saveMsg)
            } catch (err) {
                res.status(500).json(err)
            }
        })  

        router.get('/:conversationId', async (req, res) => {
            try {
                const messages = await Message.find({
                    conversationId: req.params.conversationId
                });
        

                const decryptedMessages = messages.map(message => {
                
                    console.log("Encrypted Text:", message.text);
                    console.log("IV:", message.iv);
        
                    try {
                        const decryptedText = decrypt(message.text, message.iv);
                        return {
                            ...message.toObject(),
                            text: decryptedText 
                        };
                    } catch (decryptionError) {
                        console.error("Decryption error:", decryptionError);
                        return {
                            ...message.toObject(),
                            text: "Error decrypting message"
                        };
                    }
                });
        
                res.status(200).json(decryptedMessages);
            } catch (err) {
                console.error("Error fetching messages:", err);
                res.status(500).json(err);
            }
        });
        

        module.exports = router