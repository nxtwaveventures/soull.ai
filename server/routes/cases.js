const express = require('express');
const {
    getCases,
    getCase,
    createCase,
    updateCase,
    deleteCase,
} = require('../controllers/cases');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
    .route('/')
    .get(protect, getCases)
    .post(protect, authorize('conventional'), createCase);

router
    .route('/:id')
    .get(protect, getCase)
    .put(protect, updateCase)
    .delete(protect, deleteCase);

module.exports = router;
