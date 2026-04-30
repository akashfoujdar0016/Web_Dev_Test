const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;

const userSchema = new mongoose.Schema({
    age: {
        type: Number,
        required: true
    },
    ticketNumber: {
        type: String,
        required: true
    },
    coaches: {
        type: String
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);