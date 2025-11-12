'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const methods_1 = require('../../methods');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
var Gender;
(function (Gender) {
    Gender['Male'] = 'MALE';
    Gender['Female'] = 'FEMALE';
    Gender['Others'] = 'OTHERS';
})(Gender || (Gender = {}));
const UserSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    name: { type: String },
    address: { type: String, default: '' },
    address_line1: { type: String, default: '' },
    address_line2: { type: String, default: '' },
    zip_code: { type: String, default: '' },
    email: { type: String, lowercase: true, require: true },
    last_activity: { type: Date },
    phone_no: { type: String },
    photo_url: { type: String, default: '' },
    is_legal_terms_accepted: { type: Boolean },
    fcm_token: { type: String, default: '' },
    gender: { type: String, enum: Object.values(Gender) },
});
module.exports = mongoose_1.default.model('user', UserSchema);
//# sourceMappingURL=user.model.js.map
