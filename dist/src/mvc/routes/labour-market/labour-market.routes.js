'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const index_1 = require('../../controllers/index');
const routes_strings_1 = require('../routes-strings');
const middlewares_1 = require('../../middlewares');
const router = express_1.default.Router();
router.get(
    routes_strings_1.labourMarketRoutes === null ||
        routes_strings_1.labourMarketRoutes === void 0
        ? void 0
        : routes_strings_1.labourMarketRoutes.stats,
    middlewares_1.auth,
    index_1.labourMarketController === null ||
        index_1.labourMarketController === void 0
        ? void 0
        : index_1.labourMarketController.getLabourMarketStatsController
);
exports.default = router;
//# sourceMappingURL=labour-market.routes.js.map
