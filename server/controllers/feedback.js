const Feedback = require('../models/Feedback');
const Case = require('../models/Case');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc      Submit feedback for a case
// @route     POST /api/v1/feedback
// @access    Private (Conventional Doctors only)
exports.submitFeedback = asyncHandler(async (req, res, next) => {
    const { caseId, rating, comments } = req.body;

    const caseItem = await Case.findById(caseId);

    if (!caseItem) {
        return next(new ErrorResponse(`Case not found with id of ${caseId}`, 404));
    }

    // Ensure user is the one who submitted the case
    if (caseItem.submittedBy.toString() !== req.user.id) {
        return next(new ErrorResponse('User not authorized to leave feedback for this case', 401));
    }

    const feedback = await Feedback.create({
        caseId,
        rating,
        comments,
        submittedBy: req.user.id,
        specialist: caseItem.assignedTo
    });

    res.status(201).json({
        success: true,
        data: feedback,
    });
});
