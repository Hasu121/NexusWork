const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors');
const {Server} = require('socket.io');
const http = require("http");

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    },
});

require('./connection');
require('dotenv').config({path: './config.env'});


const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use('/public', express.static('public'));

io.on("connection", (socket) => {
    console.log("A user connected: ");
    socket.on("joinConversation", (conversationId) => {
        console.log(`User joined conversation with ID of ${conversationId}`);
        socket.join(conversationId);
    });

    socket.on("sendMessage", (convId, message) => {
        console.log(`Message Sent`);
        io.to(convId).emit("receiveMessage", message);
    });
});



const UserRoutes = require('./routes/user')
const PostRoutes = require('./routes/post')
const NotificationRoutes = require('./routes/notification')
const CommentRoutes = require('./routes/comment')
const ResumeRoutes = require('./routes/resume')
const ConversationRoutes = require('./routes/conversation')
const MessageRoutes = require('./routes/message')


app.use('/api/auth', UserRoutes)
app.use('/api/post', PostRoutes)
app.use('/api/notification', NotificationRoutes)
app.use('/api/comment', CommentRoutes)
app.use('/api/resume', ResumeRoutes)
app.use('/api/conversation', ConversationRoutes)
app.use('/api/message', MessageRoutes)

server.listen(PORT, () => {
    console.log('Server is running on Port', PORT)
})