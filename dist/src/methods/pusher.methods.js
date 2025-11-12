'use strict';
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, '__esModule', { value: true });
exports.realTimeEventForChatMessage = void 0;
const tslib_1 = require('tslib');
const pusher_1 = tslib_1.__importDefault(require('pusher'));
const types_1 = require('../interfaces/types');
const pusherClient = new pusher_1.default({
    appId:
        (_a = process === null || process === void 0 ? void 0 : process.env) ===
            null || _a === void 0
            ? void 0
            : _a.PUSHER_APP_ID,
    key:
        (_b = process === null || process === void 0 ? void 0 : process.env) ===
            null || _b === void 0
            ? void 0
            : _b.PUSHER_KEY,
    secret:
        (_c = process === null || process === void 0 ? void 0 : process.env) ===
            null || _c === void 0
            ? void 0
            : _c.PUSHER_SECRET,
    cluster:
        (_d = process === null || process === void 0 ? void 0 : process.env) ===
            null || _d === void 0
            ? void 0
            : _d.PUSHER_CLUSTER,
    encryptionMasterKeyBase64:
        (_e = process === null || process === void 0 ? void 0 : process.env) ===
            null || _e === void 0
            ? void 0
            : _e.PUSHER_MASKTER_ENCRYPTION_KEY,
    useTLS: true, // Enables HTTPS communication
});
const realTimeEventForChatMessage = async (
    inCommingChat,
    message,
    isNewChat
) => {
    var _a, _b, _c, _d, _e, _f;
    try {
        const unmodifiedChat =
            (inCommingChat === null || inCommingChat === void 0
                ? void 0
                : inCommingChat._doc) || inCommingChat;
        // in bot case we dont have any sendId so generate a unique id
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
            (unmodifiedChat === null || unmodifiedChat === void 0
                ? void 0
                : unmodifiedChat.participants)
        ) {
            const notificationReceivers =
                (_e =
                    (_d =
                        (_c =
                            (_b =
                                unmodifiedChat === null ||
                                unmodifiedChat === void 0
                                    ? void 0
                                    : unmodifiedChat.participants) === null ||
                            _b === void 0
                                ? void 0
                                : _b.filter) === null || _c === void 0
                            ? void 0
                            : _c.call(_b, (participant) => {
                                  var _a, _b, _c, _d;
                                  return (
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
                                          : _d.call(senderId))
                                  );
                              })) === null || _d === void 0
                        ? void 0
                        : _d.map) === null || _e === void 0
                    ? void 0
                    : _e.call(_d, (participant) => {
                          var _a, _b, _c;
                          return (_c =
                              (_b =
                                  (_a =
                                      participant === null ||
                                      participant === void 0
                                          ? void 0
                                          : participant.userId) === null ||
                                  _a === void 0
                                      ? void 0
                                      : _a._id) === null || _b === void 0
                                  ? void 0
                                  : _b.toString) === null || _c === void 0
                              ? void 0
                              : _c.call(_b);
                      });
            (_f =
                notificationReceivers === null ||
                notificationReceivers === void 0
                    ? void 0
                    : notificationReceivers.forEach) === null || _f === void 0
                ? void 0
                : _f.call(notificationReceivers, async (userId) => {
                      var _a, _b;
                      if (userId) {
                          const chat = Object.assign(
                              Object.assign({}, unmodifiedChat),
                              {
                                  participants:
                                      (_b =
                                          (_a =
                                              unmodifiedChat === null ||
                                              unmodifiedChat === void 0
                                                  ? void 0
                                                  : unmodifiedChat.participants) ===
                                              null || _a === void 0
                                              ? void 0
                                              : _a.map) === null ||
                                      _b === void 0
                                          ? void 0
                                          : _b.call(_a, (participant) => {
                                                const {
                                                    name,
                                                    email,
                                                    role,
                                                    photo_url,
                                                    id,
                                                    _id,
                                                } =
                                                    (participant === null ||
                                                    participant === void 0
                                                        ? void 0
                                                        : participant.userId) ||
                                                    {};
                                                return {
                                                    name,
                                                    email,
                                                    role,
                                                    photo_url,
                                                    id,
                                                    _id,
                                                };
                                            }),
                              }
                          );
                          pusherClient
                              .trigger(
                                  userId,
                                  types_1.PusherEvents.NewMessage,
                                  {
                                      chat,
                                      message,
                                      isNewChat,
                                  }
                              )
                              .then((res) => console.log('pusher res', res))
                              .catch((err) =>
                                  console.log('error from pusher', err)
                              );
                      }
                  });
        }
    } catch (e) {
        console.error('Error sending pusher event on message:', e);
    }
};
exports.realTimeEventForChatMessage = realTimeEventForChatMessage;
exports.default = pusherClient;
//# sourceMappingURL=pusher.methods.js.map
