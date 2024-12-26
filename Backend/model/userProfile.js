const mongoose = require('mongoose');

const scheme = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
    },
    password:{
        type:String
    }
}
);

const userCredentials = mongoose.model('userCredential',scheme)

module.exports = userCredentials;