'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const methods_1 = require('../../methods');
const ClassSchema = (0, methods_1.CreateSchema)({
    name: { type: String, required: true },
    program_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'program',
        required: true,
    },
    institute_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'institution',
        required: true,
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        validate: {
            validator: async function (userId) {
                const user = await mongoose_1.default
                    .model('user')
                    .findById(userId);
                return user && user.role.includes('Admin');
            },
            message: 'Only Admin can create a class',
        },
    },
    consortium_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'consortiom',
    },
    AssignedTo: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        validate: {
            validator: async function (userId) {
                const user = await mongoose_1.default
                    .model('user')
                    .findById(userId);
                return user && user.role.includes('Teacher');
            },
            message: 'Assigned user must be a Teacher',
        },
    },
    timings: [
        {
            startTime: { type: Date, required: true, default: Date.now() },
            endTime: { type: Date, required: true, default: Date.now() },
            duration: { type: Number }, //in hours
        },
    ],
    students: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'user',
        },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose_1.default.model('class', ClassSchema);
//# sourceMappingURL=class.model.js.map
