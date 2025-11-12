'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const methods_1 = require('../../methods');
const BranchInstitutionSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    branch_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'branch',
        required: true,
    },
    institute_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'institution',
        required: true,
    }, // Reference to institution
});
module.exports = mongoose_1.default.model(
    'branchinstitution',
    BranchInstitutionSchema
);
//# sourceMappingURL=employer-institution.js.map
