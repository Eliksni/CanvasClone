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
            validator: v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/.test(v),
            message: props => `${props.value} is not a valid email address`
        }
    },
    passwordHash: {
        type: String,
        required: true
    },
    courses: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course'
    }],
    userPage: {
        type: {
            bio: {
                type: String,
            },
            links: {
                type: String,
            },
            profilePicturePath: {
                type: String,
            },
        },
    },  
})

module.exports = mongoose.model("User", userSchema)