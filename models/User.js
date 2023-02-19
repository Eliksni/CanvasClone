const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        validate: {
            validator: v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
            message: props => `${props.value} is not a valid email address`
        }
    },
    passwordHash: {
        type: String,
        required: true
    },
    courses: {
        type: [mongoose.SchemaTypes.ObjectId]
    },
    profilePicturePath: {
        type: String,
    },
    profileBio: {
        type: String
    }
    
    
})

module.exports = mongoose.model("User", userSchema)