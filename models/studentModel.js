const mongoose = require('mongoose');

const StdSchema = new mongoose.Schema({
    fname: {
        type: String,
        required:true,
    },
    lname: {
        type: String,
        required:true,
    },
    contact: {
        type: String,
        required:true,
    }
    ,
    email: {
        type: String,
        required:true,
    },
    password: {
        type: String,
        required:true,
    },
    
})

const StdModel = mongoose.model('studentRegistration',StdSchema);


module.exports = StdModel;