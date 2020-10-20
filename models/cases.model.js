const axios = require('axios');

const config = require('../config');
const { handleAPIErrors } = require('../helpers/error');

class CasesModel {

    constructor() {
        
    }

    /**
     * @description Fetch all cases
     * @param params {object} 
     * @returns {Promise<*>}
     */
    async getCaseList(params) {
        try {
            let data = [];

            const headers = {
                "Content-Type": "application/json",
                "x-api-key": config.social_care_records_api_key
            };

            await axios.get(config.cases_api_url, {
                headers: headers,
                params: params
            }).then ( result => {
                data = result;
            }).catch(err => {
                data = handleAPIErrors(err, 'Axios catch Error at UserModel: getMyRecords())');
                data.isError = true;
            });

            return data;

        } catch (err) {
            console.log('UserModel: getMyRecords() ERR');
            console.log(err);
            return (err);
        }
    }


}

module.exports = new CasesModel;