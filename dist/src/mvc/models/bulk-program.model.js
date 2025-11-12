'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const methods_1 = require('../../methods');
const BulkProgramSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    institute_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'institution',
        required: true,
    },
    program_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'program',
        required: true,
    },
    time_table: { type: String, default: '' }, // Not sure about this yet
});
module.exports = mongoose_1.default.model('bulkprogram', BulkProgramSchema);
//# sourceMappingURL=bulk-program.model.js.map
