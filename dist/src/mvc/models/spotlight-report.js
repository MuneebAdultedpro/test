'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const methods_1 = require('../../methods');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const SpotLightReportSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    reportedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    postId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'spotlight-post',
    },
    commentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'spotlight-comment',
    },
    reason: { type: String, required: true },
});
module.exports = mongoose_1.default.model(
    'spotlight-report',
    SpotLightReportSchema
);
//# sourceMappingURL=spotlight-report.js.map
