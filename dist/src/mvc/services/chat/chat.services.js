'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getListOfUsersForGroupCreation =
    exports.exitChatGroup =
    exports.getUsersNotifiedForChatCompletion =
    exports.getChatWithParticipantIds =
    exports.getTeacherProgramChat =
    exports.createGroupChat =
    exports.getTeacherStudentChat =
    exports.getInstitueAndStudentChats =
    exports.getEmployerChats =
    exports.createChatAndSendMessage =
    exports.getUserChatsByChatType =
    exports.updateChat =
    exports.getStudentEmployerChats =
    exports.createChat =
    exports.getMultipleUsersChats =
    exports.getUserChats =
    exports.getAllChats =
    exports.sendPushNotificationForGroupCreation =
        void 0;
const tslib_1 = require('tslib');
const db_chat_1 = require('../../database/db.chat');
const methods_1 = require('../../../methods');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const types_1 = require('../../../interfaces/types');
const getTeacherProgramChat = async (req) => {
    var _a;
    try {
        const teacher_id =
            (_a = req === null || req === void 0 ? void 0 : req.user) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const { program_id, institute_id } =
            req === null || req === void 0 ? void 0 : req.query;
        if (!program_id || !institute_id) {
            return {
                success: false,
                statusCode: 400,
                message: 'Missing program and institute id',
            };
        }
        const result = await (0, db_chat_1.getChatofTeacherProgram)(
            teacher_id,
            program_id,
            institute_id
        );
        if (result) {
            return {
                chats: result,
                message: 'Chat of teacher programs Retrived Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 200,
                message: 'No Chat found',
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
exports.getTeacherProgramChat = getTeacherProgramChat;
const getTeacherStudentChat = async (req) => {
    var _a;
    try {
        const teacher_id =
            (_a = req === null || req === void 0 ? void 0 : req.user) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const result = await (0, db_chat_1.getStudentsTeacherChat)(teacher_id);
        if (result) {
            return {
                chats: result,
                message: 'Chat of teacher student Retrived Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: true,
                statusCode: 200,
                message: 'Chats not found',
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
exports.getTeacherStudentChat = getTeacherStudentChat;
const getAllChats = async (req) => {
    try {
        // const chats = await getUnseenStudents();
        const chats = await (0, db_chat_1.findAllChats)();
        if (chats) {
            return {
                chats: chats,
                message: 'Chats Retrived Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: true,
                statusCode: 200,
                message: 'Chats not found',
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
exports.getAllChats = getAllChats;
const getUserChats = async (req) => {
    var _a, _b, _c, _d;
    try {
        const userId =
            (_a = req === null || req === void 0 ? void 0 : req.user) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const page =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.page
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10; // Pagination: number of records per page
        const search =
            (_d = req === null || req === void 0 ? void 0 : req.query) ===
                null || _d === void 0
                ? void 0
                : _d.search;
        if (!userId) {
            return {
                success: false,
                statusCode: 404,
                message: 'UserId not provided',
            };
        }
        const chats = await (0, db_chat_1.findUserChats)(
            userId,
            page,
            limit,
            search
        );
        if (chats) {
            return {
                chats: chats,
                message: 'Chats Retrived Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: true,
                statusCode: 200,
                message: 'Chats not found',
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
exports.getUserChats = getUserChats;
const getEmployerChats = async (req) => {
    var _a, _b, _c, _d;
    try {
        const userId =
            (_a = req === null || req === void 0 ? void 0 : req.user) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const page =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.page
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10; // Pagination: number of records per page
        const search =
            (_d = req === null || req === void 0 ? void 0 : req.query) ===
                null || _d === void 0
                ? void 0
                : _d.search;
        if (!userId) {
            return {
                success: false,
                statusCode: 404,
                message: 'UserId not provided',
            };
        }
        const chats = await (0, db_chat_1.findEmployerChats)(
            userId,
            page,
            limit,
            search
        );
        if (chats) {
            return {
                chats: chats,
                message: 'Chats Retrived Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: true,
                statusCode: 200,
                message: 'Chats not found',
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
exports.getEmployerChats = getEmployerChats;
const getChatWithParticipantIds = async (req) => {
    var _a, _b;
    try {
        const userId =
            (_a = req === null || req === void 0 ? void 0 : req.user) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const participantId =
            (_b = req === null || req === void 0 ? void 0 : req.query) ===
                null || _b === void 0
                ? void 0
                : _b.id;
        if (!userId) {
            return {
                success: false,
                statusCode: 404,
                message: 'UserId not provided',
            };
        }
        const chat = await (0, db_chat_1.findChatWithParticipantIds)(
            userId,
            participantId
        );
        if (chat) {
            return {
                chat: chat,
                message: 'Chat Retrived Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: true,
                statusCode: 200,
                message: 'No Chats',
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
exports.getChatWithParticipantIds = getChatWithParticipantIds;
const getListOfUsersForGroupCreation = async (req) => {
    var _a, _b, _c;
    try {
        const instituteId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.instituteId;
        const roles =
            (_b = req === null || req === void 0 ? void 0 : req.query) ===
                null || _b === void 0
                ? void 0
                : _b.roles;
        const userId =
            (_c = req === null || req === void 0 ? void 0 : req.user) ===
                null || _c === void 0
                ? void 0
                : _c.id;
        if (!instituteId) {
            return {
                success: false,
                statusCode: 404,
                message: 'InstituteId not provided',
            };
        }
        const users = await (0, db_chat_1.findUsersForGroupCreation)(
            instituteId,
            roles,
            userId
        );
        if (users) {
            return {
                users: users,
                message: 'Users retrived successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: true,
                statusCode: 200,
                message: 'No users',
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
exports.getListOfUsersForGroupCreation = getListOfUsersForGroupCreation;
const sendPushNotificationForGroupCreation = async (
    groupName,
    participants,
    creatorName
) => {
    var _a;
    try {
        if (
            (participants === null || participants === void 0
                ? void 0
                : participants.length) > 0
        ) {
            const creatorId =
                (_a =
                    participants === null || participants === void 0
                        ? void 0
                        : participants.find(
                              (item) =>
                                  (item === null || item === void 0
                                      ? void 0
                                      : item.isCreator) === true
                          )) === null || _a === void 0
                    ? void 0
                    : _a.userId;
            // Remove the creator from the notification list
            const filteredParticipants = participants.filter(
                (participant) =>
                    String(
                        participant === null || participant === void 0
                            ? void 0
                            : participant.userId
                    ) !== String(creatorId)
            );
            if (filteredParticipants.length === 0) {
                return; // No one else to notify
            }
            // Convert IDs to ObjectIds
            const notificationReceivers = filteredParticipants.map(
                (participant) =>
                    new mongoose_1.default.Types.ObjectId(
                        participant === null || participant === void 0
                            ? void 0
                            : participant.userId
                    )
            );
            // Fetch FCM tokens
            const tokens = await (0, methods_1.getFcmTokensForUserIds)(
                notificationReceivers
            );
            if (
                (tokens === null || tokens === void 0
                    ? void 0
                    : tokens.length) > 0
            ) {
                await (0, methods_1.sendPushNotifications)(
                    tokens,
                    'Evolo AI Notification',
                    `${creatorName} has added you to the "${groupName}"`,
                    false,
                    types_1.NotificationsTypes.Chat
                );
            }
        }
    } catch (e) {
        console.error('Error sending FCM message:', e);
    }
};
exports.sendPushNotificationForGroupCreation =
    sendPushNotificationForGroupCreation;
const createGroupChat = async (req) => {
    try {
        const { groupName, participants, type, creatorName } = req.body;
        const { id } = req.user;
        if (!groupName || !participants || !type)
            return {
                success: false,
                statusCode: 400,
                message: 'Invalid Payload',
            };
        const chat = await (0, db_chat_1.addGroupChat)(req.body);
        (0, exports.sendPushNotificationForGroupCreation)(
            groupName,
            participants,
            creatorName
        );
        return {
            success: true,
            statusCode: 200,
            message: 'Group Created',
            chat,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
        };
    }
};
exports.createGroupChat = createGroupChat;
const exitChatGroup = async (req) => {
    try {
        const { userId, groupId, userName } = req.body;
        if (!userId || !groupId || !userName)
            return {
                success: false,
                statusCode: 400,
                message: 'Invalid Payload',
            };
        const data = await (0, db_chat_1.removeUserFromChatGroup)(req.body);
        return {
            success: true,
            statusCode: 200,
            message: 'Group Left',
            data,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
        };
    }
};
exports.exitChatGroup = exitChatGroup;
const getUserChatsByChatType = async (req) => {
    var _a, _b, _c, _d, _e;
    try {
        const userId =
            (_a = req === null || req === void 0 ? void 0 : req.user) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const page =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.page
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10; // Pagination: number of records per page
        const search =
            (_d = req === null || req === void 0 ? void 0 : req.query) ===
                null || _d === void 0
                ? void 0
                : _d.search;
        const chatType =
            (_e = req === null || req === void 0 ? void 0 : req.query) ===
                null || _e === void 0
                ? void 0
                : _e.type;
        if (!userId || !chatType) {
            return {
                success: false,
                statusCode: 404,
                message: !userId
                    ? 'UserId not provided'
                    : 'ChatType not provided',
            };
        }
        const chats = await (0, db_chat_1.findUserChatsByChatType)(
            userId,
            page,
            limit,
            chatType,
            search
        );
        if (chats) {
            return {
                chats: chats,
                message: 'Chats Retrived Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: true,
                statusCode: 200,
                message: 'Chats not found',
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
exports.getUserChatsByChatType = getUserChatsByChatType;
const getInstitueAndStudentChats = async (req) => {
    var _a, _b, _c, _d;
    try {
        const userId =
            (_a = req === null || req === void 0 ? void 0 : req.user) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const page =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.page
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10; // Pagination: number of records per page
        const search =
            (_d = req === null || req === void 0 ? void 0 : req.query) ===
                null || _d === void 0
                ? void 0
                : _d.search;
        if (!userId) {
            return {
                success: false,
                statusCode: 404,
                message: 'UserId not provided',
            };
        }
        const chats = await (0, db_chat_1.findInstituteAndStudentChats)(
            userId,
            page,
            limit,
            search
        );
        if (chats) {
            return {
                chats: chats,
                message: 'Chats Retrived Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: true,
                statusCode: 200,
                message: 'Chats not found',
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
exports.getInstitueAndStudentChats = getInstitueAndStudentChats;
const getStudentEmployerChats = async (req) => {
    var _a, _b, _c, _d, _e;
    try {
        const userId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const jobId =
            (_b = req === null || req === void 0 ? void 0 : req.query) ===
                null || _b === void 0
                ? void 0
                : _b.jobId;
        const page =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.page
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_d = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _d === void 0
                    ? void 0
                    : _d.limit
            ) || 10; // Pagination: number of records per page
        const search =
            (_e = req === null || req === void 0 ? void 0 : req.query) ===
                null || _e === void 0
                ? void 0
                : _e.search;
        if (!userId) {
            return {
                success: false,
                statusCode: 404,
                message: 'UserId not provided',
            };
        }
        const chats = await (0, db_chat_1.findStudentEmployerChats)(
            userId,
            jobId,
            page,
            limit,
            search
        );
        if (chats) {
            return {
                chats: chats,
                message: 'Chats Retrived Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: true,
                statusCode: 200,
                message: 'Chats not found',
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
exports.getStudentEmployerChats = getStudentEmployerChats;
const getMultipleUsersChats = async (req) => {
    var _a, _b, _c, _d;
    try {
        const userIds =
            (_a = req === null || req === void 0 ? void 0 : req.body) ===
                null || _a === void 0
                ? void 0
                : _a.userIds; //multiple userids
        const page =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.page
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10; // Pagination: number of records per page
        const search =
            (_d = req === null || req === void 0 ? void 0 : req.query) ===
                null || _d === void 0
                ? void 0
                : _d.search;
        if (!userIds) {
            return {
                success: false,
                statusCode: 404,
                message: 'UserIds not provided',
            };
        }
        const chats = await (0, db_chat_1.findMultipleUsersChats)(
            userIds,
            page,
            limit,
            search
        );
        if (chats) {
            return {
                chats: chats,
                message: 'Chats Retrived Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: true,
                statusCode: 200,
                message: 'Chats not found',
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
exports.getMultipleUsersChats = getMultipleUsersChats;
const createChat = async (req) => {
    var _a;
    try {
        const chatData =
            (_a = req === null || req === void 0 ? void 0 : req.body) ===
                null || _a === void 0
                ? void 0
                : _a.chatData;
        const chat = await (0, db_chat_1.startChat)(chatData);
        if (chat) {
            return {
                chat: chat,
                message: 'Chat Created Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 400,
                message: 'Error Creating Chat',
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
exports.createChat = createChat;
const getUsersNotifiedForChatCompletion = async (req) => {
    var _a, _b, _c, _d, _e, _f;
    try {
        const page =
            parseInt(
                (_a = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _a === void 0
                    ? void 0
                    : _a.page
            ) || 1;
        const limit =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.limit
            ) || 10;
        const startDate = (
            (_c = req === null || req === void 0 ? void 0 : req.query) ===
                null || _c === void 0
                ? void 0
                : _c.startDate
        )
            ? new Date(
                  (_d = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _d === void 0
                      ? void 0
                      : _d.startDate
              )
            : undefined;
        const endDate = (
            (_e = req === null || req === void 0 ? void 0 : req.query) ===
                null || _e === void 0
                ? void 0
                : _e.endDate
        )
            ? new Date(
                  (_f = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _f === void 0
                      ? void 0
                      : _f.endDate
              )
            : undefined;
        const { chats, totalChats, totalPages, currentPage } = await (0,
        db_chat_1.findUsersNotifiedForChatCompletion)(
            page,
            limit,
            startDate,
            endDate
        );
        if (!chats.length) {
            return {
                success: false,
                statusCode: 200,
                message: 'No users found',
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Users retrieved successfully',
            chats,
            totalChats,
            totalPages,
            currentPage,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message,
        };
    }
};
exports.getUsersNotifiedForChatCompletion = getUsersNotifiedForChatCompletion;
const createChatAndSendMessage = async (req) => {
    try {
        const chatData = req.body.chatData;
        const messageData = req.body.messageData;
        const { chat, newMessage } = await (0, db_chat_1.startChatAndMessage)(
            chatData,
            messageData
        );
        if (chat && newMessage) {
            return {
                chat: chat,
                newMessage: newMessage,
                message: 'Chat Created Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 400,
                message: 'Error Creating Chat',
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
exports.createChatAndSendMessage = createChatAndSendMessage;
const updateChat = async (req) => {
    var _a, _b;
    try {
        const chatData =
            (_a = req === null || req === void 0 ? void 0 : req.body) ===
                null || _a === void 0
                ? void 0
                : _a.chatData;
        const id =
            (_b = req === null || req === void 0 ? void 0 : req.query) ===
                null || _b === void 0
                ? void 0
                : _b.id;
        if (!id) {
            return {
                success: false,
                statusCode: 404,
                message: 'Chat id not provided',
            };
        }
        const chat = await (0, db_chat_1.findChatByIdAndUpdate)(id, chatData);
        if (chat) {
            return {
                chat: chat,
                message: 'Chat Updated Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 400,
                message: 'Error Updating Chat',
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
exports.updateChat = updateChat;
//# sourceMappingURL=chat.services.js.map
