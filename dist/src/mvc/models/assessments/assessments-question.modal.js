'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const methods_1 = require('../../../methods');
const types_1 = require('../../../interfaces/types');
var QuestionType;
(function (QuestionType) {
    QuestionType['MULTIPLE_CHOICE'] = 'MULTIPLE_CHOICE';
    QuestionType['TEXT_INPUT'] = 'TEXT_INPUT';
    QuestionType['DATE_INPUT'] = 'DATE_INPUT';
    QuestionType['DROPDOWN'] = 'DROPDOWN';
})(QuestionType || (QuestionType = {}));
const AssessmentsQuestionSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    questionText: types_1.multilingualObject,
    explanation: types_1.multilingualObject,
    url: { type: String },
    // New field to support different question types
    type: {
        type: String,
        enum: Object.values(QuestionType),
        default: QuestionType.MULTIPLE_CHOICE,
    },
    options: [
        {
            label: types_1.multilingualObject,
            isCorrectAnswer: Boolean,
        },
    ],
    category: {
        type: Array,
        // enum: Object.values(AssessmentsTestType),
        required: true,
    },
});
module.exports = mongoose_1.default.model(
    'assessments-question',
    AssessmentsQuestionSchema
);
//# sourceMappingURL=assessments-question.modal.js.map
