'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const middlewares_1 = require('../../middlewares');
const assessment_questions_1 = require('../../controllers/assessment-questions');
const routes_strings_1 = require('../routes-strings');
const router = express_1.default.Router();
const {
    getAssessmentQuestionsController,
    getAssessmentAttemptsController,
    getAllCareerPathsController,
    postAssessmentQuestionsController,
} = assessment_questions_1.AssessmentQuestionsController;
router.get(
    routes_strings_1.assessmentQuestionRoutes === null ||
        routes_strings_1.assessmentQuestionRoutes === void 0
        ? void 0
        : routes_strings_1.assessmentQuestionRoutes.getAllAssessmentQuestions,
    middlewares_1.auth,
    getAssessmentQuestionsController
);
router.get(
    routes_strings_1.assessmentQuestionRoutes === null ||
        routes_strings_1.assessmentQuestionRoutes === void 0
        ? void 0
        : routes_strings_1.assessmentQuestionRoutes.getAssessmentAttempts,
    middlewares_1.auth,
    getAssessmentAttemptsController
);
router.get(
    routes_strings_1.assessmentQuestionRoutes === null ||
        routes_strings_1.assessmentQuestionRoutes === void 0
        ? void 0
        : routes_strings_1.assessmentQuestionRoutes.getAllCareerPathAttempts,
    middlewares_1.auth,
    getAllCareerPathsController
);
router.post(
    routes_strings_1.assessmentQuestionRoutes === null ||
        routes_strings_1.assessmentQuestionRoutes === void 0
        ? void 0
        : routes_strings_1.assessmentQuestionRoutes.postAssessmentQuestions,
    middlewares_1.auth,
    postAssessmentQuestionsController
);
router.post(
    routes_strings_1.assessmentQuestionRoutes === null ||
        routes_strings_1.assessmentQuestionRoutes === void 0
        ? void 0
        : routes_strings_1.assessmentQuestionRoutes.exploreNextStep,
    middlewares_1.auth,
    assessment_questions_1.AssessmentQuestionsController
        .exploreNextStepController
);
router.put(
    routes_strings_1.assessmentQuestionRoutes === null ||
        routes_strings_1.assessmentQuestionRoutes === void 0
        ? void 0
        : routes_strings_1.assessmentQuestionRoutes.updateAssessmentAttempts,
    middlewares_1.auth,
    assessment_questions_1.AssessmentQuestionsController === null ||
        assessment_questions_1.AssessmentQuestionsController === void 0
        ? void 0
        : assessment_questions_1.AssessmentQuestionsController
              .updateAssessmentAttemptController
);
exports.default = router;
//# sourceMappingURL=assesssment-questions.route.js.map
