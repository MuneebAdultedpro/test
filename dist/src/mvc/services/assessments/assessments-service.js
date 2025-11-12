'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.updateQustion =
    exports.getAllQuestions =
    exports.addNewQustion =
    exports.getAllTestAttemptsByUser =
    exports.submitTestResult =
    exports.getTestQuestionsByType =
    exports.getAllTestsTemplates =
        void 0;
const db_assessments_1 = require('../../database/db.assessments');
const getAllTestsTemplates = async (req) => {
    var _a;
    try {
        let testType =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.testType;
        if (typeof testType === 'string') {
            testType = [testType]; // Convert single item to array
        }
        const testTemplates = await (0, db_assessments_1.findAllTestTemplates)(
            testType
        );
        return {
            message: 'Tests retrieved successfully',
            statusCode: 200,
            success: true,
            testTemplates,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message,
        };
    }
};
exports.getAllTestsTemplates = getAllTestsTemplates;
const getTestQuestionsByType = async (req) => {
    var _a, _b;
    try {
        const testType =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.testType;
        const limit =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.limit
            ) || 10;
        if (!testType) {
            return {
                success: false,
                statusCode: 400,
                message: 'Test type is required',
            };
        }
        const template = await (0, db_assessments_1.getTestTemplateByType)(
            testType
        );
        if (!template) {
            return {
                success: false,
                statusCode: 404,
                message: `No template found for type ${testType}`,
            };
        }
        const questions = await (0,
        db_assessments_1.getRandomQuestionsByCategory)(testType, limit); // Get 10 random questions
        return {
            message: 'Questions fetched successfully',
            success: true,
            statusCode: 200,
            testType:
                template === null || template === void 0
                    ? void 0
                    : template.type,
            testTitle:
                template === null || template === void 0
                    ? void 0
                    : template.title,
            questions,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message,
        };
    }
};
exports.getTestQuestionsByType = getTestQuestionsByType;
const submitTestResult = async (req) => {
    try {
        const testAttempt = await (0, db_assessments_1.saveTestAttempt)(
            req === null || req === void 0 ? void 0 : req.body
        );
        return {
            message: 'Test submitted successfully',
            statusCode: 200,
            success: true,
            testAttempt: testAttempt,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message,
        };
    }
};
exports.submitTestResult = submitTestResult;
const addNewQustion = async (req) => {
    try {
        const question = await (0, db_assessments_1.saveNewQuestion)(
            req === null || req === void 0 ? void 0 : req.body
        );
        return {
            message: 'Question added successfully',
            statusCode: 200,
            success: true,
            question: question,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message,
        };
    }
};
exports.addNewQustion = addNewQustion;
const updateQustion = async (req) => {
    var _a;
    try {
        const questionId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const question = await (0, db_assessments_1.updateQuestionById)(
            questionId,
            req === null || req === void 0 ? void 0 : req.body
        );
        return {
            message: 'Question updated successfully',
            statusCode: 200,
            success: true,
            question: question,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message,
        };
    }
};
exports.updateQustion = updateQustion;
const getAllTestAttemptsByUser = async (req) => {
    var _a, _b, _c, _d, _e;
    try {
        const page =
            parseInt(
                (_a = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _a === void 0
                    ? void 0
                    : _a.page
            ) || 1;
        const limit =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.limit
            ) || 10;
        const userId =
            ((_c = req === null || req === void 0 ? void 0 : req.query) ===
                null || _c === void 0
                ? void 0
                : _c.userId) ||
            ((_d = req === null || req === void 0 ? void 0 : req.user) ===
                null || _d === void 0
                ? void 0
                : _d.id);
        let testType =
            (_e = req === null || req === void 0 ? void 0 : req.query) ===
                null || _e === void 0
                ? void 0
                : _e.testType;
        if (typeof testType === 'string') {
            testType = [testType]; // Convert single item to array
        }
        const { testAttempts, totalTestAttempts, totalPages, currentPage } =
            await (0, db_assessments_1.findAllAttemptsByUser)(
                userId,
                testType,
                limit,
                page
            );
        return {
            message: 'User attempts fetched successfully',
            statusCode: 200,
            success: true,
            testAttempts,
            totalTestAttempts,
            totalPages,
            currentPage,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message,
        };
    }
};
exports.getAllTestAttemptsByUser = getAllTestAttemptsByUser;
const getAllQuestions = async (req) => {
    var _a, _b;
    try {
        const page =
            parseInt(
                (_a = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _a === void 0
                    ? void 0
                    : _a.page
            ) || 1;
        const limit =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.limit
            ) || 10;
        const { questions, totalQuestions, totalPages, currentPage } = await (0,
        db_assessments_1.findAllQuestions)(limit, page);
        return {
            message: 'Questions fetched successfully',
            statusCode: 200,
            success: true,
            questions,
            totalQuestions,
            totalPages,
            currentPage,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message,
        };
    }
};
exports.getAllQuestions = getAllQuestions;
//# sourceMappingURL=assessments-service.js.map
