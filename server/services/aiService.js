// This is a placeholder for a real AI service.
// In a real-world scenario, this would involve a more complex NLP model.

const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

exports.extractTagsFromCase = (caseDetails) => {
    const tokens = tokenizer.tokenize(caseDetails.toLowerCase());

    // Simple keyword matching for demonstration
    const potentialTags = [
        'cardiology', 'dermatology', 'neurology', 'oncology',
        'ayurveda', 'homeopathy', 'unani', 'siddha', 'yoga',
        'chronic', 'acute', 'pain', 'management', 'diabetes'
    ];

    const tags = tokens.filter(token => potentialTags.includes(token));
    return [...new Set(tags)]; // Return unique tags
};

exports.findBestSpecialist = async (caseTags) => {
    const User = require('../models/User');

    // Find specialists who have tags that match the case tags
    const specialists = await User.find({
        role: 'ayush',
        tags: { $in: caseTags }
    }).sort({ averageRating: -1 }); // Prioritize higher-rated specialists

    if (specialists.length > 0) {
        return specialists[0]; // Return the best match
    }

    // Fallback: find any AYUSH specialist if no tag match
    return await User.findOne({ role: 'ayush' }).sort({ averageRating: -1 });
};
