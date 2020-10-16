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

        const mosaicId = req.body.mosaicId;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        //  add DOB fields

        const errors = validator.validationResult(req);

        if (!errors.isEmpty()) {
          handleFormErrors(req, res, errors, "/people/search")
        } else {

            try {
                let data = [];

                /**
                 * @param postcode: string - matching full or partial postcode
                 */
                await PeopleService.searchPersonRecords({mosaicId: mosaicId, FirstName: firstName, LastName: lastName})
                .then(result => {
                    data = result;

                    return res.render('people/people-search-results.njk', {data: data});
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