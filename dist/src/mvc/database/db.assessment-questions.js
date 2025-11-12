'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.updateAssessmentAttemptInDB =
    exports.getUpdatedAssessmentAttemptFromDB =
    exports.getAssessmentAttemptByUserIdAndId =
    exports.getCareerPathsList =
    exports.findStudentAssessmentAttempts =
    exports.addingAttemptInExistingStudentAttempts =
    exports.createStudentAttempt =
    exports.findStudentAttemptsByUserId =
    exports.getAssessmentQuestionsList =
        void 0;
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const models_1 = require('../models');
const student_assessment_1 = require('../models/student-assessment');
const getAssessmentQuestionsList = async () => {
    try {
        return await models_1.StudentAssessmentQuestionModel.find();
    } catch (error) {
        throw new Error(
            `Error fetching Avatar: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
    return;
};
exports.getAssessmentQuestionsList = getAssessmentQuestionsList;
const findStudentAttemptsByUserId = async (userId) => {
    try {
        return await models_1.StudentAssessmentAttemptsModel.findOne({
            userId,
        });
    } catch (error) {
        throw new Error(`Error fetching student attempts: ${error.message}`);
    }
};
exports.findStudentAttemptsByUserId = findStudentAttemptsByUserId;
const createStudentAttempt = async (userId, newAttempt) => {
    try {
        const studentAttempt = new models_1.StudentAssessmentAttemptsModel({
            userId,
            attempts: [newAttempt],
        });
        return await studentAttempt.save();
    } catch (error) {
        throw new Error(
            `Error creating student assessment attempt: ${error.message}`
        );
    }
};
exports.createStudentAttempt = createStudentAttempt;
const addingAttemptInExistingStudentAttempts = async (
    studentAttempts,
    newAttempt
) => {
    try {
        studentAttempts.attempts.unshift(newAttempt);
        return await studentAttempts.save();
    } catch (error) {
        throw new Error(
            `Error updating student assessment attempts: ${error.message}`
        );
    }
};
exports.addingAttemptInExistingStudentAttempts =
    addingAttemptInExistingStudentAttempts;
const findStudentAssessmentAttempts = async (userId) => {
    try {
        return await models_1.StudentAssessmentAttemptsModel.findOne({
            userId,
        });
    } catch (error) {
        throw new Error(
            `Error fetching student assessment attempts: ${error.message}`
        );
    }
};
exports.findStudentAssessmentAttempts = findStudentAssessmentAttempts;
const getCareerPathsList = async () => {
    try {
        return await student_assessment_1.CareerPathWithInsights.find();
    } catch (error) {
        throw new Error(
            `Error fetching Avatar: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
    return;
};
exports.getCareerPathsList = getCareerPathsList;
const getAssessmentAttemptByUserIdAndId = async (userId, assessmentId) => {
    try {
        const result = await models_1.StudentAssessmentAttemptsModel.aggregate([
            {
                $match: {
                    userId: new mongoose_1.default.Types.ObjectId(userId),
                },
            },
            {
                $project: {
                    fullAttempts: '$attempts',
                    matchingAttempt: {
                        $arrayElemAt: [
                            {
                                $filter: {
                                    input: '$attempts',
                                    as: 'attempt',
                                    cond: {
                                        $eq: [
                                            '$$attempt._id',
                                            new mongoose_1.default.Types.ObjectId(
                                                assessmentId
                                            ),
                                        ],
                                    },
                                },
                            },
                            0,
                        ],
                    },
                },
            },
        ]);
        if (result.length === 0) {
            return { success: false, message: 'User or attempt not found' };
        }
        let fullAttempts = result[0].fullAttempts;
        let matchingAttempt = result[0].matchingAttempt;
        return {
            success: true,
            fullAttempts,
            matchingAttempt,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};
exports.getAssessmentAttemptByUserIdAndId = getAssessmentAttemptByUserIdAndId;
const updateAssessmentAttemptInDB = async (
    userId,
    assessmentId,
    updateData
) => {
    try {
        const updateResult =
            await models_1.StudentAssessmentAttemptsModel.updateOne(
                {
                    userId: new mongoose_1.default.Types.ObjectId(userId),
                    'attempts._id': new mongoose_1.default.Types.ObjectId(
                        assessmentId
                    ),
                },
                {
                    $set: {
                        'attempts.$.status': updateData.status,
                        'attempts.$.questionWithResponse':
                            updateData.questionWithResponse,
                    },
                }
            );
        return updateResult.modifiedCount > 0;
    } catch (error) {
        console.error('Error updating assessment attempt:', error.message);
        throw new Error('Database error while updating assessment attempt');
    }
};
exports.updateAssessmentAttemptInDB = updateAssessmentAttemptInDB;
const getUpdatedAssessmentAttemptFromDB = async (userId, assessmentId) => {
    try {
        const updatedData =
            await models_1.StudentAssessmentAttemptsModel.aggregate([
                {
                    $match: {
                        userId: new mongoose_1.default.Types.ObjectId(userId),
                    },
                },
                {
                    $project: {
                        fullAttempts: {
                            $map: {
                                input: '$attempts',
                                as: 'attempt',
                                in: {
                                    $mergeObjects: [
                                        { id: '$$attempt._id' },
                                        {
                                            $arrayToObject: {
                                                $filter: {
                                                    input: {
                                                        $objectToArray:
                                                            '$$attempt',
                                                    },
                                                    as: 'field',
                                                    cond: {
                                                        $ne: [
                                                            '$$field.k',
                                                            '_id',
                                                        ],
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                        matchingAttempt: {
                            $let: {
                                vars: {
                                    filteredAttempt: {
                                        $filter: {
                                            input: '$attempts',
                                            as: 'attempt',
                                            cond: {
                                                $eq: [
                                                    '$$attempt._id',
                                                    new mongoose_1.default.Types.ObjectId(
                                                        assessmentId
                                                    ),
                                                ],
                                            },
                                        },
                                    },
                                },
                                in: {
                                    $cond: {
                                        if: {
                                            $gt: [
                                                { $size: '$$filteredAttempt' },
                                                0,
                                            ],
                                        },
                                        then: {
                                            $mergeObjects: [
                                                {
                                                    id: {
                                                        $arrayElemAt: [
                                                            '$$filteredAttempt._id',
                                                            0,
                                                        ],
                                                    },
                                                },
                                                {
                                                    $arrayToObject: {
                                                        $filter: {
                                                            input: {
                                                                $objectToArray:
                                                                    {
                                                                        $arrayElemAt:
                                                                            [
                                                                                '$$filteredAttempt',
                                                                                0,
                                                                            ],
                                                                    },
                                                            },
                                                            as: 'field',
                                                            cond: {
                                                                $ne: [
                                                                    '$$field.k',
                                                                    '_id',
                                                                ],
                                                            },
                                                        },
                                                    },
                                                },
                                            ],
                                        },
                                        else: null,
                                    },
                                },
                            },
                        },
                    },
                },
            ]);
        return updatedData.length > 0 ? updatedData[0] : null;
    } catch (error) {
        console.error(
            'Error fetching updated assessment attempt:',
            error.message
        );
        throw new Error(
            'Database error while retrieving updated assessment attempt'
        );
    }
};
exports.getUpdatedAssessmentAttemptFromDB = getUpdatedAssessmentAttemptFromDB;
//# sourceMappingURL=db.assessment-questions.js.map
