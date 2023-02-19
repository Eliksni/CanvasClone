const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    profilePicturePath: {
        type: String,
    }
    
    
})