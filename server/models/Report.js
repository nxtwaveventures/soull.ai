const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    caseId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Case',
        required: true,
    },
    generatedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Report', ReportSchema);
