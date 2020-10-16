const express = require('express');
const router = express.Router();

const { searchPeopleValidation } = require('../middleware/validation');
const peopleController = require('../controllers/people.controller');
const {isAuthorised}= require('../middleware/auth');


// GET request for the resident search page
router.get('/search', isAuthorised, function(req, res) {
    res.locals.query = req.query;
    res.locals.isAdmin = req.auth.isAdmin;

    res.render("people/people-search.njk", {userName: req.auth.userName});
});


// POST request to get all matching resident records
router.post('/search-results', [isAuthorised, searchPeopleValidation], (req, res, next) => {
    peopleController.searchPeopleRecords(req, res, next)
});

module.exports = router;