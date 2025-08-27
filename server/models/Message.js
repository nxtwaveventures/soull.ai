const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    caseId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Case',
        required: true,
    },
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    recipient: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Message', MessageSchema);
