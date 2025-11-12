'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const index_1 = require('../../controllers/index');
const routes_strings_1 = require('../routes-strings');
const auth_1 = tslib_1.__importDefault(require('../../middlewares/auth'));
const router = express_1.default.Router();
router.get(
    routes_strings_1.jobRoutes === null || routes_strings_1.jobRoutes === void 0
        ? void 0
        : routes_strings_1.jobRoutes.getAll,
    auth_1.default,
    index_1.jobsController === null || index_1.jobsController === void 0
        ? void 0
        : index_1.jobsController.getJobsController
);
router.get(
    routes_strings_1.jobRoutes === null || routes_strings_1.jobRoutes === void 0
        ? void 0
        : routes_strings_1.jobRoutes.getAllApplications,
    auth_1.default,
    index_1.jobsController === null || index_1.jobsController === void 0
        ? void 0
        : index_1.jobsController.getAllApplicationsController
);
router.get(
    routes_strings_1.jobRoutes === null || routes_strings_1.jobRoutes === void 0
        ? void 0
        : routes_strings_1.jobRoutes.getSavedJobs,
    auth_1.default,
    index_1.jobsController === null || index_1.jobsController === void 0
        ? void 0
        : index_1.jobsController.getSavedJobsController
);
router.get(
    routes_strings_1.jobRoutes === null || routes_strings_1.jobRoutes === void 0
        ? void 0
        : routes_strings_1.jobRoutes.getAppiedJobs,
    auth_1.default,
    index_1.jobsController === null || index_1.jobsController === void 0
        ? void 0
        : index_1.jobsController.getAppliedJobsController
);
router.get(
    routes_strings_1.jobRoutes === null || routes_strings_1.jobRoutes === void 0
        ? void 0
        : routes_strings_1.jobRoutes.getApplicantAppiedJobs,
    auth_1.default,
    index_1.jobsController === null || index_1.jobsController === void 0
        ? void 0
        : index_1.jobsController.getApplicantAppliedJobsController
);
router.get(
    routes_strings_1.jobRoutes === null || routes_strings_1.jobRoutes === void 0
        ? void 0
        : routes_strings_1.jobRoutes.getByUserId,
    auth_1.default,
    index_1.jobsController === null || index_1.jobsController === void 0
        ? void 0
        : index_1.jobsController.getJobsByUserIdController
);
router.get(
    routes_strings_1.jobRoutes === null || routes_strings_1.jobRoutes === void 0
        ? void 0
        : routes_strings_1.jobRoutes.getByEmployerEmail,
    auth_1.default,
    index_1.jobsController === null || index_1.jobsController === void 0
        ? void 0
        : index_1.jobsController.getByEmployerEmailController
);
router.get(
    routes_strings_1.jobRoutes === null || routes_strings_1.jobRoutes === void 0
        ? void 0
        : routes_strings_1.jobRoutes.getApplications,
    auth_1.default,
    index_1.jobsController === null || index_1.jobsController === void 0
        ? void 0
        : index_1.jobsController.getApplicationsController
);
router.patch(
    routes_strings_1.jobRoutes === null || routes_strings_1.jobRoutes === void 0
        ? void 0
        : routes_strings_1.jobRoutes.updateApplication,
    auth_1.default,
    index_1.jobsController === null || index_1.jobsController === void 0
        ? void 0
        : index_1.jobsController.updateApplicationController
);
router.post(
    routes_strings_1.jobRoutes === null || routes_strings_1.jobRoutes === void 0
        ? void 0
        : routes_strings_1.jobRoutes.create,
    auth_1.default,
    index_1.jobsController === null || index_1.jobsController === void 0
        ? void 0
        : index_1.jobsController.postjobController
);
router.post(
    routes_strings_1.jobRoutes === null || routes_strings_1.jobRoutes === void 0
        ? void 0
        : routes_strings_1.jobRoutes.applyJob,
    auth_1.default,
    index_1.jobsController === null || index_1.jobsController === void 0
        ? void 0
        : index_1.jobsController.applyJobController
);
router.patch(
    routes_strings_1.jobRoutes === null || routes_strings_1.jobRoutes === void 0
        ? void 0
        : routes_strings_1.jobRoutes.update,
    auth_1.default,
    index_1.jobsController === null || index_1.jobsController === void 0
        ? void 0
        : index_1.jobsController.updateJobController
);
router.get(
    routes_strings_1.jobRoutes === null || routes_strings_1.jobRoutes === void 0
        ? void 0
        : routes_strings_1.jobRoutes.get,
    auth_1.default,
    index_1.jobsController === null || index_1.jobsController === void 0
        ? void 0
        : index_1.jobsController.getJobController
);
router.delete(
    routes_strings_1.jobRoutes === null || routes_strings_1.jobRoutes === void 0
        ? void 0
        : routes_strings_1.jobRoutes.delete,
    auth_1.default,
    index_1.jobsController === null || index_1.jobsController === void 0
        ? void 0
        : index_1.jobsController.deleteJobController
);
exports.default = router;
//# sourceMappingURL=job.routes.js.map
