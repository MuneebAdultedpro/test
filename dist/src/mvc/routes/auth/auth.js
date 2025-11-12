'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const index_1 = require('../../controllers/index');
const routes_strings_1 = require('../routes-strings');
const firebase_methods_1 = require('../../../methods/firebase.methods');
const router = express_1.default.Router();
router.post(
    routes_strings_1.userRoutes === null ||
        routes_strings_1.userRoutes === void 0
        ? void 0
        : routes_strings_1.userRoutes.login,
    firebase_methods_1.verifyFirebaseToken,
    index_1.authController === null || index_1.authController === void 0
        ? void 0
        : index_1.authController.userLogin
);
router.post(
    routes_strings_1.userRoutes === null ||
        routes_strings_1.userRoutes === void 0
        ? void 0
        : routes_strings_1.userRoutes.register,
    firebase_methods_1.verifyFirebaseToken,
    index_1.authController === null || index_1.authController === void 0
        ? void 0
        : index_1.authController.userRegister
);
exports.default = router;
//# sourceMappingURL=auth.js.map
