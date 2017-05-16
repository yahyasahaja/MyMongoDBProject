const mongoose = require('mongoose');

module.exports.User = mongoose.model('users', new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        minlength: 1,
    },

    completed: {
        type:Boolean,
        default: false,
    },

    completedAt: {
        type: Number,
        default: null,
    }
}));