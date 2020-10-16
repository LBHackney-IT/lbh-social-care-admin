const express = require('express');
const router = express.Router();

const config = require('../config');
const { logout } = require('../middleware/auth');

// GET request to use logout page
router.get('/', function(req, res, next) {
    logout(req, res, next);
});

module.exports = router;