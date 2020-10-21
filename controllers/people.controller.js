"use strict";

const validator = require('express-validator');
const querystring = require('querystring');
const PeopleService = require('../services/people.service');
const { mapFieldErrors, mapDescriptionHtml } = require('../helpers/fieldErrors');


/**
 * Handle common form errors functionality
 *
 * @param req
 * @param res
 * @param errors
 * @param path
 * @returns {void|*|Response}
 */
const handleFormErrors = (req, res, errors, path) => {
    const extractedErrors = mapFieldErrors(errors)
    const descriptionHtml = mapDescriptionHtml(errors)
    return res.redirect(
      path + "?haserrors=true&descriptionHtml=" + descriptionHtml +
      "&" + querystring.stringify(extractedErrors) +
      "&" + querystring.stringify(req.body)
    );
}

module.exports = {
    /**
    * @description Search all people records
    * @param req {object} Express req object 
    * @param res {object} Express res object
    * @param next {object} Express next object
    * @returns {Promise<*>}
    */
   searchPeopleRecords: async (req, res, next) => {
    try {

        res.locals.query = req.body;

        const dobYear = req.body.dob_year && req.body.dob_year;
        const dobMonth = req.body.dob_month && req.body.dob_month;
        const dobDay = req.body.dob_day && req.body.dob_day;

        const dob = [dobYear, dobMonth, dobDay].join('-');

        const searchParams = {
            person_id: req.body.mosaicId,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            date_of_birth: dob.length > 2 ? dob : ''
        }

        const errors = validator.validationResult(req);

        if (!errors.isEmpty()) {
          handleFormErrors(req, res, errors, "/people/search")
        } else {

            try {
                let data = [];

                /**
                 * @param searchParams: object - search parameters
                 */
                await PeopleService.searchPersonRecords(searchParams)
                .then(result => {
                    data = result;

                    return res.render('people/people-search-results.njk', {userName: req.auth.userName, data: data});
                }) 

            } catch (err) {
                return next(new Error(err));
            }
        }

    } catch (err) {
        return next(new Error(err));
    }

    } 

}