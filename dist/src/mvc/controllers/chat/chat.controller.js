'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getNotifiedForChatCompletion =
    exports.getInstitueAndStudentChatsController =
    exports.getChatWithParticipantIdsController =
    exports.getTeacherProgramChatController =
    exports.getTeacherStudentChatController =
    exports.getEmployerChatController =
    exports.inititateChatAndMessageController =
    exports.getUserChatsByChatTypeController =
    exports.updateChatController =
    exports.getStudentEmployerChatController =
    exports.createChatController =
    exports.getMultipleUsersChatsController =
    exports.getUserChatsController =
    exports.getAllChatsController =
        void 0;
const chat_1 = require('../../services/chat');
const chat_services_1 = require('../../services/chat/chat.services');
const getTeacherProgramChatController = async (req, res) => {
    try {
        const result = await (0, chat_1.getTeacherProgramChat)(req);
        if (result.success) {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    chats:
                        result === null || result === void 0
                            ? void 0
                            : result.chats,
                });
        } else {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    message:
                        result === null || result === void 0
                            ? void 0
                            : result.message,
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.getTeacherProgramChatController = getTeacherProgramChatController;
const getTeacherStudentChatController = async (req, res) => {
    try {
        const result = await (0, chat_1.getTeacherStudentChat)(req);
        if (result.success) {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    chats:
                        result === null || result === void 0
                            ? void 0
                            : result.chats,
                });
        } else {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    message:
                        result === null || result === void 0
                            ? void 0
                            : result.message,
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.getTeacherStudentChatController = getTeacherStudentChatController;
const getAllChatsController = async (req, res) => {
    try {
        const result = await (0, chat_1.getAllChats)(req);
        if (result.success) {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    chats:
                        result === null || result === void 0
                            ? void 0
                            : result.chats,
                });
        } else {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    message:
                        result === null || result === void 0
                            ? void 0
                            : result.message,
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.getAllChatsController = getAllChatsController;
const getUserChatsController = async (req, res) => {
    try {
        const result = await (0, chat_1.getUserChats)(req);
        if (result.success) {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    chats:
                        result === null || result === void 0
                            ? void 0
                            : result.chats,
                });
        } else {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    message:
                        result === null || result === void 0
                            ? void 0
                            : result.message,
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.getUserChatsController = getUserChatsController;
const getEmployerChatController = async (req, res) => {
    try {
        const result = await (0, chat_1.getEmployerChats)(req);
        if (result.success) {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    chats:
                        result === null || result === void 0
                            ? void 0
                            : result.chats,
                });
        } else {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    message:
                        result === null || result === void 0
                            ? void 0
                            : result.message,
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.getEmployerChatController = getEmployerChatController;
const getUserChatsByChatTypeController = async (req, res) => {
    try {
        const result = await (0, chat_1.getUserChatsByChatType)(req);
        if (result.success) {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    chats:
                        result === null || result === void 0
                            ? void 0
                            : result.chats,
                });
        } else {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    message:
                        result === null || result === void 0
                            ? void 0
                            : result.message,
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.getUserChatsByChatTypeController = getUserChatsByChatTypeController;
const getInstitueAndStudentChatsController = async (req, res) => {
    try {
        const result = await (0, chat_1.getInstitueAndStudentChats)(req);
        if (result.success) {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    chats:
                        result === null || result === void 0
                            ? void 0
                            : result.chats,
                });
        } else {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    message:
                        result === null || result === void 0
                            ? void 0
                            : result.message,
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.getInstitueAndStudentChatsController =
    getInstitueAndStudentChatsController;
const getStudentEmployerChatController = async (req, res) => {
    try {
        const result = await (0, chat_1.getStudentEmployerChats)(req);
        if (result.success) {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    chats:
                        result === null || result === void 0
                            ? void 0
                            : result.chats,
                });
        } else {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    message:
                        result === null || result === void 0
                            ? void 0
                            : result.message,
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.getStudentEmployerChatController = getStudentEmployerChatController;
const getMultipleUsersChatsController = async (req, res) => {
    try {
        const result = await (0, chat_1.getMultipleUsersChats)(req);
        if (result.success) {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    chats:
                        result === null || result === void 0
                            ? void 0
                            : result.chats,
                });
        } else {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    message:
                        result === null || result === void 0
                            ? void 0
                            : result.message,
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.getMultipleUsersChatsController = getMultipleUsersChatsController;
const inititateChatAndMessageController = async (req, res) => {
    try {
        const result = await (0, chat_1.createChatAndSendMessage)(req);
        if (result.success) {
            return res.status(result.statusCode).json({
                success: result.success,
                chat: result.chat,
                message: result.newMessage,
            });
        } else {
            return res.status(result.statusCode).json({
                success: result.success,
                message: result.message,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.inititateChatAndMessageController = inititateChatAndMessageController;
const createChatController = async (req, res) => {
    try {
        const result = await (0, chat_1.createChat)(req);
        if (result.success) {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    chat:
                        result === null || result === void 0
                            ? void 0
                            : result.chat,
                });
        } else {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    message:
                        result === null || result === void 0
                            ? void 0
                            : result.message,
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.createChatController = createChatController;
const getNotifiedForChatCompletion = async (req, res) => {
    try {
        const result = await (0,
        chat_services_1.getUsersNotifiedForChatCompletion)(req);
        if (result.success) {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    chats:
                        result === null || result === void 0
                            ? void 0
                            : result.chats,
                    totalChats:
                        result === null || result === void 0
                            ? void 0
                            : result.totalChats,
                    totalPages:
                        result === null || result === void 0
                            ? void 0
                            : result.totalPages,
                    currentPage:
                        result === null || result === void 0
                            ? void 0
                            : result.currentPage,
                });
        } else {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    message:
                        result === null || result === void 0
                            ? void 0
                            : result.message,
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.getNotifiedForChatCompletion = getNotifiedForChatCompletion;
const updateChatController = async (req, res) => {
    try {
        const result = await (0, chat_1.updateChat)(req);
        if (result.success) {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    chat:
                        result === null || result === void 0
                            ? void 0
                            : result.chat,
                });
        } else {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    message:
                        result === null || result === void 0
                            ? void 0
                            : result.message,
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.updateChatController = updateChatController;
const getChatWithParticipantIdsController = async (req, res) => {
    try {
        const result = await (0, chat_1.getChatWithParticipantIds)(req);
        if (result.success) {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    chat:
                        result === null || result === void 0
                            ? void 0
                            : result.chat,
                });
        } else {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    message:
                        result === null || result === void 0
                            ? void 0
                            : result.message,
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.getChatWithParticipantIdsController =
    getChatWithParticipantIdsController;
//# sourceMappingURL=chat.controller.js.map
