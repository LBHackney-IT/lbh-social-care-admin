"use strict";

const validator = require('express-validator');
const querystring = require('querystring');
const notesHelper = require('../helpers/notes');
const SocialCareService = require('../services/social-care.service');
const { mapFieldErrors, mapDescriptionHtml } = require('../helpers/fieldErrors');

module.exports = {

    /**
    * @description Render all records for the logged in person
    * @param req {object} Express req object 
    * @param res {object} Express res object
    * @param next {object} Express next object
    * @returns {Promise<*>}
    */
    my_records_get: async (req, res, next) => {
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

}