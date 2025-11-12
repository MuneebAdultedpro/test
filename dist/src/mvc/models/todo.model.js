'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const types_1 = require('../../interfaces/types');
const methods_1 = require('../../methods');
const TodoSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    firebaseId: { type: String },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'user' },
    institute_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'institution',
    },
    pendingUserId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
    },
    completed: { type: Boolean },
    description: { type: String },
    dueDateTime: { type: Date },
    isTest: { type: Boolean },
    title: { type: String },
    type: {
        type: String,
        enum: Object.values(types_1.TodoTypes),
        default: '',
    },
});
module.exports = mongoose_1.default.model('todo', TodoSchema);
//# sourceMappingURL=todo.model.js.map
