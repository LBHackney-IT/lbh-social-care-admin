const CasesModel = require('../models/cases.model');
const dateHelper = require('../helpers/date');

class CasesService {

    /**
     * @description Fetch all case records
     * @param params [object}
     * @returns {Promise<*>}
     */

    async getCaseRecords(params) {

        try {
            let data = [];

            await CasesModel.getCaseList(params)
            .then ( (result) => {
                data = result.data.cases || [];
            });

            return data;
            
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = new CasesService;