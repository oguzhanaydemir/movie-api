const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://movie_user:ist_fb34@ds235251.mlab.com:35251/movie-api');
    
    mongoose.connection.on('open', () => {
        console.log('Connected to MongoDB');
    });
    
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB Error', err);
    });

    mongoose.Promise = global.Promise;
}