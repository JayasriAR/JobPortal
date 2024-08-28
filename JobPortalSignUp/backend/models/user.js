const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    qualification: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    additionalInfo: {
        type: String,
        default: "",
    },
    resumePath: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
