const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/nexuswork').then(res=> {
    console.log('Connected to MongoDB successfully http://localhost:4000');
}).catch(err => {
    console.log('Error connecting to MongoDB:', err);
});