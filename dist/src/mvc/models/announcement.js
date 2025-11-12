'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const types_1 = require('../../interfaces/types');
const methods_1 = require('../../methods');
const AnnouncementSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    firebaseId: { type: String, default: '' },
    isTest: { type: Boolean },
    description: { type: String },
    institute_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'institution',
    },
    to: {
        type: String,
        enum: [
            'Students',
            'Programs',
            'Admin',
            'Teachers',
            'Classes',
            'Counsellors',
        ],
    },
    toIds: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'user' }],
    title: { type: String },
    type: {
        type: String,
        enum: Object.values(types_1.AnnouncementTypes),
    },
    toEmails: [{ type: String }], // Array of email addresses if applicable
});
module.exports = mongoose_1.default.model('announcement', AnnouncementSchema);
//# sourceMappingURL=announcement.js.map
