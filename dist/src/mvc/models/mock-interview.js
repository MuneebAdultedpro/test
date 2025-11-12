'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const methods_1 = require('../../methods');
var mockInterviewRoles;
(function (mockInterviewRoles) {
    mockInterviewRoles['user'] = 'user';
    mockInterviewRoles['assistant'] = 'assistant';
    mockInterviewRoles['system'] = 'system';
})(mockInterviewRoles || (mockInterviewRoles = {}));
const MockInterviewSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
    },
    title: { type: String },
    strengths: [{ type: String }],
    weakness: [{ type: String }],
    messages: [
        {
            role: {
                type: String,
                enum: Object.values(mockInterviewRoles),
                required: true,
            },
            content: { type: String, required: true },
        },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose_1.default.model(
    'mock-interview',
    MockInterviewSchema
);
//# sourceMappingURL=mock-interview.js.map
