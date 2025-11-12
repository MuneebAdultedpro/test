'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const methods_1 = require('../../methods');
const EventRegistrationSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    event_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'event',
        required: true,
    },
    candidate_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
    },
    institute_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'institution',
    },
    branch_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'branch',
    }, // Reference to branch
});
module.exports = mongoose_1.default.model(
    'eventregistration',
    EventRegistrationSchema
);
//# sourceMappingURL=event-registration.model.js.map
