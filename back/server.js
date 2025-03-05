    require('dotenv').config();
//    const { v4: uuidv4 } = require('uuid'); 
    const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors');
    const http = require('http');
    const { Server } = require('socket.io');



    const app = express();



    app.use(express.json());
    app.use(cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    }));

    const mentorsessions = require('./routes/mentorSessions');
    const convroutes = require('./routes/convroutes')
    const Message = require('./routes/msgroutes')


    const menreq = require('./routes/menSesReq');
    const userRoutes = require('./routes/userRoutes');
    const cvRoutes = require("./routes/cvrouts");
    const chatRoutes = require('./routes/chatRoute');
    // const Chat = require('./models/chat'); // Import the Chat model
const connectionRoutes = require('./routes/connectRouter')



    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            allowedHeaders: ["Content-Type", "Authorization"],
            credentials: true
        }
    });


    app.use((req, res, next) => {
        console.log('Middleware executed');
        console.log(req.path, req.method);
        next();
    });

    // Routes
    app.use('/api/mentorsessions', mentorsessions);
    app.use("/api/requestsession", menreq);
    app.use("/api/user", userRoutes);
    app.use("/api/cvs", cvRoutes);
  //  app.use("/api/chat", chatRoutes);
    app.use("/api/conversation", convroutes);
    app.use("/api/messages", Message);
    app.use("/api/connect", connectionRoutes);



    // chat functionality  
    let users = [] 
    const addUser = (userId, socketId)=>{
       !users.some(user => user.userId === userId) &&
       users.push({userId, socketId})
    }
   
    const RemoveUser = (socketId)=>{
        users = users.filter(user => user.socketId !== socketId)
    }
// create room 
// const createRoom = (user1, user2)=>{
//     if(user1, user 2 >sort .joi)
// })
    const getUser = (userId)=>{
        return users.find(user => user.userId === userId)
    }
    io.on('connection', (socket)=>{
        console.log(`user conected with soc id : ${socket.id}`);

        //take from user id and socket id from user
socket.on('add-user', (userId)=>{
addUser(userId,socket.id)
io.emit("get-users", users)
})

        // join
       socket.on("join-room", (data) => {
         socket.join(data)
         console.log(`user ${socket.id} joined room ${data}`)
        })


        
        // send and get  msg
socket.on('send-message' , ({senderId, receiverId, text})=>{
const user = getUser(receiverId)

if(!user){
    console.log('user not found in the list' )
    return
    }
io.to(user.socketId).emit('get-messages',{
    senderId, 
    text
})

    // console.log(data)
//   socket.to(data.room).emit('receive-message', data)
} )
        socket.on('disconnect', (socket) =>{
            RemoveUser(socket.id)
            console.log(`user disconnected with the id : ${socket.id}`)
            //i have no clue tbh 
            io.emit("get-users", users) 
        })
        
    })

    // Chat server functionality
    // io.on('connection', (socket) => {
    //     console.log(`User connected with socket ID: ${socket.id}`);

    //     socket.on('join-room', (room) => {
    //         socket.join(room);
    //         console.log(`User ${socket.id} joined room ${room}`);
    //     });

    //     socket.on('create-room', (users) => {
    //         // Generate a unique room ID
    
    //         socket.join('join-room');
    //         console.log(`Room ${roomId} created and ${users.join(', ')} have joined`);

    //         // Emit the room ID back to both users
    //         io.to(socket.id).emit('room-created', roomId);
    //     });

    //     socket.on('send-message', async (data) => {
    //         try {
    //             console.log("Received message data:", data); // Debugging log
        
    //             // Destructure with a fallback to prevent errors
    //             const { sender, receiver, message } = data || {};
               
    //             const room = [sender, receiver].sort().join('-');
        
    //             // Validate required fields
    //             if (!sender || !receiver || !room || !message) {
    //                 console.error("Missing required fields:", { sender, receiver, room, message });
    //                 return;
    //             }
        
    //             // Save message to MongoDB
    //             const newMessage = new Chat({ sender, receiver, room, message });
    //             await newMessage.save();
    //             console.log("Message saved successfully:", newMessage);
        
    //             // Emit message to the room
    //             io.to(room).emit('receive-message', newMessage);
    //         } catch (error) {
    //             console.error("Error saving message:", error);
    //         }
    //     });
        

    //     socket.on('disconnect', () => {
    //         console.log(`User disconnected with socket ID: ${socket.id}`);
    //     });
    // });

    // Connect to DB
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connected to database');

            server.listen(process.env.PORT, () => {
                console.log('Server is running on the port', process.env.PORT);
            });
        })
        .catch((error) => {
            console.error('Database connection error:', error);
        });


