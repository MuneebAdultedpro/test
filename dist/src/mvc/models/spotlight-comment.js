'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const methods_1 = require('../../methods');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const SpotLightCommentSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    postId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'spotlight-post',
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    content: { type: String, required: true },
});
module.exports = mongoose_1.default.model(
    'spotlight-comment',
    SpotLightCommentSchema
);
//# sourceMappingURL=spotlight-comment.js.map
