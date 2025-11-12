'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const methods_1 = require('../../methods');
const BranchSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    firebaseId: { type: String },
    firebaseUserId: { type: String },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'user' },
    institute_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'institute',
    },
    name: { type: String, require: true, default: '' },
    address: { type: String, default: '' },
    address_line1: { type: String, default: '' },
    address_line2: { type: String, default: '' },
    email: { type: String, lowercase: true, require: true },
    contact_email: { type: String, lowercase: true, require: true },
    contact_name: { type: String, default: '' },
    contact_bio: { type: String, default: '' },
    contact_number: { type: String, default: '' },
    bio: { type: String, default: '' },
    city: { type: String, default: '' },
    country: { type: String, default: '' },
    branch_location: { type: String, default: '' },
    phone_no: { type: String, default: '' },
    photo_url: { type: String, default: '' },
    banner_image: { type: String, default: '' },
    state: { type: String, default: '' },
    zip_code: { type: String, default: '' },
    fcm_token: { type: String, default: '' },
    tag_line: { type: String, default: '' },
    //from firebase
    social_media_links: { type: Array, default: [] },
    benefits_and_perks: { type: Array, default: [] },
    book_mark_students: { type: Array, default: [] },
    book_mark_user_applications: { type: Array, default: [] },
    company_size: { type: String, default: '1' },
    culture_and_environment: { type: String, default: '' },
    description: { type: String, default: '' },
    is_head_quarter: { type: Boolean, default: false },
    is_test: { type: Boolean },
    media: { type: Array, default: [] },
    culture_media: { type: Array, default: [] },
    mission: { type: String, default: '' },
    requirments: { type: String, default: '' },
    reviewed_user: { type: Array, default: [] },
    reviewed_user_application: { type: Array, default: [] },
    awards_and_accolades: { type: String, default: '' },
    alumni_links: { type: Array, default: [] },
});
module.exports = mongoose_1.default.model('branch', BranchSchema);
//# sourceMappingURL=branch.model.js.map
