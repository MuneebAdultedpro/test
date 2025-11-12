'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.SpotlightPostType = exports.AuthorType = void 0;
const tslib_1 = require('tslib');
const types_1 = require('../../interfaces/types');
const methods_1 = require('../../methods');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
var AuthorType;
(function (AuthorType) {
    AuthorType['User'] = 'User';
    AuthorType['System'] = 'System';
})((AuthorType = exports.AuthorType || (exports.AuthorType = {})));
var SpotlightPostType;
(function (SpotlightPostType) {
    SpotlightPostType['Birthday'] = 'Birthday';
    SpotlightPostType['Other'] = 'Other';
})(
    (SpotlightPostType =
        exports.SpotlightPostType || (exports.SpotlightPostType = {}))
);
const SpotLightPostSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    postType: {
        type: String,
        default: '',
        enum: Object.values(SpotlightPostType),
    },
    createdBy: { type: String, enum: Object.values(AuthorType) },
    content: { type: String, required: true },
    postMediaType: { type: String },
    media: [
        {
            uri: { type: String },
            type: { type: String },
        },
    ],
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    consortiumId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'consortiom',
        index: true,
    },
    postLocations: [
        {
            type: String,
            enum: Object.values(types_1.PostLocationType),
            index: true,
        },
    ],
    hashtags: [{ type: String, index: true }],
    isDeleted: { type: Boolean, default: false },
    deletionReason: { type: String },
    hiddenByUserIds: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'user',
            index: true,
        },
    ],
    // pinnedByUserIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    pinnedByOwner: { type: Boolean, default: false },
});
module.exports = mongoose_1.default.model(
    'spotlight-post',
    SpotLightPostSchema
);
//# sourceMappingURL=spotlight-post.js.map
