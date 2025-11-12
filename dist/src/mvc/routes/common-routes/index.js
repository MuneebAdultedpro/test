'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const routes_strings_1 = require('../routes-strings');
const firebase_methods_1 = require('../../../methods/firebase.methods');
const controllers_1 = require('../../controllers');
const middlewares_1 = require('../../middlewares');
const router = express_1.default.Router();
router.post(
    routes_strings_1.userRoutes === null ||
        routes_strings_1.userRoutes === void 0
        ? void 0
        : routes_strings_1.userRoutes.postfcmToken,
    firebase_methods_1.postFcmToken
);
router.get(
    routes_strings_1.userRoutes === null ||
        routes_strings_1.userRoutes === void 0
        ? void 0
        : routes_strings_1.userRoutes.userById,
    controllers_1.userController.getUserByIdController
);
router.get(
    routes_strings_1.userRoutes === null ||
        routes_strings_1.userRoutes === void 0
        ? void 0
        : routes_strings_1.userRoutes.userByEmail,
    // auth,
    controllers_1.userController.getUserByEmailController
);
router.post(
    routes_strings_1.userRoutes.createUser,
    middlewares_1.auth,
    controllers_1.userController.createUserController
);
exports.default = router;
//# sourceMappingURL=index.js.map
