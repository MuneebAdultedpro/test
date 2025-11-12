'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const index_1 = require('../../controllers/index');
const routes_strings_1 = require('../routes-strings');
const auth_1 = tslib_1.__importDefault(require('../../middlewares/auth'));
const router = express_1.default.Router();
router.get(
    routes_strings_1.counselorRoutes === null ||
        routes_strings_1.counselorRoutes === void 0
        ? void 0
        : routes_strings_1.counselorRoutes.getAllDocs,
    auth_1.default,
    index_1.counselorController === null ||
        index_1.counselorController === void 0
        ? void 0
        : index_1.counselorController.getAllDocsController
);
router.get(
    routes_strings_1.counselorRoutes === null ||
        routes_strings_1.counselorRoutes === void 0
        ? void 0
        : routes_strings_1.counselorRoutes.getInstitutionDocs,
    auth_1.default,
    index_1.counselorController === null ||
        index_1.counselorController === void 0
        ? void 0
        : index_1.counselorController.getInstitutionDocsController
);
router.patch(
    routes_strings_1.counselorRoutes === null ||
        routes_strings_1.counselorRoutes === void 0
        ? void 0
        : routes_strings_1.counselorRoutes.updateDoc,
    auth_1.default,
    index_1.counselorController === null ||
        index_1.counselorController === void 0
        ? void 0
        : index_1.counselorController.updateDocController
);
router.delete(
    routes_strings_1.counselorRoutes === null ||
        routes_strings_1.counselorRoutes === void 0
        ? void 0
        : routes_strings_1.counselorRoutes.deleteDoc,
    auth_1.default,
    index_1.counselorController === null ||
        index_1.counselorController === void 0
        ? void 0
        : index_1.counselorController.deleteDocController
);
exports.default = router;
//# sourceMappingURL=counselor.routes.js.map
