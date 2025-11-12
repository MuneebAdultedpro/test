'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const methods_1 = require('../../../methods');
const assessments_interface_1 = require('../../../interfaces/assessments.interface');
const AssessmentsTestAttemptSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    testType: {
        type: String,
        enum: Object.values(assessments_interface_1.AssessmentsTestType),
        required: true,
    },
    testTypeTitle: { type: String },
    testName: {
        type: String,
        enum: Object.values(assessments_interface_1.AssessmentsTestName),
        required: true,
        default: assessments_interface_1.AssessmentsTestName.Practice,
    },
    answers: [
        {
            questionId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'driver_license_question',
            },
            selectedOption: [String],
            isCorrect: Boolean, // Can be precomputed for summary
        },
    ],
    totalQuestions: { type: Number },
    correctAnswers: { type: Number },
    failedAnswers: { type: Number },
    isPassed: { type: Boolean },
    scorePercentage: { type: Number },
    testSnapshot: { type: Object }, //contains the entir test result (what user choose and what was original question)
});
module.exports = mongoose_1.default.model(
    'assessments-attempt',
    AssessmentsTestAttemptSchema
);
//# sourceMappingURL=assessments-test-attempt.modal.js.map
