const express = require('express');
const router = express.Router();

const socialCareController = require('../controllers/social-care.controller');
const {isAuthorised}= require('../middleware/auth');


// GET request for the my records page
router.get('/my-records', isAuthorised, function(req, res, next) {
    res.locals.query = req.query;
    res.locals.isAdmin = req.auth.isAdmin;

    socialCareController.my_records_get(req, res, next);

});

// GET request for the resident search page
router.get('/resident-search', isAuthorised, function(req, res) {
    res.locals.query = req.query;
    res.locals.isAdmin = req.auth.isAdmin;

    res.render("socialcare/resident-search.njk");
});

module.exports = router;