//     const express = require('express');
//     const router = express.Router();
//     const Message = require('../models/chat');

//     // Get chat messages in a room
//     router.get('/history', async (req, res) => {
//         try {
//             console.log("Received Query Params:", req.query);
    
//             const { user1, user2 } = req.query;
    
//             if (!user1 || !user2) {
//                 return res.status(400).json({ error: "Both user1 and user2 are required." });
//             }
    
//             // Ensure consistent room name
//             const room = [user1, user2].sort().join('-');
//             console.log("Fetching messages for room:", room);
//             const messages = await Message.find({
//                 $or: [
//                     { sender: user1, receiver: user2 },
//                     { sender: user2, receiver: user1 }
//                 ]
//             }).sort({ createdAt: 1 });
            
//             console.log("Messages found:", messages);
            
//             console.log("Fetched Messages:", messages);
//             res.status(200).json(messages);
//         } catch (error) {
//             console.error("Error fetching chat history:", error);
//             res.status(500).json({ error: error.message });
//         }
//     });

//     // Send a message
//     router.post('/sendmessage', async (req, res) => {
//         try {
//             const { sender, receiver, room, message } = req.body;

//             const newMessage = new Message({ sender,receiver, room, message });
//             await newMessage.save();

//             res.status(201).json(newMessage);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     });


//     // Get all rooms for a user
// router.get('/rooms', async (req, res) => {
//     try {
//         const { user } = req.query;

//         if (!user) {
//             return res.status(400).json({ error: "User is required." });
//         }

//         // Fetch all rooms where the user is either the sender or receiver
//         const rooms = await Message.aggregate([
//             {
//                 $match: {
//                     $or: [{ sender: user }, { receiver: user }],
//                 },
//             },
//             {
//                 $group: {
//                     _id: {
//                         room: {
//                             $cond: {
//                                 if: { $lt: [{ $cmp: ["$sender", "$receiver"] }, 0] },
//                                 then: { $concat: ["$sender", "-", "$receiver"] },
//                                 else: { $concat: ["$receiver", "-", "$sender"] },
//                             },
//                         },
//                     },
//                 },
//             },
//             {
//                 $project: {
//                     room: "$_id.room",
//                     _id: 0,
//                 },
//             },
//         ]);

//         res.status(200).json(rooms);
//     } catch (error) {
//         console.error("Error fetching chat rooms:", error);
//         res.status(500).json({ error: error.message });
//     }
// });


//     module.exports = router;
