'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const methods_1 = require('../../methods');
const DataPointSchema = (0, methods_1.CreateSchema)({
    Year: { type: String },
    Jobs: { type: String },
});
const StatSchema = (0, methods_1.CreateSchema)({
    Category: { type: String },
    Details: { type: String },
    dataPoints: [DataPointSchema],
});
const LabourMarketSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    firebaseId: { type: String },
    stats: { type: [StatSchema] },
    program: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'program' },
});
module.exports = mongoose_1.default.model('labour-market', LabourMarketSchema);
//# sourceMappingURL=labour-market.model.js.map
