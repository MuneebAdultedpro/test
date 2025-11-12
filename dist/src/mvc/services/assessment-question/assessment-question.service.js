'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.validatePostAssessmentQuestions =
    exports.exploreNextStep =
    exports.validateGetAssessmentAttempts =
    exports.validateUpdateAssessmentAttempt =
    exports.getAllCareerPaths =
    exports.updateAssessmentAttempt =
    exports.getAssessmentAttempts =
    exports.postAssessmentQuestion =
    exports.getAssessmentQuestions =
        void 0;
const db_assessment_questions_1 = require('../../database/db.assessment-questions');
const db_institute_1 = require('../../database/db.institute');
const assessment_question_methods_1 = require('../../../methods/assessment-question.methods');
const NodeGeocoder = require('node-geocoder');
const getAssessmentQuestions = async () => {
    try {
        const questions = await (0,
        db_assessment_questions_1.getAssessmentQuestionsList)();
        return {
            success: true,
            statusCode: 200,
            message: 'Assessment questions retrieved successfully',
            questions,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getAssessmentQuestions = getAssessmentQuestions;
const getAssessmentAttempts = async (userId) => {
    try {
        const studentAttempts = await (0,
        db_assessment_questions_1.findStudentAssessmentAttempts)(userId);
        debugger;
        return {
            success: true,
            statusCode: 200,
            message: 'Assessment attempts fetched successfully',
            attempts: (
                studentAttempts === null || studentAttempts === void 0
                    ? void 0
                    : studentAttempts.attempts.length
            )
                ? studentAttempts === null || studentAttempts === void 0
                    ? void 0
                    : studentAttempts.attempts
                : [],
            dataFound: studentAttempts !== null,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: `Error fetching assessment attempts: ${error.message}`,
        };
    }
};
exports.getAssessmentAttempts = getAssessmentAttempts;
const postAssessmentQuestion = async (userId, status, questionWithResponse) => {
    var _a;
    try {
        status = status || 'in-progress';
        let studentAttempts = await (0,
        db_assessment_questions_1.findStudentAttemptsByUserId)(userId);
        const attemptOrder = studentAttempts
            ? ((_a =
                  studentAttempts === null || studentAttempts === void 0
                      ? void 0
                      : studentAttempts.attempts) === null || _a === void 0
                  ? void 0
                  : _a.length) + 1
            : 1;
        const newAttempt = {
            status,
            attemptOrder,
            questionWithResponse,
        };
        if (studentAttempts) {
            await (0,
            db_assessment_questions_1.addingAttemptInExistingStudentAttempts)(
                studentAttempts,
                newAttempt
            );
        } else {
            studentAttempts = await (0,
            db_assessment_questions_1.createStudentAttempt)(userId, newAttempt);
        }
        return {
            success: true,
            statusCode: 200,
            message: studentAttempts
                ? 'Student Assessment Attempt created in existing attempts successfully'
                : 'Student Assessment Attempt created successfully',
            attempt: studentAttempts.attempts[0],
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message,
        };
    }
};
exports.postAssessmentQuestion = postAssessmentQuestion;
const validateUpdateAssessmentAttempt = (
    userId,
    assessmentId,
    status,
    questionWithResponse
) => {
    if (!userId || !assessmentId || !status || !questionWithResponse) {
        return 'Missing required fields: userId, assessmentId, status, questionWithResponse';
    }
    return null;
};
exports.validateUpdateAssessmentAttempt = validateUpdateAssessmentAttempt;
const validateGetAssessmentAttempts = (userId) => {
    if (!userId) {
        return 'User ID is required';
    }
    return null;
};
exports.validateGetAssessmentAttempts = validateGetAssessmentAttempts;
const validatePostAssessmentQuestions = (
    userId,
    status,
    questionWithResponse
) => {
    if (!userId || !status) {
        return 'User ID and status are required';
    }
    if (
        !Array.isArray(questionWithResponse) ||
        questionWithResponse.length === 0
    ) {
        return 'Questions are required and should not be empty';
    }
    return null;
};
exports.validatePostAssessmentQuestions = validatePostAssessmentQuestions;
const updateAssessmentAttempt = async (
    userId,
    assessmentId,
    status,
    questionWithResponse
) => {
    try {
        const updateSuccess = await (0,
        db_assessment_questions_1.updateAssessmentAttemptInDB)(
            userId,
            assessmentId,
            { status, questionWithResponse }
        );
        if (!updateSuccess) {
            return {
                success: false,
                message: 'Assessment not updated.',
            };
        }
        const updatedData = await (0,
        db_assessment_questions_1.getUpdatedAssessmentAttemptFromDB)(
            userId,
            assessmentId
        );
        if (!updatedData) {
            return { success: false, message: 'Updated attempt not found.' };
        }
        debugger;
        return {
            success: true,
            status: 200,
            message: 'Assessment attempt updated successfully',
            updatedAttempt: updatedData.matchingAttempt,
            allUserAssessmentAttempts: updatedData.fullAttempts,
        };
    } catch (error) {
        console.error(
            'Service error updating assessment attempt:',
            error.message
        );
        return {
            success: false,
            message:
                error.message || 'Service error updating assessment attempt',
        };
    }
};
exports.updateAssessmentAttempt = updateAssessmentAttempt;
const getAllCareerPaths = async () => {
    try {
        let careerPaths = await (0,
        db_assessment_questions_1.getCareerPathsList)();
        return {
            success: true,
            statusCode: 200,
            message: 'Career paths with insights retrieved successfully',
            careerPaths,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getAllCareerPaths = getAllCareerPaths;
const exploreNextStep = async (req) => {
    var _a, _b, _c, _d, _e;
    try {
        const studentInstituteId =
            (_a = req === null || req === void 0 ? void 0 : req.body) ===
                null || _a === void 0
                ? void 0
                : _a.studentInstituteId;
        const studentZipcode =
            (_b = req === null || req === void 0 ? void 0 : req.body) ===
                null || _b === void 0
                ? void 0
                : _b.studentZipcode;
        const operationPerformed =
            (_c = req === null || req === void 0 ? void 0 : req.body) ===
                null || _c === void 0
                ? void 0
                : _c.operationPerformed;
        const studentData =
            (_d = req === null || req === void 0 ? void 0 : req.body) ===
                null || _d === void 0
                ? void 0
                : _d.studentData;
        let foundInstitue;
        if (!studentInstituteId) {
            const geocoder = NodeGeocoder({
                provider: 'google',
                apiKey: process.env.GOOGLE_MAPS_API_KEY,
            });
            const geo = await geocoder.geocode({ address: studentZipcode });
            if (!geo.length) {
                return {
                    success: false,
                    statusCode: 404,
                    message:
                        'Student entered Invalid ZIP code in profile, please add a correct ZIP code',
                };
            }
            const { latitude, longitude } =
                (_e = geo === null || geo === void 0 ? void 0 : geo[0]) !==
                    null && _e !== void 0
                    ? _e
                    : {
                          latitude: 0,
                          longitude: 0,
                      };
            // un-registered student flow: need to fetch user zipcode and check nearby institute and return the most nearest one
            const institues = await (0, db_institute_1.findNearestInstitues)(
                longitude,
                latitude
            );
            foundInstitue =
                institues === null || institues === void 0
                    ? void 0
                    : institues[0];
        } else {
            const institue = await (0, db_institute_1.findInstituteById)(
                studentInstituteId
            );
            foundInstitue = institue;
        }
        if (!foundInstitue) {
            return {
                success: false,
                statusCode: 404,
                message: 'Institute not found',
            };
        }
        await (0, assessment_question_methods_1.sendMailForExploreNextStep)({
            studentInstituteId,
            operationPerformed,
            foundInstitue,
            studentData,
        });
        return {
            message: 'Mail sent successfully',
            statusCode: 200,
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message,
        };
    }
};
exports.exploreNextStep = exploreNextStep;
//# sourceMappingURL=assessment-question.service.js.map
