const express = require('express');
const { submitFeedback } = require('../controllers/feedback');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(protect, submitFeedback);

module.exports = router;
