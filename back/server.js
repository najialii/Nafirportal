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
const mentorsessions = require('./routes/mentorSessions');
const convroutes = require('./routes/convroutes');
const Message = require('./routes/msgroutes');
const menreq = require('./routes/menSesReq');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoute');
const connectionRoutes = require('./routes/connectRouter');
const blogs = require('./routes/blogsRoutes');
const act = require('./routes/activityRoutes');

const app = express();
app.use(express.json({ limit: '1000mb' }));
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use((req, res, next) => {
    console.log('Middleware executed');
    console.log(req.path, req.method);
    next();
});


app.use('/templates', express.static(path.join(__dirname, 'templates')));

app.use('/api/cvs', cvRoutes);

// Use the activity routes
app.use('/api/activities', activityRoutes);


app.use('/api/mentorsessions', mentorsessions);
app.use("/api/requestsession", menreq);
app.use("/api/user", userRoutes);
app.use("/api/conversation", convroutes);
app.use("/api/messages", Message);
app.use("/api/connect", connectionRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/activity', activityRoutes);
app.use("/api/blogs", blogs);
app.use("/api/act", act);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE ", "PATCH", "PUT"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    }
});

// Chat functionality
let users = [];
const addUser = (userId, socketId) => {
    if (!users.some(user => user.userId === userId)) {
        users.push({ userId, socketId });
    } else {
        // If the user exists, update their socket ID
        users = users.map(user =>
            user.userId === userId ? { userId, socketId } : user
        );
    }
    console.log('here are the users array', users);
};

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find(user => user.userId === userId);
};

io.on('connection', (socket) => {
    console.log(`user connected with socket id: ${socket.id}`);

    // Take user id and socket id from user
    socket.on('add-user', (userId) => {
        console.log(`User added: ${userId}, Socket ID: ${socket.id}`);
        addUser(userId, socket.id);
        io.emit("get-users", users);
    });

    // Join room
    socket.on("join-room", (data) => {
        socket.join(data);
        console.log(`user ${socket.id} joined room ${data}`);
    });

    // Send and get message
    socket.on('send-message', ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        console.log('sent message data', senderId, receiverId, text);

        if (!user) {
            console.log('user not found in the list');
            return;
        }
        io.to(user.socketId).emit('get-messages', {
            senderId,
            text
        });
    });

    socket.on('disconnect', () => {
        removeUser(socket.id);
        console.log(`user disconnected with the id: ${socket.id}`);
        io.emit("get-users", users);
    });
});

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


