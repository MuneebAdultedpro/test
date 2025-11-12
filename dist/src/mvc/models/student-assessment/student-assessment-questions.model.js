'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const methods_1 = require('../../../methods');
const multilingualObject = {
    en: { type: String, default: '' },
    es: { type: String, default: '' },
    tl: { type: String, default: '' },
};
const careerOptionSchema = {
    optionLabel: multilingualObject,
    careerPathsId: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'career_path_insights',
        },
    ],
};
const QuestionSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId },
    questionLabel: multilingualObject,
    options: [careerOptionSchema],
    order: { type: Number, required: true },
});
module.exports = mongoose_1.default.model(
    'student-assessment-questions',
    QuestionSchema
);
//# sourceMappingURL=student-assessment-questions.model.js.map
