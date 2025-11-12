'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.reminderForChatCompletionOfJobApplication =
    exports.getAllMessagesForChat = void 0;
const methods_1 = require('../../methods');
const models_1 = require('../../mvc/models');
const types_1 = require('../../interfaces/types');
const cron = require('node-cron');
const getAllChats = async () => {
    try {
        const chatsData = await models_1.Chat.find({
            type: 'IS_JOB_APPLICATION_CHAT',
            $or: [
                { alreadyProcessedForChatReminder: { $exists: false } },
                { alreadyProcessedForChatReminder: { $ne: true } },
            ],
            createdAt: { $gte: new Date('2025-07-01T00:00:00.000Z') },
        });
        return chatsData;
    } catch (error) {
        console.log('getAllChats in chat reminder failed with', error);
        return [];
    }
};
const getAllMessagesForChat = async (chatId) => {
    try {
        const messagesData = await models_1.Message.find({ chatId }).sort({
            createdAt: -1,
        });
        return messagesData;
    } catch (error) {
        console.log(
            'getAllMessagesForChat in chats reminder failed with',
            error
        );
        return [];
    }
};
exports.getAllMessagesForChat = getAllMessagesForChat;
const getMostRecentMessageForChat = (messages) => {
    var _a;
    if (!(messages === null || messages === void 0 ? void 0 : messages.length))
        return null;
    const mostRecentMessage =
        (_a =
            messages === null || messages === void 0
                ? void 0
                : messages.sort) === null || _a === void 0
            ? void 0
            : _a.call(messages, (a, b) => {
                  var _a, _b, _c, _d;
                  return (
                      ((_b =
                          (_a = new Date(
                              b === null || b === void 0 ? void 0 : b.createdAt
                          )) === null || _a === void 0
                              ? void 0
                              : _a.getTime) === null || _b === void 0
                          ? void 0
                          : _b.call(_a)) -
                      ((_d =
                          (_c = new Date(
                              a === null || a === void 0 ? void 0 : a.createdAt
                          )) === null || _c === void 0
                              ? void 0
                              : _c.getTime) === null || _d === void 0
                          ? void 0
                          : _d.call(_c))
                  );
              })[0];
    return mostRecentMessage;
};
const checkIfMessageIsThreeDaysOld = (recentMessage) => {
    var _a, _b;
    if (
        !(recentMessage === null || recentMessage === void 0
            ? void 0
            : recentMessage.createdAt)
    )
        return false;
    const messageDate =
        (_b =
            (_a = new Date(
                recentMessage === null || recentMessage === void 0
                    ? void 0
                    : recentMessage.createdAt
            )) === null || _a === void 0
                ? void 0
                : _a.getTime) === null || _b === void 0
            ? void 0
            : _b.call(_a);
    const currentDate = Date.now();
    const timeDifference = currentDate - messageDate;
    const threeDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000;
    return timeDifference >= threeDaysInMilliseconds;
};
const reminderForChatCompletionOfJobApplication = () => {
    // Run daily at 9 AM Calefornia timezone
    cron.schedule('* 16 * * *', async () => {
        var _a, _b, _c;
        try {
            // Step1 : get all chats
            const chatList = await getAllChats();
            // Step2 : get all messages for each chat
            for (const chat of chatList) {
                const messagesList = await (0, exports.getAllMessagesForChat)(
                    chat === null || chat === void 0 ? void 0 : chat.id
                );
                // Step3: now map over all messages for that chat and check if there is any document where the isEmployerResponse or isFromBot is true
                const allBotOrEmployerMessages =
                    (_a =
                        messagesList === null || messagesList === void 0
                            ? void 0
                            : messagesList.filter) === null || _a === void 0
                        ? void 0
                        : _a.call(
                              messagesList,
                              (message) =>
                                  (message === null || message === void 0
                                      ? void 0
                                      : message.isFromBot) === true ||
                                  (message === null || message === void 0
                                      ? void 0
                                      : message.isEmployerResponse) === true
                          );
                if (
                    (allBotOrEmployerMessages === null ||
                    allBotOrEmployerMessages === void 0
                        ? void 0
                        : allBotOrEmployerMessages.length) ===
                    (messagesList === null || messagesList === void 0
                        ? void 0
                        : messagesList.length)
                ) {
                    // if allBotOrEmployerMessages?.length===messagesList?.length that means student hasn't send any message yet
                    // Step4: now get the time of last message
                    const mostRecentMessage =
                        getMostRecentMessageForChat(messagesList);
                    // Step5: Now check if it's 3 days old if yes then send him a reminder
                    const isMessageThreeDaysOld =
                        checkIfMessageIsThreeDaysOld(mostRecentMessage);
                    if (isMessageThreeDaysOld) {
                        // Step6: Identify the student participant
                        let student = null;
                        for (const participant of chat === null ||
                        chat === void 0
                            ? void 0
                            : chat.participants) {
                            const user = await models_1.User.findById(
                                participant.userId
                            );
                            if (
                                ((_b =
                                    user === null || user === void 0
                                        ? void 0
                                        : user.role) === null || _b === void 0
                                    ? void 0
                                    : _b.includes(types_1.Role.Student)) ||
                                ((_c =
                                    user === null || user === void 0
                                        ? void 0
                                        : user.role) === null || _c === void 0
                                    ? void 0
                                    : _c.includes(types_1.Role.jobSeeker))
                            ) {
                                student = user;
                                break;
                            }
                        }
                        const title = 'You Left the Chat';
                        const message = {
                            content:
                                'Looks like your previous chat with the employer is still pending a response.',
                        };
                        // Step7: Send notification to student
                        const notificationResult = await (0,
                        methods_1.sendPushNotifications)(
                            [
                                student === null || student === void 0
                                    ? void 0
                                    : student.fcm_token,
                            ],
                            title,
                            message,
                            true,
                            types_1.NotificationsTypes.ChatCompletion
                        );
                        // Step8: Update the chat to mark it as processed
                        await models_1.Chat.findByIdAndUpdate(chat._id, {
                            alreadyProcessedForChatReminder: true,
                            incompleteChatReminderSentDateForStudent:
                                new Date(),
                        });
                    }
                } else {
                    const mostRecentMessage =
                        getMostRecentMessageForChat(messagesList);
                    // Step5: Now check if it's 3 days old if yes then send him a reminder
                    const isMessageThreeDaysOld =
                        checkIfMessageIsThreeDaysOld(mostRecentMessage);
                    if (isMessageThreeDaysOld) {
                        await models_1.Chat.findByIdAndUpdate(chat._id, {
                            alreadyProcessedForChatReminder: true,
                        });
                    }
                }
            }
        } catch (error) {
            console.log('chat notification cron failed with', error);
        }
    });
};
exports.reminderForChatCompletionOfJobApplication =
    reminderForChatCompletionOfJobApplication;
//# sourceMappingURL=index.js.map
