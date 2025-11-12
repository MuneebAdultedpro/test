'use strict';
var _a, _b;
Object.defineProperty(exports, '__esModule', { value: true });
exports.sendPushNotifications =
    exports.postFcmToken =
    exports.firebaseDB =
    exports.verifyFirebaseToken =
        void 0;
const tslib_1 = require('tslib');
const firebase_admin_1 = tslib_1.__importDefault(require('firebase-admin'));
const db_user_1 = require('../mvc/database/db.user');
const fs = require('fs');
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(
        JSON.parse(
            (_a =
                process === null || process === void 0
                    ? void 0
                    : process.env) === null || _a === void 0
                ? void 0
                : _a.FIREBASE_SERVICE_ACCOUNT
        )
    ),
    databaseURL:
        (_b = process === null || process === void 0 ? void 0 : process.env) ===
            null || _b === void 0
            ? void 0
            : _b.FIREBASE_DATABASE_URL,
});
const verifyFirebaseToken = async (req, res, next) => {
    var _a, _b, _c;
    let token;
    if (
        (_a = req === null || req === void 0 ? void 0 : req.body) === null ||
        _a === void 0
            ? void 0
            : _a.token
    ) {
        token =
            (_b = req === null || req === void 0 ? void 0 : req.body) ===
                null || _b === void 0
                ? void 0
                : _b.token;
    }
    if (!token) {
        return res
            .status(401)
            .json({ message: 'Unauthorized: No token provided' });
    }
    try {
        const decodedToken = await ((_c =
            firebase_admin_1.default === null ||
            firebase_admin_1.default === void 0
                ? void 0
                : firebase_admin_1.default.auth()) === null || _c === void 0
            ? void 0
            : _c.verifyIdToken(token));
        req.user = decodedToken; // Attach the decoded token to the request object
        next(); // Proceed to the next middleware or controller
    } catch (error) {
        return res.status(403).json({ message: 'Unauthorized: Invalid token' });
    }
};
exports.verifyFirebaseToken = verifyFirebaseToken;
exports.firebaseDB = firebase_admin_1.default.firestore();
const Timestamp = firebase_admin_1.default.firestore.Timestamp;
const postFcmToken = async (req, res) => {
    const { fcm_token, userId } = req.body;
    try {
        let result;
        if (fcm_token && userId) {
            result = await (0, db_user_1.findUserByIdAndUpdate)(userId, {
                fcm_token,
            });
            if (result) {
                res.status(200).json({
                    message: 'FCM token updated successfully',
                    data: result,
                });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } else {
            res.status(403).json({ error: 'Invalid Payload' });
        }
    } catch (error) {
        console.error('Error updating FCM token:', error);
        res.status(500).json({ error: error.message });
    }
};
exports.postFcmToken = postFcmToken;
const sendPushNotifications = async (
    tokens,
    title,
    message,
    truncate = true,
    type,
    extreData = {}
) => {
    var _a, _b, _c;
    if ((tokens === null || tokens === void 0 ? void 0 : tokens.length) > 0) {
        const notificationText = (
            message === null || message === void 0 ? void 0 : message.content
        )
            ? ((_a =
                  message === null || message === void 0
                      ? void 0
                      : message.content) === null || _a === void 0
                  ? void 0
                  : _a.length) <= 100 && truncate
                ? message === null || message === void 0
                    ? void 0
                    : message.content
                : ((_c =
                      (_b =
                          message === null || message === void 0
                              ? void 0
                              : message.content) === null || _b === void 0
                          ? void 0
                          : _b.substring) === null || _c === void 0
                      ? void 0
                      : _c.call(_b, 0, 97)) + '...'
            : '';
        if (
            (notificationText === null || notificationText === void 0
                ? void 0
                : notificationText.length) > 0
        ) {
            const payload = {
                notification: {
                    title: title,
                    body: notificationText,
                },
                data: Object.assign(
                    { type: type, body: notificationText },
                    extreData
                ),
                tokens: tokens,
            };
            firebase_admin_1.default
                .messaging()
                .sendEachForMulticast(payload)
                .then((response) => {
                    console.log(`Success count: ${response.successCount}`);
                    console.log(`Failure count: ${response.failureCount}`);
                    response.responses.forEach((res, index) => {
                        if (!res.success) {
                            console.error(
                                `Error for token ${payload.tokens[index]}:`,
                                res.error.message
                            );
                        }
                    });
                })
                .catch((error) =>
                    console.error('Error sending multicast:', error)
                );
        }
    }
};
exports.sendPushNotifications = sendPushNotifications;
//# sourceMappingURL=firebase.methods.js.map
