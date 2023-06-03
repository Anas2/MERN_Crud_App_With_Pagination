const mongoose = require('mongoose');

const InstSchema = new mongoose.Schema({
    instName: {
        type: String,
        required:true,
    },
    address: {
        type: String,
        required:true,
    },
    tel: {
        type: String,
        required:true,
    },
    shortName: {
        type: String,
        required:true,
    }
})

const InstModel = mongoose.model('institureRegistration',InstSchema);


module.exports = InstModel;