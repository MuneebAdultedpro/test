'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const methods_1 = require('../../methods');
const schema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    consortiom_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'consortiom',
    },
    firebaseId: { type: String, default: '' },
    name: { type: String, default: '', require: true },
    country: { type: String, default: '' },
    city: { type: String, default: '' },
    address: { type: String, default: '' },
    address_line1: { type: String, default: '' },
    address_line2: { type: String, default: '' },
    zip: { type: String, default: '' },
    state: { type: String, default: '' },
    website: { type: String, default: '' },
    tag_line: { type: String, default: '' },
    logo_url: { type: String, default: '' },
    banner_color: { type: String, default: '' },
    mission: { type: String, default: '' },
    carousel_images: { type: Array },
    email: { type: String, lowercase: true },
    admin_email: { type: String, lowercase: true },
    phone_no: { type: String, default: '' },
    photo_url: { type: String, default: '' },
    approved: { type: Boolean, default: false },
    program: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'program' },
    ],
    fcm_token: { type: String, default: '' },
    // firebase values
    latitute: { type: String, default: '' },
    longitude: { type: String, default: '' },
    ipedsid: { type: String, default: '' },
    is_test: { type: Boolean },
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], index: '2dsphere' }, // [lng, lat]
    },
});
module.exports = mongoose_1.default.model('institution', schema);
//# sourceMappingURL=institution.model.js.map
