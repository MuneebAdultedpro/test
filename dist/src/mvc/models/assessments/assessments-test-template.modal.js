'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const methods_1 = require('../../../methods');
const assessments_interface_1 = require('../../../interfaces/assessments.interface');
const AssessmentsTestTemplateSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    title: { type: String, default: '' },
    testType: {
        type: String,
        enum: Object.values(assessments_interface_1.AssessmentsTestType),
        required: true,
    },
    url: { type: String, default: '' },
    description: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    passingScore: { type: Number, default: 70 },
    practiceQuestionsLimit: { type: Number, default: 10 },
    examQuestionsLimit: { type: Number, default: 10 }, //for car 46, for bike 30, for cdl 50 and for civic 46
});
module.exports = mongoose_1.default.model(
    'assessments-template',
    AssessmentsTestTemplateSchema
);
//# sourceMappingURL=assessments-test-template.modal.js.map
