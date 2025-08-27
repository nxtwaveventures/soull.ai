const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true,
    },
    submittedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    caseDetails: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['submitted', 'assigned', 'in-progress', 'report-generated', 'completed', 'archived'],
        default: 'submitted',
    },
    files: [String],
    caseTags: [String], // AI-generated tags from case details
    blockchainTransactionId: String, // For audit trail
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Case', CaseSchema);
