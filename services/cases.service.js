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

                // Get person name from the first recrod.
                if (data.length > 0 ) {
                    data.personFullName = `${data[0].firstName} ${data[0].lastName}`;
                }
            });

            return data;
            
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = new CasesService;