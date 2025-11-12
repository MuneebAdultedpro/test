'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.updateMockInterviewSession =
    exports.getMockInterviewMessagesByUserId =
    exports.postMockInterviewMessages =
        void 0;
const models_1 = require('../models');
const postMockInterviewMessages = async (userId, data) => {
    try {
        const newConversation = new models_1.MockInterview({
            userId,
            title: data.title,
            messages: data.conversation,
        });
        const savedConversation = await newConversation.save();
        return savedConversation;
    } catch (error) {
        throw new Error(
            `Error saving chat messages: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.postMockInterviewMessages = postMockInterviewMessages;
const getMockInterviewMessagesByUserId = async (userId) => {
    try {
        const conversations = await models_1.MockInterview.find({
            userId,
        }).sort({
            createdAt: -1,
        });
        if (!conversations) {
            return null; // or throw an error if preferred
        }
        return conversations;
    } catch (error) {
        throw new Error(
            `Error fetching chat messages: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.getMockInterviewMessagesByUserId = getMockInterviewMessagesByUserId;
const updateMockInterviewSession = async (id, data) => {
    try {
        const updatedConversation =
            await models_1.MockInterview.findByIdAndUpdate(
                id,
                Object.assign(Object.assign({}, data), {
                    weakness:
                        data === null || data === void 0
                            ? void 0
                            : data.areasForImprovement,
                }),
                {
                    new: true,
                }
            );
        if (!updatedConversation) {
            throw new Error('Conversation not found');
        }
        return updatedConversation;
    } catch (error) {
        throw new Error(
            `Error updating chat messages: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.updateMockInterviewSession = updateMockInterviewSession;
//# sourceMappingURL=db.mock-interview.js.map
