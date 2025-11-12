'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getLabourMarketStats = void 0;
const db_labour_market_1 = require('../../database/db.labour-market');
const getLabourMarketStats = async (req) => {
    try {
        const stats = await (0, db_labour_market_1.getLabourMarketStatsList)();
        return {
            success: true,
            statusCode: 200,
            message: 'Stats retrieved successfully',
            stats,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getLabourMarketStats = getLabourMarketStats;
//# sourceMappingURL=labour-market.service.js.map
