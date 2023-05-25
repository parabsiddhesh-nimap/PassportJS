const mongoose = require('mongoose');


function connectDB() {
    mongoose.connect('mongodb://127.0.0.1:27017/passport')
    .then(data => console.log('Successfully Connected to DB',data.connection.host))
    .catch(err => console.log(`err is ${err}`))
} 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = {User,connectDB};
