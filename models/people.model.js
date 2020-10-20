const axios = require('axios');

const config = require('../config');
const { handleAPIErrors } = require('../helpers/error');

class PeopleModel {

    constructor() {
        
    }

    /**
     * @description Fetch all person records
     * @param params {object} 
     * @returns {Promise<*>}
     */
    async getPersonRecords(params) {
        try {
            let data = [];

            const headers = {
                "Content-Type": "application/json",
                "x-api-key": config.social_care_records_api_key
            };

            await axios.get(config.people_api_url, {
                headers: headers,
                params: params
            }).then ( result => {
                data = result;
            }).catch(err => {
                data = handleAPIErrors(err, 'Axios catch Error at PeopleModel: getPeopleRecords())');
                data.isError = true;
            });

            return data;

        } catch (err) {
            console.log('PeopleModel: getPeopleRecords() ERR');
            console.log(err);
            return (err);
        }
    }


}

module.exports = new PeopleModel;