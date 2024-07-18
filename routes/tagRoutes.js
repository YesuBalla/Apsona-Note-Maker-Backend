const express = require('express');
const { createTag, getTags, getTag } = require('../controllers/tagController');
const router = express.Router();
const authenticate = require('../middleware/authenticate')

// Middleware to check authentication
router.use(authenticate);

router.post('/tags', createTag);
router.get('/tags', getTags);
router.get('/tags/:id', getTag);

module.exports = router;
