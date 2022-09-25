const router = require('express').Router();
const ErrorResponse = require('../utils/error');

// @desc    Show a message to verify backend is running
// @route   GET /api/v1/
// @access  Public
router.get('/', async (req, res, next) => {
  res.send('REST API')
});

module.exports = router;