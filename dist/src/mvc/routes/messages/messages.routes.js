'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const index_1 = require('../../controllers/index');
const routes_strings_1 = require('../routes-strings');
const auth_1 = tslib_1.__importDefault(require('../../middlewares/auth'));
const router = express_1.default.Router();
router.get(
    routes_strings_1.messagesRoutes === null ||
        routes_strings_1.messagesRoutes === void 0
        ? void 0
        : routes_strings_1.messagesRoutes.chatMessages,
    auth_1.default,
    index_1.messageController === null || index_1.messageController === void 0
        ? void 0
        : index_1.messageController.getChatMessagesController
);
router.post(
    routes_strings_1.messagesRoutes === null ||
        routes_strings_1.messagesRoutes === void 0
        ? void 0
        : routes_strings_1.messagesRoutes.sendMessage,
    auth_1.default,
    index_1.messageController === null || index_1.messageController === void 0
        ? void 0
        : index_1.messageController.sendMessageController
);
exports.default = router;
//# sourceMappingURL=messages.routes.js.map
