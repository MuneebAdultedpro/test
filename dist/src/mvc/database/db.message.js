'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.createMessage = exports.findChatMessages = void 0;
const models_1 = require('../models');
const findChatMessages = async (chatId) => {
    try {
        return await models_1.Message.find({ chatId: chatId }).sort({
            createdAt: -1,
        }); // Sort by most recent
    } catch (error) {
        throw new Error(
            `Error Fetching Message: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findChatMessages = findChatMessages;
const createMessage = async (data) => {
    try {
        const message = await new models_1.Message(data);
        return message.save();
    } catch (error) {
        throw new Error(
            `Error Creating Message: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.createMessage = createMessage;
//# sourceMappingURL=db.message.js.map
