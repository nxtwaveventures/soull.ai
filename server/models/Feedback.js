const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    caseId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Case',
        required: true,
        unique: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comments: {
        type: String,
    },
    submittedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    specialist: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Static method to get avg rating and save
FeedbackSchema.statics.getAverageRating = async function (specialistId) {
    const obj = await this.aggregate([
        {
            $match: { specialist: specialistId }
        },
        {
            $group: {
                _id: '$specialist',
                averageRating: { $avg: '$rating' }
            }
        }
    ]);

    try {
        await this.model('User').findByIdAndUpdate(specialistId, {
            averageRating: obj[0].averageRating
        });
    } catch (err) {
        console.error(err);
    }
};

// Call getAverageRating after save
FeedbackSchema.post('save', function () {
    this.constructor.getAverageRating(this.specialist);
});

// Call getAverageRating before remove
FeedbackSchema.pre('remove', function () {
    this.constructor.getAverageRating(this.specialist);
});


module.exports = mongoose.model('Feedback', FeedbackSchema);
