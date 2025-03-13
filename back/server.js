require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cvRoutes = require('./routes/cvrouts');
const activityRoutes = require('./routes/activityRoutes');

const departmentRoutes = require('./routes/departmentRoutes');
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use((req, res, next) => {
    console.log('Middleware executed');
    console.log(req.path, req.method);
    next();
});

// Serve static files from the "templates" directory
app.use('/templates', express.static(path.join(__dirname, 'templates')));

// Use the CV routes
app.use('/api/cvs', cvRoutes);

// Use the activity routes
app.use('/api/activities', activityRoutes);

// Other routes...
const mentorsessions = require('./routes/mentorSessions');
const convroutes = require('./routes/convroutes');
const Message = require('./routes/msgroutes');
const menreq = require('./routes/menSesReq');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoute');
const connectionRoutes = require('./routes/connectRouter');

app.use('/api/mentorsessions', mentorsessions);
app.use("/api/requestsession", menreq);
app.use("/api/user", userRoutes);
app.use("/api/conversation", convroutes);
app.use("/api/messages", Message);
app.use("/api/connect", connectionRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/activity', activityRoutes);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    }
});

// chat functionality  
let users = [] 
const addUser = (userId, socketId) => {
    
    if (!users.some(user => user.userId === userId)) {
        users.push({ userId, socketId });
    } else {
        // If the user  existsupdate their socket ID
        users = users.map(user =>
            user.userId === userId ? { userId, socketId } : user
        );
    }
    console.log('here are the users array',users)
};


const RemoveUser = (socketId)=>{
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userId)=>{
    return users.find(user => user.userId === userId)
}
io.on('connection', (socket)=>{
    console.log(`user conected with soc id : ${socket.id}`);

    //take  user id and socket id from user
socket.on('add-user', (userId)=>{    
console.log(`User added: ${userId}, Socket ID: ${socket.id}`); 
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
console.log('sent message data', senderId, receiverId, text)

if(!user){
console.log('user not found in the listtttttttttttt' )
return
}
io.to(user.socketId).emit('get-messages',{
senderId, 
text
})

// console.log(text)
    // console.log(data)
//   socket.to(data.room).emit('receive-message', data)
} )
    socket.on('disconnect', () =>{
        RemoveUser(socket.id)
        console.log(`user disconnected with the id : ${socket.id}`)
        //i have no clue tbh 
        io.emit("get-users", users) 
    })
    
})

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


