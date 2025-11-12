'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const index_1 = require('../../controllers/index');
const routes_strings_1 = require('../routes-strings');
const firebase_methods_1 = require('../../../methods/firebase.methods');
const auth_1 = tslib_1.__importDefault(require('../../middlewares/auth'));
const router = express_1.default.Router();
router.post(
    routes_strings_1.instituteRoutes.create,
    firebase_methods_1.verifyFirebaseToken,
    index_1.instituteController === null ||
        index_1.instituteController === void 0
        ? void 0
        : index_1.instituteController.createInstituteController
);
router.post(
    routes_strings_1.instituteRoutes.requestInstituteForApproval,
    auth_1.default,
    index_1.instituteController === null ||
        index_1.instituteController === void 0
        ? void 0
        : index_1.instituteController.requestInstituteForApprovalController
);
router.get(
    routes_strings_1.instituteRoutes.institute,
    auth_1.default,
    index_1.instituteController === null ||
        index_1.instituteController === void 0
        ? void 0
        : index_1.instituteController.getInstituteController
);
router.get(
    routes_strings_1.instituteRoutes.institutes,
    // auth,
    index_1.instituteController.getInstitutesController
);
router.get(
    routes_strings_1.instituteRoutes.getConsortiumInstitutesByInstituteId,
    auth_1.default,
    index_1.instituteController.getConsortiumInstitutesByInstituteIdController
);
router.get(
    routes_strings_1.instituteRoutes.fetchTeachersOfInstitution,
    auth_1.default,
    index_1.instituteController.fetchTeachersOfInstitutionContoller
);
router.get(
    routes_strings_1.instituteRoutes.getDashboardCounts,
    auth_1.default,
    index_1.instituteController === null ||
        index_1.instituteController === void 0
        ? void 0
        : index_1.instituteController.getDashboardCountsController
);
router.get(
    routes_strings_1.instituteRoutes.getEmployerCounts,
    auth_1.default,
    index_1.instituteController === null ||
        index_1.instituteController === void 0
        ? void 0
        : index_1.instituteController.getEmployerCountsController
);
router.post(
    routes_strings_1.instituteRoutes.createProgram,
    auth_1.default,
    index_1.instituteController === null ||
        index_1.instituteController === void 0
        ? void 0
        : index_1.instituteController.createProgramController
);
router.get(
    routes_strings_1.instituteRoutes.getProgram,
    auth_1.default,
    index_1.instituteController === null ||
        index_1.instituteController === void 0
        ? void 0
        : index_1.instituteController.getProgramController
);
router.get(
    routes_strings_1.instituteRoutes === null ||
        routes_strings_1.instituteRoutes === void 0
        ? void 0
        : routes_strings_1.instituteRoutes.getPrograms,
    auth_1.default,
    index_1.instituteController === null ||
        index_1.instituteController === void 0
        ? void 0
        : index_1.instituteController.getProgramsController
);
router.get(
    routes_strings_1.instituteRoutes === null ||
        routes_strings_1.instituteRoutes === void 0
        ? void 0
        : routes_strings_1.instituteRoutes.getInstituteUsersByProgramId,
    auth_1.default,
    index_1.instituteController === null ||
        index_1.instituteController === void 0
        ? void 0
        : index_1.instituteController.getInstituteUsersByProgramIdController
);
router.patch(
    routes_strings_1.instituteRoutes === null ||
        routes_strings_1.instituteRoutes === void 0
        ? void 0
        : routes_strings_1.instituteRoutes.updateInstitute,
    auth_1.default,
    index_1.instituteController === null ||
        index_1.instituteController === void 0
        ? void 0
        : index_1.instituteController.updateInstitutesController
);
router.get(
    routes_strings_1.instituteRoutes === null ||
        routes_strings_1.instituteRoutes === void 0
        ? void 0
        : routes_strings_1.instituteRoutes.getInstitueEmployers,
    auth_1.default,
    index_1.instituteController === null ||
        index_1.instituteController === void 0
        ? void 0
        : index_1.instituteController.getInstitueEmployersController
);
router.get(
    routes_strings_1.instituteRoutes === null ||
        routes_strings_1.instituteRoutes === void 0
        ? void 0
        : routes_strings_1.instituteRoutes.usersByRole,
    auth_1.default,
    index_1.instituteController.getUsersByRoleController
);
router.get(
    routes_strings_1.instituteRoutes === null ||
        routes_strings_1.instituteRoutes === void 0
        ? void 0
        : routes_strings_1.instituteRoutes.getProgramsWithStudents,
    auth_1.default,
    index_1.instituteController.getProgramsWithStudentsController
);
router.get(
    routes_strings_1.instituteRoutes === null ||
        routes_strings_1.instituteRoutes === void 0
        ? void 0
        : routes_strings_1.instituteRoutes.getJobApplicationsByInstituteId,
    auth_1.default,
    index_1.instituteController.getJobApplicationsByInstituteIdController
);
exports.default = router;
//# sourceMappingURL=institute.routes.js.map
