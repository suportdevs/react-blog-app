const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username!"],
        unique: [true, "Username already exists!"],
    },
    email: {
        type: String,
        required: [true, "Please provide a valid email!"],
        unique: [true, "Email already exists!"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
    },
    user_type_id: {
        type: Number,
    },
    avatar: {
        type: String,
    },
}, { timestamps: true }); // Corrected 'timestapms' to 'timestamps'

module.exports = mongoose.model('User', UserSchema); // Corrected model name to 'User'
