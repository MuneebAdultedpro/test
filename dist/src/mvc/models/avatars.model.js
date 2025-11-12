'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const types_1 = require('../../interfaces/types');
const methods_1 = require('../../methods');
// Define the enum for possible avatar types
const AvatarSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    firebaseId: { type: String },
    image: { type: String, required: true },
    fileName: { type: String },
    type: {
        type: String,
        enum: Object.values(types_1.AllowedPrograms),
        required: true,
    },
});
module.exports = mongoose_1.default.model('avatar', AvatarSchema);
//# sourceMappingURL=avatars.model.js.map
