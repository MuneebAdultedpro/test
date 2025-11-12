'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.notifyIncompleteProfilesCron = void 0;
const models_1 = require('../../mvc/models');
const methods_1 = require('../../methods');
const types_1 = require('../../interfaces/types');
const cron = require('node-cron');
const notifyIncompleteProfilesCron = () => {
    // Run daily at 9 AM Calefornia timezone
    cron.schedule('0 16 * * *', async () => {
        try {
            const today = new Date();
            const users = await models_1.User.find({
                $or: [
                    { profile_completion_percentage: { $lt: 100 } },
                    { profile_completion_percentage: { $exists: false } },
                ],
                role: { $in: [types_1.Role.Student, types_1.Role.jobSeeker] },
                fcm_token: { $exists: true, $ne: '' },
            });
            if (
                !users ||
                (users === null || users === void 0 ? void 0 : users.length) ===
                    0
            )
                return;
            const tokens = [];
            for (const user of users) {
                const daysSinceSignup = getDaysBetween(
                    user === null || user === void 0 ? void 0 : user.createdAt,
                    today
                );
                const daysSinceLastNotification = (
                    user === null || user === void 0
                        ? void 0
                        : user.last_notified_for_profile_completion_at
                )
                    ? getDaysBetween === null || getDaysBetween === void 0
                        ? void 0
                        : getDaysBetween(
                              user === null || user === void 0
                                  ? void 0
                                  : user.last_notified_for_profile_completion_at,
                              today
                          )
                    : null;
                const shouldNotify =
                    (daysSinceSignup >= 3 &&
                        !(user === null || user === void 0
                            ? void 0
                            : user.last_notified_for_profile_completion_at)) ||
                    (daysSinceLastNotification !== null &&
                        daysSinceLastNotification >= 30);
                if (shouldNotify) {
                    tokens.push(
                        user === null || user === void 0
                            ? void 0
                            : user.fcm_token
                    );
                    user.last_notified_for_profile_completion_at = today;
                    await user.save();
                }
            }
            if (tokens.length > 0) {
                const title = 'Complete Your Profile';
                const message = {
                    content:
                        'Just a few details left to finish your profile and get more job matches!',
                };
                await (0, methods_1.sendPushNotifications)(
                    tokens,
                    title,
                    message,
                    true,
                    types_1.NotificationsTypes.ProfileCompletion
                );
            }
        } catch (error) {
            console.error(
                'Error in notifyIncompleteProfilesCron:',
                error.message,
                error
            );
        }
    });
};
exports.notifyIncompleteProfilesCron = notifyIncompleteProfilesCron;
function getDaysBetween(date1, date2) {
    var _a, _b, _c;
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.floor(
        (((_a = date2 === null || date2 === void 0 ? void 0 : date2.getTime) ===
            null || _a === void 0
            ? void 0
            : _a.call(date2)) -
            ((_c =
                (_b = new Date(date1)) === null || _b === void 0
                    ? void 0
                    : _b.getTime) === null || _c === void 0
                ? void 0
                : _c.call(_b))) /
            msPerDay
    );
}
//# sourceMappingURL=index.js.map
