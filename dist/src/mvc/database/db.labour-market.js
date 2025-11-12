'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getLabourMarketStatsList = void 0;
const models_1 = require('../models');
const getLabourMarketStatsList = async () => {
    try {
        return await models_1.LabourMarket.find().populate('program');
    } catch (error) {
        throw new Error(
            `Error Fetching LabourMarket Stats: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.getLabourMarketStatsList = getLabourMarketStatsList;
//# sourceMappingURL=db.labour-market.js.map
