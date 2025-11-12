'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getLabourMarketStatsController = void 0;
const labour_market_1 = require('../../services/labour-market');
const getLabourMarketStatsController = async (req, res) => {
    try {
        const result = await (0, labour_market_1.getLabourMarketStats)(req);
        if (result.success) {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    stats:
                        result === null || result === void 0
                            ? void 0
                            : result.stats,
                });
        } else {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    message:
                        result === null || result === void 0
                            ? void 0
                            : result.message,
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.getLabourMarketStatsController = getLabourMarketStatsController;
//# sourceMappingURL=labour-market.controller.js.map
