'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const types_1 = require('../../interfaces/types');
const methods_1 = require('../../methods');
const MessageSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    chatId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'chat',
        required: true,
    },
    senderId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
    },
    content: { type: String, default: '' },
    isFromBot: { type: Boolean },
    isEmployerResponse: { type: Boolean },
    messageType: {
        type: String,
        enum: Object.values(types_1.MessageType),
        default: 'text',
    },
    mediaUrl: { type: String, default: '' },
    isDeleted: { type: Boolean, default: false },
    deletedBy: [
        {
            userId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'user',
            },
            deletedAt: { type: Date, default: Date.now }, // When the message was deleted
        },
    ],
    readBy: [
        {
            userId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'user',
            },
            readAt: { type: Date, default: null },
        },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose_1.default.model('message', MessageSchema);
//# sourceMappingURL=message.model.js.map
