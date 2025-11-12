'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const index_1 = require('../../controllers/index');
const routes_strings_1 = require('../routes-strings');
const auth_1 = tslib_1.__importDefault(require('../../middlewares/auth'));
const router = express_1.default.Router();
router.get(
    routes_strings_1.studentRoutes.user,
    auth_1.default,
    index_1.userController.getUserController
);
router.get(
    routes_strings_1.studentRoutes.allUsers,
    auth_1.default,
    index_1.userController.getAllUsersController
);
router.patch(
    routes_strings_1.studentRoutes.updateUser,
    auth_1.default,
    index_1.userController.updateUserController
);
router.get(
    routes_strings_1.studentRoutes.usersWithData,
    auth_1.default,
    index_1.userController.getUsersWithDataController
);
router.delete(
    routes_strings_1.studentRoutes.delete,
    auth_1.default,
    index_1.userController.deleteUserController
);
exports.default = router;
//# sourceMappingURL=user.route.js.map
