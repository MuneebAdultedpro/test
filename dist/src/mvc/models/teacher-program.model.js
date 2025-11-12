'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const methods_1 = require('../../methods');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const TeacherProgramSchema = (0, methods_1.CreateSchema)({
    teacher_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    program_ids: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'program',
            required: true,
        },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose_1.default.model(
    'teacher-program',
    TeacherProgramSchema
);
//# sourceMappingURL=teacher-program.model.js.map
