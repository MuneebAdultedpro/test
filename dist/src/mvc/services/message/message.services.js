'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.sendMessage =
    exports.getChatMessages =
    exports.sendPushNotificationForChatParticipents =
        void 0;
const tslib_1 = require('tslib');
const db_message_1 = require('../../database/db.message');
const db_chat_1 = require('../../database/db.chat');
const methods_1 = require('../../../methods');
const types_1 = require('../../../interfaces/types');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const getChatMessages = async (req) => {
    var _a;
    try {
        const chatId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.chatId;
        if (!chatId) {
            return {
                success: false,
                statusCode: 404,
                message: 'ChatId not provided ',
            };
        }
        const messages = await (0, db_message_1.findChatMessages)(chatId);
        if (messages) {
            return {
                messages: messages,
                message: 'Messages Retrived Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 403,
                message: 'Error Fetching Messages',
            };
        }
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getChatMessages = getChatMessages;
const sendPushNotificationForChatParticipents = async (chat, message) => {
    var _a, _b, _c, _d, _e;
    try {
        const senderId = (
            message === null || message === void 0 ? void 0 : message.isFromBot
        )
            ? (_a =
                  process === null || process === void 0
                      ? void 0
                      : process.env) === null || _a === void 0
                ? void 0
                : _a.CHAT_BOT_USER_ID
            : message === null || message === void 0
            ? void 0
            : message.senderId;
        if (
            senderId &&
            (chat === null || chat === void 0 ? void 0 : chat.participants)
        ) {
            const notificationReceivers =
                (_e =
                    (_d =
                        (_c =
                            (_b =
                                chat === null || chat === void 0
                                    ? void 0
                                    : chat.participants) === null ||
                            _b === void 0
                                ? void 0
                                : _b.filter) === null || _c === void 0
                            ? void 0
                            : _c.call(_b, (participant) => {
                                  var _a, _b, _c, _d;
                                  const notSender =
                                      ((_c =
                                          (_b =
                                              (_a =
                                                  participant === null ||
                                                  participant === void 0
                                                      ? void 0
                                                      : participant.userId) ===
                                                  null || _a === void 0
                                                  ? void 0
                                                  : _a._id) === null ||
                                          _b === void 0
                                              ? void 0
                                              : _b.toString) === null ||
                                      _c === void 0
                                          ? void 0
                                          : _c.call(_b)) !==
                                      ((_d =
                                          senderId === null ||
                                          senderId === void 0
                                              ? void 0
                                              : senderId.toString) === null ||
                                      _d === void 0
                                          ? void 0
                                          : _d.call(senderId));
                                  // only send notificaitons to user who hasn't left the group
                                  const hasNotLeft =
                                      (participant === null ||
                                      participant === void 0
                                          ? void 0
                                          : participant.leftAt) === null ||
                                      (participant === null ||
                                      participant === void 0
                                          ? void 0
                                          : participant.leftAt) === undefined;
                                  return notSender && hasNotLeft;
                              })) === null || _d === void 0
                        ? void 0
                        : _d.map) === null || _e === void 0
                    ? void 0
                    : _e.call(_d, (participant) => {
                          var _a;
                          return new mongoose_1.default.Types.ObjectId(
                              (_a =
                                  participant === null || participant === void 0
                                      ? void 0
                                      : participant.userId) === null ||
                              _a === void 0
                                  ? void 0
                                  : _a._id
                          );
                      });
            (0, methods_1.getFcmTokensForUserIds)(notificationReceivers)
                .then((tokens) => {
                    (0, methods_1.sendPushNotifications)(
                        tokens,
                        'Evolo AI Notification',
                        message,
                        false,
                        types_1.NotificationsTypes.Chat
                    );
                })
                .catch((fcmErrors) => console.log(fcmErrors));
        }
    } catch (e) {
        console.error('Error sending FCM message:', e);
    }
};
exports.sendPushNotificationForChatParticipents =
    sendPushNotificationForChatParticipents;
const sendMessage = async (req) => {
    var _a, _b, _c;
    try {
        const chatId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.chatId;
        // add message to database
        const newMessage = await (0, db_message_1.createMessage)(
            (_b = req === null || req === void 0 ? void 0 : req.body) ===
                null || _b === void 0
                ? void 0
                : _b.messageData
        );
        // update the chat details as well and then ass to database
        const updatedChat = await (0, db_chat_1.findChatByIdAndUpdate)(
            chatId,
            (_c = req === null || req === void 0 ? void 0 : req.body) ===
                null || _c === void 0
                ? void 0
                : _c.chatData
        );
        // send push notification for chat participents
        (0, exports.sendPushNotificationForChatParticipents)(
            updatedChat,
            newMessage
        );
        if (
            (newMessage === null || newMessage === void 0
                ? void 0
                : newMessage.isFromBot) === true ||
            (newMessage === null || newMessage === void 0
                ? void 0
                : newMessage.isEmployerResponse) === true
        ) {
            // Do nothing if it's employer or bot message
        } else {
            if (
                (updatedChat === null || updatedChat === void 0
                    ? void 0
                    : updatedChat.type) ===
                    types_1.ChatTypes.IS_JOB_APPLICATION_CHAT &&
                !(updatedChat === null || updatedChat === void 0
                    ? void 0
                    : updatedChat.shouldBotStopResponding)
            ) {
                (0, methods_1.respondWithBotOnUserMessage)(updatedChat);
            }
            // if (updatedChat?.type === ChatTypes.IS_JOB_APPLICATION_CHAT) {
            //     respondWithBotOnUserMessage(updatedChat);
            // }
        }
        (0, methods_1.realTimeEventForChatMessage)(updatedChat, newMessage);
        if (newMessage) {
            return {
                newMessage: newMessage,
                chat: updatedChat,
                message: 'New message created Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 403,
                message: 'Error Creating message',
            };
        }
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.sendMessage = sendMessage;
//# sourceMappingURL=message.services.js.map
