const express = require('express');
const router = express.Router();

const config = require('../config');
const casesController = require('../controllers/cases.controller');
const {isAuthorised} = require('../middleware/auth');

// GET request to display cases for the user
router.get('/user', isAuthorised, function(req, res, next) {
    res.locals.query = req.query;
    res.locals.isAdmin = req.auth.isAdmin;
    
    casesController.getUserRecords(req, res, next);
});

// GET request to display cases for the person using the mosaic id
router.get('/person/:person_id', isAuthorised, casesController.getPersonRecords);

module.exports = router;