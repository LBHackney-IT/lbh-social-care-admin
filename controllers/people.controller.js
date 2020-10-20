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

        const searchParams = {
            person_id: req.body.mosaicId,
            first_name: req.body.firstName,
            last_name: req.body.lastName
        }

        
        //  TO DO : add DOB fields

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