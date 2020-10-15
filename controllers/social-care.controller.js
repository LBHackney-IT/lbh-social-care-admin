"use strict";

const validator = require('express-validator');
const querystring = require('querystring');
const notesHelper = require('../helpers/notes');
const SocialCareService = require('../services/social-care.service');
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
    * @description Render all records for the logged in person
    * @param req {object} Express req object 
    * @param res {object} Express res object
    * @param next {object} Express next object
    * @returns {Promise<*>}
    */
    getMyRecords: async (req, res, next) => {
        try {

            let params = {
                userEmail: "TODO: Insert user email address here"
            }

            // Call relevant service here and render with data

            res.render('socialcare/my-records-list.njk');

        } catch (err) {
            return next(new Error(err));
        }

    }, 


    /**
    * @description Search all resident records
    * @param req {object} Express req object 
    * @param res {object} Express res object
    * @param next {object} Express next object
    * @returns {Promise<*>}
    */
   searchResidentRecords: async (req, res, next) => {
    try {

        res.locals.query = req.body;

        const mosaicId = req.body.mosaicId;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        //  add DOB fields

        const errors = validator.validationResult(req);

        if (!errors.isEmpty()) {
          handleFormErrors(req, res, errors, "/socialcare/resident-search")
        } else {

            try {
                let data = [];

                /**
                 * @param postcode: string - matching full or partial postcode
                 */
                await SocialCareService.searchResidentRecords({mosaicId: mosaicId, FirstName: firstName, LastName: lastName})
                .then(result => {
                    data = result;

                    data.forEach(item => {
                        // const recDate = new Date(item.DateTimeRecorded);
                        // item.DateTimeRecorded = recDate.toLocaleDateString();
                    });

                    return res.render('socialcare//resident-search-results.njk', {data: data});
                }) 

            } catch (err) {
                return next(new Error(err));
            }
        }

    } catch (err) {
        return next(new Error(err));
    }

}, 

}