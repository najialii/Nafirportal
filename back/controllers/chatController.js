const Message = require('../models/chat');
const User = require('../models/userModle');


const sendMessage = async (req, res) => {
//     try {
//         const { sender, receiver, message } = req.body;


//         const senderUser = await User.findById(sender);
//         const recevierUser = await User.findById(receiver)
//         if (!senderUser || !recevierUser) {
//             return res.status(404).json({ error: "Sender not found" });
//         }
// const room = [sender , receiver].sort().join('-')

// const newMessage = await Message.create({ sender, receiver, room, message });

//         res.status(201).json(newMessage);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
};
const getChatHistory = async (req, res) => {
    // try {
    //     console.log("Received Query Params:", req.query); // Debugging log

    //     const { room } = req.query; // Get room directly from query params

    //     if (!room) {
    //         return res.status(400).json({ error: "Room ID is required." });
    //     }

    //     console.log("Fetching messages for room:", room); // Debugging log

    //     const messages = await Message.find({ room }).sort({ createdAt: 1 });

    //     console.log("Fetched Messages:", messages); // Debugging log

    //     res.status(200).json(messages);
    // } catch (error) {
    //     console.error("Error fetching chat history:", error);
    //     res.status(500).json({ error: error.message });
    // }
};



// module.exports = { sendMessage, getChatHistory };