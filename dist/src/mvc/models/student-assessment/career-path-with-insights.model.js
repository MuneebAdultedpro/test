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
const careerPathSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    name: {
        type: multilingualObject,
    },
    whyChoose: {
        type: multilingualObject,
    },
    careerInsights: {
        type: [multilingualObject],
    },
});
module.exports = mongoose_1.default.model(
    'career-path-with-insights',
    careerPathSchema
);
//# sourceMappingURL=career-path-with-insights.model.js.map
