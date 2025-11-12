'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const methods_1 = require('../../methods');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const SpotLightHashtagSchema = (0, methods_1.CreateSchema)({
    name: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },
    consortiumId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'consortiom',
        required: true,
    },
    postCount: { type: Number, default: 0 },
});
module.exports = mongoose_1.default.model(
    'spotlight-hashtag',
    SpotLightHashtagSchema
);
//# sourceMappingURL=spotlight-hashtags.js.map
