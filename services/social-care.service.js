const SocialCareModel = require('../models/social-care.model');
const notesHelper = require('../helpers/notes');
const dateHelper = require('../helpers/date');

class SocialCareService {

    /**
     * @description Fetch all records for the logged in user
     * @param params [object}
     * @returns {Promise<*>}
     */

    async getMyRecords(params) {

        try {
            let data = [];

            await SocialCareModel.getMyRecords(params)
            .then ( (result) => {
                data = result.data || [];

                data.forEach(item => {
                    const formattedCreationDate = dateHelper.convertDate(item.DateTimeRecorded);

                    item.creation_date = formattedCreationDate.concatenated;
                });
            });

            return data;
            
        } catch (err) {
            console.log(err);
        }
    }


    /**
     * @description Search resident records
     * @param params [object}
     * @returns {Promise<*>}
     */

    async searchResidentRecords(params) {

        try {
            let data = [];

            await SocialCareModel.getResidentRecords(params)
            .then ( (result) => {
                data = result.data || [];

                data.forEach(item => {
                    // const formattedCreationDate = dateHelper.convertDate(item.DateTimeRecorded);

                    // item.creation_date = formattedCreationDate.concatenated;
                });
            });

            return data;
            
        } catch (err) {
            console.log(err);
        }
    }

}