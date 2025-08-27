const Case = require('../models/Case');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { extractTagsFromCase, findBestSpecialist } = require('../services/aiService');
const { logCaseAction } = require('../services/blockchainService');


// @desc      Get all cases
// @route     GET /api/v1/cases
// @access    Private
exports.getCases = asyncHandler(async (req, res, next) => {
    let query;

    if (req.user.role === 'conventional') {
        query = Case.find({ submittedBy: req.user.id });
    } else if (req.user.role === 'ayush') {
        query = Case.find({ assignedTo: req.user.id });
    } else {
        query = Case.find();
    }

    const cases = await query;

    res.status(200).json({
        success: true,
        count: cases.length,
        data: cases,
    });
});

// @desc      Get single case
// @route     GET /api/v1/cases/:id
// @access    Private
exports.getCase = asyncHandler(async (req, res, next) => {
    const caseItem = await Case.findById(req.params.id);

    if (!caseItem) {
        return next(
            new ErrorResponse(`Case not found with id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: caseItem,
    });
});

// @desc      Create new case
// @route     POST /api/v1/cases
// @access    Private (Conventional Doctors only)
exports.createCase = asyncHandler(async (req, res, next) => {
    req.body.submittedBy = req.user.id;

    // Use AI to extract tags from case details
    const caseTags = extractTagsFromCase(req.body.caseDetails);
    req.body.caseTags = caseTags;

    // Use AI to find the best specialist
    const bestSpecialist = await findBestSpecialist(caseTags);
    if (bestSpecialist) {
        req.body.assignedTo = bestSpecialist._id;
    }

    const caseItem = await Case.create(req.body);

    // Log creation to blockchain service
    caseItem.blockchainTransactionId = logCaseAction(caseItem._id, 'CASE_CREATED');
    await caseItem.save();

    res.status(201).json({
        success: true,
        data: caseItem,
    });
});

// @desc      Update case
// @route     PUT /api/v1/cases/:id
// @access    Private
exports.updateCase = asyncHandler(async (req, res, next) => {
    let caseItem = await Case.findById(req.params.id);

    if (!caseItem) {
        return next(
            new ErrorResponse(`Case not found with id of ${req.params.id}`, 404)
        );
    }

    // Make sure user is the case owner or an admin
    if (caseItem.submittedBy.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User ${req.user.id} is not authorized to update this case`,
                401
            )
        );
    }

    caseItem = await Case.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    // Log update to blockchain service
    logCaseAction(caseItem._id, 'CASE_UPDATED');

    res.status(200).json({
        success: true,
        data: caseItem,
    });
});

// @desc      Delete case
// @route     DELETE /api/v1/cases/:id
// @access    Private
exports.deleteCase = asyncHandler(async (req, res, next) => {
    const caseItem = await Case.findById(req.params.id);

    if (!caseItem) {
        return next(
            new ErrorResponse(`Case not found with id of ${req.params.id}`, 404)
        );
    }

    // Make sure user is the case owner or an admin
    if (caseItem.submittedBy.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User ${req.user.id} is not authorized to delete this case`,
                401
            )
        );
    }

    await caseItem.remove();

    // Log deletion to blockchain service
    logCaseAction(req.params.id, 'CASE_DELETED');

    res.status(200).json({
        success: true,
        data: {},
    });
});
