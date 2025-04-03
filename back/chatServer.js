// const http = require('http');
// const { Server } = require('socket.io');
// const mongoose = require('mongoose');
// const Message = require('./models/chat');

// const server = http.createServer();
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST"]
//     }
// });

// io.on('connection', (socket) => {
//     console.log(`User connected with socket ID: ${socket.id}`);

//     socket.on('join-room', (room) => {
//         socket.join(room);
//         console.log(`User ${socket.id} joined room ${room}`);
//     });

//     socket.on('send-message', async (data) => {
//         const { sender, room, message } = data;

//         console.log(`Message from ${sender} in room ${room}: ${message}`);

//         // Save message to MongoDB
//         const newMessage = new Message({ sender, room, message });
//         await newMessage.save();

//         // Emit message to the room
//         io.to(room).emit('receive-message', newMessage);
//     });

//     socket.on('disconnect', () => {
//         console.log(`User disconnected with socket ID: ${socket.id}`);
//     });
// });

// const PORT = process.env.PORT || 4000;
// server.listen(PORT, () => {
//     console.log(`Chat server is running on port ${PORT}`);
// });
