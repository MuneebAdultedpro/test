'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const methods_1 = require('../../../methods');
const attemptSchema = (0, methods_1.CreateSchema)({
    questionID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'student_assessment_questions',
        required: true,
    },
    selectedIndex: {
        type: mongoose_1.default.Schema.Types.Number,
    },
});
const userAttemptSchema = (0, methods_1.CreateSchema)({
    attemptOrder: { type: mongoose_1.default.Schema.Types.Number },
    questionWithResponse: [attemptSchema],
    status: { type: mongoose_1.default.Schema.Types.String },
});
const userCareerAttemptsSchema = (0, methods_1.CreateSchema)({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    attempts: {
        type: [userAttemptSchema],
        required: true,
    },
});
module.exports = mongoose_1.default.model(
    'student-assessment-attempts',
    userCareerAttemptsSchema
);
//# sourceMappingURL=student-assessment-attempt.model.js.map
