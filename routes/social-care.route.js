const express = require('express');
const router = express.Router();

const { searchResidentValidation } = require('../middleware/validation');
const socialCareController = require('../controllers/social-care.controller');
const {isAuthorised}= require('../middleware/auth');


// GET request for the my records page
router.get('/my-records', isAuthorised, function(req, res, next) {
    res.locals.query = req.query;
    res.locals.isAdmin = req.auth.isAdmin;

    socialCareController.getMyRecords(req, res, next);

});

// GET request for the resident search page
router.get('/resident-search', isAuthorised, function(req, res) {
    res.locals.query = req.query;
    res.locals.isAdmin = req.auth.isAdmin;

    res.render("socialcare/resident-search.njk");
});

// POST request to get all matching resident records
router.post('/resident-search', [isAuthorised, searchResidentValidation], (req, res, next) => {
    socialCareController.searchResidentRecords(req, res, next)
});

module.exports = router;