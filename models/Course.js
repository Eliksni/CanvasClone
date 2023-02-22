const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema ({
    courseName: {
        type: String,
        required: true,
        unique: true
    },
    courseId: {
        type: String,
        required: true,
        unique: true
    },
    sections: {
        type: [{
            sectionNum: {
                type: String,
                required: true,
            },
            courseSize: {
                type: Number,
                required: true
            },
            term: {
                type: String,
                required: true
            }
        }]
    }
})


module.exports = mongoose.model("Course", courseSchema)