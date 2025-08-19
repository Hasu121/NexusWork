const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors');

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


const UserRoutes = require('./routes/user')
const PostRoutes = require('./routes/post')
const NotificationRoutes = require('./routes/notification')
const CommentRoutes = require('./routes/comment')
const ResumeRoutes = require('./routes/resume')

app.use('/api/auth', UserRoutes)
app.use('/api/post', PostRoutes)
app.use('/api/notification', NotificationRoutes)
app.use('/api/comment', CommentRoutes)
app.use('/api/resume', ResumeRoutes)

app.listen(PORT, () => {
    console.log('Server is running on Port', PORT)
})