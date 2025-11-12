'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const types_1 = require('../../interfaces/types');
const methods_1 = require('../../methods');
const ChatSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    job_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'job' },
    // last_message: { type: mongoose.Schema.Types.ObjectId, ref: 'message' }, // ref to job
    last_message: { type: String },
    type: {
        type: String,
        enum: Object.values(types_1.ChatTypes),
    },
    participants: [
        {
            userId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'user',
            },
            joinedAt: { type: Date, default: Date.now }, // When the user joined the chat
        },
    ],
    groupName: { type: String, default: '' },
    groupPhoto: { type: String, default: '' },
    shouldBotStopResponding: { type: Boolean },
    role: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    lastMessageTimestamp: { type: Date },
    alreadyProcessedForChatReminder: { type: Boolean, default: false },
    incompleteChatReminderSentDateForStudent: { type: Date },
});
module.exports = mongoose_1.default.model('chat', ChatSchema);
//# sourceMappingURL=chats.model.js.map
