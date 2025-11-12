'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const index_1 = require('../../controllers/index');
const routes_strings_1 = require('../routes-strings');
const middlewares_1 = require('../../middlewares');
const router = express_1.default.Router();
router.get(
    routes_strings_1.avatarsRoutes === null ||
        routes_strings_1.avatarsRoutes === void 0
        ? void 0
        : routes_strings_1.avatarsRoutes.allAvatars,
    middlewares_1.auth,
    index_1.avatarsController === null || index_1.avatarsController === void 0
        ? void 0
        : index_1.avatarsController.getAvatarsController
);
router.get(
    routes_strings_1.avatarsRoutes === null ||
        routes_strings_1.avatarsRoutes === void 0
        ? void 0
        : routes_strings_1.avatarsRoutes.programAvatars,
    middlewares_1.auth,
    index_1.avatarsController === null || index_1.avatarsController === void 0
        ? void 0
        : index_1.avatarsController.getProgramAvatarsController
);
exports.default = router;
//# sourceMappingURL=avatars.routes.js.map
