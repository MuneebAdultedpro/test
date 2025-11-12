'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const types_1 = require('../../interfaces/types');
const methods_1 = require('../../methods');
const JobApplicationSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    firebaseId: { type: String, default: '' },
    candidate_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
    },
    job_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'job' },
    job_snapshot: { type: Object, default: undefined },
    is_test: { type: Boolean },
    status: {
        type: String,
        enum: Object.values(types_1.JobApplicationStatus),
    },
});
//need to change the fields name here ********
module.exports = mongoose_1.default.model(
    'job_application',
    JobApplicationSchema
);
//# sourceMappingURL=job-application.model.js.map
