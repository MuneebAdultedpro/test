'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const index_1 = require('../../controllers/index');
const routes_strings_1 = require('../routes-strings');
const auth_1 = tslib_1.__importDefault(require('../../middlewares/auth'));
const router = express_1.default.Router();
router.post(
    routes_strings_1.teacherRoutes.assignProgramToTeacher,
    auth_1.default,
    index_1.teacherController.assignProgramToTeacherController
);
router.get(
    routes_strings_1.teacherRoutes.getTeacherProgram,
    auth_1.default,
    index_1.teacherController.getTeacherProgramsController
);
router.get(
    routes_strings_1.teacherRoutes.getTeacherStudents,
    auth_1.default,
    index_1.teacherController.getTeacherStudentsController
);
router.get(
    routes_strings_1.teacherRoutes.getUnapprovedTeacher,
    auth_1.default,
    index_1.teacherController.unApprovedTeacherController
);
router.patch(
    routes_strings_1.teacherRoutes.updateTeacher,
    auth_1.default,
    index_1.teacherController.updateTeacherController
);
exports.default = router;
//# sourceMappingURL=teacher.routes.js.map
