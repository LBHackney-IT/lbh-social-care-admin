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

            /**
             * @param officer_email: string - email address of logged in user
             */
            await CasesService.getCaseRecords({ officer_email: req.auth.userEmail })
            .then(result => {
                data = result;

                return res.render('cases/user-cases-list.njk', {
                    userName: req.auth.userName,
                    userEmail: req.auth.userEmail, 
                    data: data
                });
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

            const searchParams = {
                mosaic_id: req.params.person_id
            }

            /**
             * @param searchParams: object - search parameters
             */
            await CasesService.getCaseRecords(searchParams)
            .then(result => {
                data = result;

                return res.render('cases/person-cases-list.njk', {
                    userName: req.auth.userName,
                    userEmail: req.auth.userEmail,
                    data: data
                });
            }) 

        } catch (err) {
            return next(new Error(err));
        }
    }
}