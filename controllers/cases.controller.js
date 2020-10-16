"use strict";

const querystring = require('querystring');
const CasesService = require('../services/cases.service');
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
    * @description Render all records for the logged in user
    * @param req {object} Express req object 
    * @param res {object} Express res object
    * @param next {object} Express next object
    * @returns {Promise<*>}
    */
    getUserRecords: async (req, res, next) => {
        try {
            let data = [];

            // get user email address
            const userEmail = 'jayson.hunter@hackney.gov.uk';

            /**
             * @param officer_email: string - email address of logged in user
             */
            await CasesService.getCaseRecords({ officer_email: userEmail })
            .then(result => {
                data = result;

                return res.render('cases/user-cases-list.njk', {userEmail: userEmail, data: data});
            }) 

        } catch (err) {
            return next(new Error(err));
        }

    },

    /**
    * @description Render all records for a person by mosaic id
    * @param req {object} Express req object 
    * @param res {object} Express res object
    * @param next {object} Express next object
    * @returns {Promise<*>}
    */
    getPersonRecords: async (req, res, next) => {
        try {
            let data = [];

            /**
             * @param person_id: string - persons mosaic id
             */
            await CasesService.getCaseRecords(req.params.person_id)
            .then(result => {
                data = result;

                const personFullName = `${data[0].firstName} ${data[0].lastName}`;

                return res.render('cases/person-cases-list.njk', {personFullName: personFullName, data: data});
            }) 

        } catch (err) {
            return next(new Error(err));
        }
    }
}