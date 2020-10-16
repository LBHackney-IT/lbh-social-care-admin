const PeopleModel = require('../models/people.model');
const dateHelper = require('../helpers/date');

class PeopleService {

    /**
     * @description Search people records
     * @param params [object}
     * @returns {Promise<*>}
     */

    async searchPersonRecords(params) {

        try {
            let data = [];

            await PeopleModel.getPersonRecords(params)
            .then ( (result) => {
                data = result.data.people || [];
            });

            return data;
            
        } catch (err) {
            console.log(err);
        }
    }

}
module.exports = new PeopleService;