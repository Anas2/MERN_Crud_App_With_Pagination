const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    tname: {
        type: String,
        required:true,
    },
    course: {
        type: String,
        required:true,
    },
    contact: {
        type: Number,
        required:true,
    }
})

const TeacherModel = mongoose.model('teacherRegistration',TeacherSchema);


module.exports = TeacherModel;