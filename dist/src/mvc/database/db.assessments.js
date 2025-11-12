'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.findAllQuestions =
    exports.findAllAttemptsByUser =
    exports.updateQuestionById =
    exports.saveNewQuestion =
    exports.saveTestAttempt =
    exports.getRandomQuestionsByCategory =
    exports.getTestTemplateByType =
    exports.findAllTestTemplates =
        void 0;
const assessments_interface_1 = require('../../interfaces/assessments.interface');
const models_1 = require('../models');
const findAllTestTemplates = async (
    testTypes = [
        assessments_interface_1.AssessmentsTestType.CAR,
        assessments_interface_1.AssessmentsTestType.CDL,
        assessments_interface_1.AssessmentsTestType.BIKE,
    ]
) => {
    try {
        const filter = {};
        // If testTypes is a non-empty array, add $in filter
        if (
            Array.isArray(testTypes) &&
            (testTypes === null || testTypes === void 0
                ? void 0
                : testTypes.length) > 0
        ) {
            filter.testType = { $in: testTypes };
        }
        return await models_1.AssessmentsTestTemplate.find(filter);
    } catch (error) {
        throw new Error(`Error retrieving templates: ${error.message}`);
    }
};
exports.findAllTestTemplates = findAllTestTemplates;
const getTestTemplateByType = async (testType) => {
    try {
        return await models_1.AssessmentsTestTemplate.findOne({ testType });
    } catch (error) {
        throw new Error(`Error retrieving template: ${error.message}`);
    }
};
exports.getTestTemplateByType = getTestTemplateByType;
const getRandomQuestionsByCategory = async (category, limit = 10) => {
    try {
        return await models_1.AssessmentsQuestion.aggregate([
            { $match: { category: category } },
            { $sample: { size: limit } },
        ]);
    } catch (error) {
        throw new Error(`Error retrieving questions: ${error.message}`);
    }
};
exports.getRandomQuestionsByCategory = getRandomQuestionsByCategory;
const saveTestAttempt = async (attemptData) => {
    try {
        const attempt = new models_1.AssessmentsTestAttempt(attemptData);
        return await attempt.save();
    } catch (error) {
        console.log('error', error);
        throw new Error(`Error saving test: ${error.message}`);
    }
};
exports.saveTestAttempt = saveTestAttempt;
const saveNewQuestion = async (questionData) => {
    try {
        const attempt = new models_1.AssessmentsQuestion(questionData);
        return await attempt.save();
    } catch (error) {
        console.log('error', error);
        throw new Error(`Error saving question: ${error.message}`);
    }
};
exports.saveNewQuestion = saveNewQuestion;
const updateQuestionById = async (questionId, questionData) => {
    try {
        await models_1.AssessmentsQuestion.findByIdAndUpdate(
            questionId,
            questionData,
            {
                new: true,
            }
        );
        // Then, retrieve the updated document with population
        const updatedDocument = await models_1.AssessmentsQuestion.findById(
            questionId
        );
        if (!updatedDocument) {
            throw new Error('Question not found');
        }
        return updatedDocument;
    } catch (error) {
        throw new Error(
            `Error updating question: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.updateQuestionById = updateQuestionById;
const findAllAttemptsByUser = async (
    userId,
    testTypes = [
        assessments_interface_1.AssessmentsTestType.CAR,
        assessments_interface_1.AssessmentsTestType.CDL,
        assessments_interface_1.AssessmentsTestType.BIKE,
    ],
    limit,
    page
) => {
    try {
        const filter = { userId };
        // If testTypes is a non-empty array, add $in filter
        if (
            Array.isArray(testTypes) &&
            (testTypes === null || testTypes === void 0
                ? void 0
                : testTypes.length) > 0
        ) {
            filter.testType = { $in: testTypes };
        }
        const totalDocuments =
            await models_1.AssessmentsTestAttempt.countDocuments(filter);
        const totalPages = Math.ceil(totalDocuments / limit);
        const documents = await models_1.AssessmentsTestAttempt.find(filter)
            .select('-testSnapshot')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        return {
            testAttempts: documents,
            totalTestAttempts: totalDocuments,
            totalPages,
            currentPage: page,
        };
    } catch (error) {
        throw new Error(`Error retrieving user attempts: ${error.message}`);
    }
};
exports.findAllAttemptsByUser = findAllAttemptsByUser;
const findAllQuestions = async (limit, page) => {
    try {
        const totalDocuments =
            await models_1.AssessmentsQuestion.countDocuments();
        const totalPages = Math.ceil(totalDocuments / limit);
        const documents = await models_1.AssessmentsQuestion.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        return {
            questions: documents,
            totalQuestions: totalDocuments,
            totalPages,
            currentPage: page,
        };
    } catch (error) {
        throw new Error(`Error retrieving questions: ${error.message}`);
    }
};
exports.findAllQuestions = findAllQuestions;
//# sourceMappingURL=db.assessments.js.map
