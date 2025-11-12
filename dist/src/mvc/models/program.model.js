'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const types_1 = require('../../interfaces/types');
const methods_1 = require('../../methods');
const ProgramSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    firebaseId: { type: String },
    approved: { type: Boolean, default: false },
    question_type: {
        type: String,
        enum: Object.values(types_1.AllowedPrograms),
        default: '',
    }, //this should be the question_type
});
module.exports = mongoose_1.default.model('program', ProgramSchema);
// In Program schema definition
ProgramSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
ProgramSchema.set('toJSON', {
    virtuals: true,
});
ProgramSchema.set('toObject', {
    virtuals: true,
});
//# sourceMappingURL=program.model.js.map
