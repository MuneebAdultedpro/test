'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const index_1 = require('../../controllers/index');
const routes_strings_1 = require('../routes-strings');
const auth_1 = tslib_1.__importDefault(require('../../middlewares/auth'));
const router = express_1.default.Router();
router.get(
    routes_strings_1.chatsRoutes === null ||
        routes_strings_1.chatsRoutes === void 0
        ? void 0
        : routes_strings_1.chatsRoutes.chats,
    auth_1.default,
    index_1.chatController === null || index_1.chatController === void 0
        ? void 0
        : index_1.chatController.getAllChatsController
);
router.get(
    routes_strings_1.chatsRoutes === null ||
        routes_strings_1.chatsRoutes === void 0
        ? void 0
        : routes_strings_1.chatsRoutes.userChat,
    auth_1.default,
    index_1.chatController === null || index_1.chatController === void 0
        ? void 0
        : index_1.chatController.getUserChatsController
);
router.get(
    routes_strings_1.chatsRoutes === null ||
        routes_strings_1.chatsRoutes === void 0
        ? void 0
        : routes_strings_1.chatsRoutes.teacherStudentChat,
    auth_1.default,
    index_1.chatController === null || index_1.chatController === void 0
        ? void 0
        : index_1.chatController.getTeacherStudentChatController
);
router.get(
    routes_strings_1.chatsRoutes === null ||
        routes_strings_1.chatsRoutes === void 0
        ? void 0
        : routes_strings_1.chatsRoutes.teacherProgramChat,
    auth_1.default,
    index_1.chatController === null || index_1.chatController === void 0
        ? void 0
        : index_1.chatController.getTeacherProgramChatController
);
router.get(
    routes_strings_1.chatsRoutes.notifiedUsersForChatCompletion,
    auth_1.default,
    index_1.chatController.getNotifiedForChatCompletion
);
router.get(
    routes_strings_1.chatsRoutes === null ||
        routes_strings_1.chatsRoutes === void 0
        ? void 0
        : routes_strings_1.chatsRoutes.employerChat,
    auth_1.default,
    index_1.chatController === null || index_1.chatController === void 0
        ? void 0
        : index_1.chatController.getEmployerChatController
);
router.get(
    routes_strings_1.chatsRoutes === null ||
        routes_strings_1.chatsRoutes === void 0
        ? void 0
        : routes_strings_1.chatsRoutes.peerToPeerChats,
    auth_1.default,
    index_1.chatController === null || index_1.chatController === void 0
        ? void 0
        : index_1.chatController.getUserChatsByChatTypeController
);
router.get(
    routes_strings_1.chatsRoutes === null ||
        routes_strings_1.chatsRoutes === void 0
        ? void 0
        : routes_strings_1.chatsRoutes.institueAndStudentChats,
    auth_1.default,
    index_1.chatController === null || index_1.chatController === void 0
        ? void 0
        : index_1.chatController.getInstitueAndStudentChatsController
);
router.get(
    routes_strings_1.chatsRoutes === null ||
        routes_strings_1.chatsRoutes === void 0
        ? void 0
        : routes_strings_1.chatsRoutes.studentEmployerChat,
    auth_1.default,
    index_1.chatController === null || index_1.chatController === void 0
        ? void 0
        : index_1.chatController.getStudentEmployerChatController
);
router.post(
    routes_strings_1.chatsRoutes === null ||
        routes_strings_1.chatsRoutes === void 0
        ? void 0
        : routes_strings_1.chatsRoutes.usersChats,
    auth_1.default,
    index_1.chatController === null || index_1.chatController === void 0
        ? void 0
        : index_1.chatController.getMultipleUsersChatsController
);
router.post(
    routes_strings_1.chatsRoutes.inititateChatAndMessage,
    auth_1.default,
    index_1.chatController === null || index_1.chatController === void 0
        ? void 0
        : index_1.chatController.inititateChatAndMessageController
);
router.post(
    routes_strings_1.chatsRoutes.createChat,
    auth_1.default,
    index_1.chatController === null || index_1.chatController === void 0
        ? void 0
        : index_1.chatController.createChatController
);
router.patch(
    routes_strings_1.chatsRoutes.updateChat,
    auth_1.default,
    index_1.chatController === null || index_1.chatController === void 0
        ? void 0
        : index_1.chatController.updateChatController
);
router.get(
    routes_strings_1.chatsRoutes === null ||
        routes_strings_1.chatsRoutes === void 0
        ? void 0
        : routes_strings_1.chatsRoutes.chatWithParticipantIds,
    auth_1.default,
    index_1.chatController === null || index_1.chatController === void 0
        ? void 0
        : index_1.chatController.getChatWithParticipantIdsController
);
exports.default = router;
//# sourceMappingURL=chats.routes.js.map
