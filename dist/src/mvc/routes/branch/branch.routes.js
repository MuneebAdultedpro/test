'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const index_1 = require('../../controllers/index');
const routes_strings_1 = require('../routes-strings');
const auth_1 = tslib_1.__importDefault(require('../../middlewares/auth'));
const router = express_1.default.Router();
router.post(
    routes_strings_1.branchRoutes === null ||
        routes_strings_1.branchRoutes === void 0
        ? void 0
        : routes_strings_1.branchRoutes.create,
    // auth,
    index_1.branchController === null || index_1.branchController === void 0
        ? void 0
        : index_1.branchController.createBranchController
);
router.post(
    routes_strings_1.branchRoutes === null ||
        routes_strings_1.branchRoutes === void 0
        ? void 0
        : routes_strings_1.branchRoutes.addEmployer,
    auth_1.default,
    index_1.branchController === null || index_1.branchController === void 0
        ? void 0
        : index_1.branchController.addEmployerController
);
router.get(
    routes_strings_1.EmployerRoutes === null ||
        routes_strings_1.EmployerRoutes === void 0
        ? void 0
        : routes_strings_1.EmployerRoutes.get,
    auth_1.default,
    index_1.branchController === null || index_1.branchController === void 0
        ? void 0
        : index_1.branchController.getEmployerController
);
router.get(
    routes_strings_1.EmployerRoutes === null ||
        routes_strings_1.EmployerRoutes === void 0
        ? void 0
        : routes_strings_1.EmployerRoutes.getEmployerDashboardCounts,
    auth_1.default,
    index_1.branchController === null || index_1.branchController === void 0
        ? void 0
        : index_1.branchController.getEmployerDashboardCountsController
);
router.get(
    routes_strings_1.EmployerRoutes === null ||
        routes_strings_1.EmployerRoutes === void 0
        ? void 0
        : routes_strings_1.EmployerRoutes.getEmployerByCompanyAndBranch,
    auth_1.default,
    index_1.branchController === null || index_1.branchController === void 0
        ? void 0
        : index_1.branchController.getEmployerByCompanyAndBranchController
);
router.get(
    routes_strings_1.EmployerRoutes === null ||
        routes_strings_1.EmployerRoutes === void 0
        ? void 0
        : routes_strings_1.EmployerRoutes.getEmployerMainBranch,
    auth_1.default,
    index_1.branchController === null || index_1.branchController === void 0
        ? void 0
        : index_1.branchController.getEmployerMainBranchController
);
router.get(
    routes_strings_1.EmployerRoutes === null ||
        routes_strings_1.EmployerRoutes === void 0
        ? void 0
        : routes_strings_1.EmployerRoutes.getAll,
    auth_1.default,
    index_1.branchController === null || index_1.branchController === void 0
        ? void 0
        : index_1.branchController.getEmployersController
);
router.get(
    routes_strings_1.EmployerRoutes === null ||
        routes_strings_1.EmployerRoutes === void 0
        ? void 0
        : routes_strings_1.EmployerRoutes.openPositions,
    auth_1.default,
    index_1.branchController === null || index_1.branchController === void 0
        ? void 0
        : index_1.branchController.getEmployersOpenPositionsController
);
router.get(
    routes_strings_1.branchRoutes === null ||
        routes_strings_1.branchRoutes === void 0
        ? void 0
        : routes_strings_1.branchRoutes.branches,
    auth_1.default,
    index_1.branchController === null || index_1.branchController === void 0
        ? void 0
        : index_1.branchController.getBranchesController
);
router.get(
    routes_strings_1.branchRoutes === null ||
        routes_strings_1.branchRoutes === void 0
        ? void 0
        : routes_strings_1.branchRoutes.branchById,
    auth_1.default,
    index_1.branchController === null || index_1.branchController === void 0
        ? void 0
        : index_1.branchController.getBranchByIdController
);
router.get(
    routes_strings_1.branchRoutes === null ||
        routes_strings_1.branchRoutes === void 0
        ? void 0
        : routes_strings_1.branchRoutes.branches,
    auth_1.default,
    index_1.branchController === null || index_1.branchController === void 0
        ? void 0
        : index_1.branchController.getBranchesController
);
router.get(
    routes_strings_1.branchRoutes === null ||
        routes_strings_1.branchRoutes === void 0
        ? void 0
        : routes_strings_1.branchRoutes.employerBranches,
    auth_1.default,
    index_1.branchController === null || index_1.branchController === void 0
        ? void 0
        : index_1.branchController.getBranchesOfEmployerConrtoller
);
router.get(
    routes_strings_1.branchRoutes === null ||
        routes_strings_1.branchRoutes === void 0
        ? void 0
        : routes_strings_1.branchRoutes.branchByUserId,
    auth_1.default,
    index_1.branchController === null || index_1.branchController === void 0
        ? void 0
        : index_1.branchController.getBranchByUserIdController
);
router.get(
    routes_strings_1.branchRoutes === null ||
        routes_strings_1.branchRoutes === void 0
        ? void 0
        : routes_strings_1.branchRoutes.getJobApplicationsByEmployerEmail,
    auth_1.default,
    index_1.branchController === null || index_1.branchController === void 0
        ? void 0
        : index_1.branchController.getJobApplicationsByEmployerEmailController
);
router.get(
    routes_strings_1.branchRoutes === null ||
        routes_strings_1.branchRoutes === void 0
        ? void 0
        : routes_strings_1.branchRoutes.getAllJobApplications,
    auth_1.default,
    index_1.branchController === null || index_1.branchController === void 0
        ? void 0
        : index_1.branchController.getAllJobApplicationsController
);
router.delete(
    routes_strings_1.branchRoutes === null ||
        routes_strings_1.branchRoutes === void 0
        ? void 0
        : routes_strings_1.branchRoutes.delete,
    auth_1.default,
    index_1.branchController === null || index_1.branchController === void 0
        ? void 0
        : index_1.branchController.deleteBranchController
);
router.patch(
    routes_strings_1.branchRoutes === null ||
        routes_strings_1.branchRoutes === void 0
        ? void 0
        : routes_strings_1.branchRoutes.update,
    auth_1.default,
    index_1.branchController === null || index_1.branchController === void 0
        ? void 0
        : index_1.branchController.updateBranchController
);
exports.default = router;
//# sourceMappingURL=branch.routes.js.map
