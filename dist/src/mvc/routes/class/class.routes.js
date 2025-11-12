'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const routes_strings_1 = require('../routes-strings');
const class_1 = require('../../controllers/class');
const auth_1 = tslib_1.__importDefault(require('../../middlewares/auth'));
const router = express_1.default.Router();
router.post(
    routes_strings_1.ClassRoutes.create,
    auth_1.default,
    class_1.ClassController.createClassController
);
router.get(
    routes_strings_1.ClassRoutes.getAll,
    auth_1.default,
    class_1.ClassController.getAllClassesController
);
router.get(
    routes_strings_1.ClassRoutes.get,
    auth_1.default,
    class_1.ClassController.getClassByIdController
);
router.post(
    routes_strings_1.ClassRoutes.assignTeacher,
    class_1.ClassController.assignTeacherToClassesController
);
router.get(
    routes_strings_1.ClassRoutes.getStudents,
    auth_1.default,
    class_1.ClassController.getStudentsOfClassController
);
router.put(
    routes_strings_1.ClassRoutes.update,
    class_1.ClassController.updateClassController
);
router.delete(
    routes_strings_1.ClassRoutes.delete,
    class_1.ClassController.deletClassController
);
router.get(
    routes_strings_1.ClassRoutes.getByUserId,
    auth_1.default,
    class_1.ClassController === null || class_1.ClassController === void 0
        ? void 0
        : class_1.ClassController.getClassByUserIdController
);
exports.default = router;
//# sourceMappingURL=class.routes.js.map
