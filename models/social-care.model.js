const axios = require('axios');

const config = require('../config');
const { handleAPIErrors } = require('../helpers/error');

class SocialCareModel {

    constructor() {
        
    }


    /**
     * @description Fetch all records for the logged in user
     * @param params {object} 
     * @returns {Promise<*>}
     */
    async getMyRecords(params) {
        try {
            let data = [];

            const headers = {
                "Content-Type": "application/json",
                "x-api-key": config.social_care_records_api_key
            };

            await axios.get(config.social_care_records_api_url, {
                headers: headers,
                params: params
            }).then ( result => {
                data = result;
            }).catch(err => {
                data = handleAPIErrors(err, 'Axios catch Error at SocialCareModel: getMyRecords())');
                data.isError = true;
            });

            return data;

        } catch (err) {
            console.log('SocialCareModel: getMyRecords() ERR');
            console.log(err);
            return (err);
        }
    }


    /**
     * @description Fetch all resident records
     * @param params {object} 
     * @returns {Promise<*>}
     */
    async getResidentRecords(params) {
        try {
            let data = [];

            const headers = {
                "Content-Type": "application/json",
                "x-api-key": config.social_care_records_api_key
            };

            await axios.get(config.social_care_records_api_url, {
                headers: headers,
                params: params
            }).then ( result => {
                data = result;
            }).catch(err => {
                data = handleAPIErrors(err, 'Axios catch Error at SocialCareModel: getMResidentRecords())');
                data.isError = true;
            });

            return data;

        } catch (err) {
            console.log('SocialCareModel: getMResidentRecords() ERR');
            console.log(err);
            return (err);
        }
    }



}

module.exports = new SocialCareModel;