const mongoose = require('mongoose');


const CourseSchema = new mongoose.Schema({

    cname : {
        type:String,
        required:true
    },
    duration : {
        type:String,
        required:true
    },
    fees : {
        type:String,
        required:true
    },
    shortName : {
        type:String,
        required:true
    },

})

const CourseModel = mongoose.model("courseRegistration",CourseSchema);

module.exports = CourseModel;