'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.exploreNextStepController =
    exports.getAllCareerPathsController =
    exports.updateAssessmentAttemptController =
    exports.getAssessmentAttemptsController =
    exports.postAssessmentQuestionsController =
    exports.getAssessmentQuestionsController =
        void 0;
const assessment_question_service_1 = require('../../services/assessment-question/assessment-question.service');
const getAssessmentQuestionsController = async (req, res) => {
    try {
        const result = await (0,
        assessment_question_service_1.getAssessmentQuestions)();
        if (result.success) {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    questions:
                        result === null || result === void 0
                            ? void 0
                            : result.questions,
                });
        } else {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    message:
                        result === null || result === void 0
                            ? void 0
                            : result.message,
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.getAssessmentQuestionsController = getAssessmentQuestionsController;
const getAssessmentAttemptsController = async (req, res) => {
    var _a;
    const { userId } = req.query;
    try {
        const validationError = (0,
        assessment_question_service_1.validateGetAssessmentAttempts)(userId);
        if (validationError) {
            return res
                .status(400)
                .json({ success: false, message: validationError });
        }
        const result = await (0,
        assessment_question_service_1.getAssessmentAttempts)(userId);
        if (
            (result === null || result === void 0 ? void 0 : result.success) &&
            ((_a =
                result === null || result === void 0
                    ? void 0
                    : result.attempts) === null || _a === void 0
                ? void 0
                : _a.length) === 0
        ) {
            return res.status(200).json({
                message: 'No assessment attempts found for this user',
                success: true,
                noAttempts: true,
                attempts: [],
            });
        }
        if (result.success) {
            return res.status(result.statusCode).json({
                message: result.message,
                attempts: result.attempts,
                success: true,
            });
        } else {
            return res.status(result.statusCode).json({
                message: result.message,
                success: false,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};
exports.getAssessmentAttemptsController = getAssessmentAttemptsController;
const postAssessmentQuestionsController = async (req, res) => {
    const { userId, status, questionWithResponse } = req.body;
    try {
        const validationError = (0,
        assessment_question_service_1.validatePostAssessmentQuestions)(
            userId,
            status,
            questionWithResponse
        );
        if (validationError) {
            return res
                .status(400)
                .json({ success: false, message: validationError });
        }
        const result = await (0,
        assessment_question_service_1.postAssessmentQuestion)(
            userId,
            status,
            questionWithResponse
        );
        if (result.success) {
            return res.status(result.statusCode).json({
                message: result.message,
                attempt: result.attempt,
            });
        } else {
            return res.status(result.statusCode).json({
                message: result.message,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};
exports.postAssessmentQuestionsController = postAssessmentQuestionsController;
const updateAssessmentAttemptController = async (req, res) => {
    const { userId, status, questionWithResponse } = req.body;
    const { id: assessmentId } = req.query;
    try {
        const validationError = (0,
        assessment_question_service_1.validateUpdateAssessmentAttempt)(
            userId,
            assessmentId,
            status,
            questionWithResponse
        );
        if (validationError) {
            return res
                .status(400)
                .json({ success: false, message: validationError });
        }
        const result = await (0,
        assessment_question_service_1.updateAssessmentAttempt)(
            userId,
            assessmentId,
            status,
            questionWithResponse
        );
        return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        console.error('Controller Error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to update assessment attempt',
            error: error.message,
        });
    }
};
exports.updateAssessmentAttemptController = updateAssessmentAttemptController;
const getAllCareerPathsController = async (req, res) => {
    try {
        const response = await (0,
        assessment_question_service_1.getAllCareerPaths)();
        return res.status(200).json({
            success: true,
            statusCode: response.statusCode || 200,
            message:
                response.message ||
                'Career path attempts retrieved successfully.',
            data: response.careerPaths,
        });
    } catch (error) {
        console.error('Controller Error:', error.message);
        return res.status(500).json({
            success: false,
            statusCode:
                (res === null || res === void 0 ? void 0 : res.statusCode) ||
                500,
            message:
                'An unexpected error occurred while processing the request.',
            error: error.message,
        });
    }
};
exports.getAllCareerPathsController = getAllCareerPathsController;
const exploreNextStepController = async (req, res) => {
    try {
        const result = await (0, assessment_question_service_1.exploreNextStep)(
            req
        );
        if (result.success) {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                });
        } else {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    message:
                        result === null || result === void 0
                            ? void 0
                            : result.message,
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.exploreNextStepController = exploreNextStepController;
//# sourceMappingURL=assessment-questions.controller.js.map
