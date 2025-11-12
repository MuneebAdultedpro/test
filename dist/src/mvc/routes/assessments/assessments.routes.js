'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const index_1 = require('../../controllers/index');
const routes_strings_1 = require('../routes-strings');
const auth_1 = tslib_1.__importDefault(require('../../middlewares/auth'));
const router = express_1.default.Router();
router.get(
    routes_strings_1.assessmentsRoutes === null ||
        routes_strings_1.assessmentsRoutes === void 0
        ? void 0
        : routes_strings_1.assessmentsRoutes.getAllTestTemplates,
    auth_1.default,
    index_1.assessmentsController === null ||
        index_1.assessmentsController === void 0
        ? void 0
        : index_1.assessmentsController.getAllTestsTemplatesController
);
router.get(
    routes_strings_1.assessmentsRoutes === null ||
        routes_strings_1.assessmentsRoutes === void 0
        ? void 0
        : routes_strings_1.assessmentsRoutes.getTestQuestsionsByType,
    auth_1.default,
    index_1.assessmentsController === null ||
        index_1.assessmentsController === void 0
        ? void 0
        : index_1.assessmentsController.getTestQuestionsByTypeController
);
router.get(
    routes_strings_1.assessmentsRoutes === null ||
        routes_strings_1.assessmentsRoutes === void 0
        ? void 0
        : routes_strings_1.assessmentsRoutes.getUserTestAttempts,
    auth_1.default,
    index_1.assessmentsController === null ||
        index_1.assessmentsController === void 0
        ? void 0
        : index_1.assessmentsController.getUserTestAttemptsController
);
router.get(
    routes_strings_1.assessmentsRoutes === null ||
        routes_strings_1.assessmentsRoutes === void 0
        ? void 0
        : routes_strings_1.assessmentsRoutes.getAllQuestions,
    auth_1.default,
    index_1.assessmentsController === null ||
        index_1.assessmentsController === void 0
        ? void 0
        : index_1.assessmentsController.getAllQuestionsController
);
router.post(
    routes_strings_1.assessmentsRoutes === null ||
        routes_strings_1.assessmentsRoutes === void 0
        ? void 0
        : routes_strings_1.assessmentsRoutes.submitTestResult,
    auth_1.default,
    index_1.assessmentsController === null ||
        index_1.assessmentsController === void 0
        ? void 0
        : index_1.assessmentsController.submitTestResultController
);
router.put(
    routes_strings_1.assessmentsRoutes === null ||
        routes_strings_1.assessmentsRoutes === void 0
        ? void 0
        : routes_strings_1.assessmentsRoutes.question,
    auth_1.default,
    index_1.assessmentsController === null ||
        index_1.assessmentsController === void 0
        ? void 0
        : index_1.assessmentsController.updateQuestionController
);
router.post(
    routes_strings_1.assessmentsRoutes === null ||
        routes_strings_1.assessmentsRoutes === void 0
        ? void 0
        : routes_strings_1.assessmentsRoutes.question,
    auth_1.default,
    index_1.assessmentsController === null ||
        index_1.assessmentsController === void 0
        ? void 0
        : index_1.assessmentsController.addNewQuestionController
);
exports.default = router;
//# sourceMappingURL=assessments.routes.js.map
