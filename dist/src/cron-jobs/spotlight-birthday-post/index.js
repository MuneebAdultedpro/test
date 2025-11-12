'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.spotifyBirthdayPostCron = void 0;
const tslib_1 = require('tslib');
const models_1 = require('../../mvc/models');
const methods_1 = require('../../methods');
const types_1 = require('../../interfaces/types');
const dayjs_1 = tslib_1.__importDefault(require('dayjs'));
const globals_1 = require('../../globals');
const spotlight_post_1 = require('../../mvc/models/spotlight-post');
const cron = require('node-cron');
const spotifyBirthdayPostCron = () => {
    // Run daily at 9 AM California timezone
    cron.schedule('0 16 * * *', async () => {
        console.log('Running spotifyBirthdayPostCron');
        try {
            const today = (0, dayjs_1.default)();
            const todayMonth = today.month() + 1;
            const todayDay = today.date();
            const users = await models_1.User.find({
                birthday: { $ne: null },
                $expr: {
                    $and: [
                        { $eq: [{ $dayOfMonth: '$birthday' }, todayDay] },
                        { $eq: [{ $month: '$birthday' }, todayMonth] },
                    ],
                },
            });
            if (
                !users ||
                (users === null || users === void 0 ? void 0 : users.length) ===
                    0
            )
                return;
            for (const user of users) {
                let consortiumId = null;
                let spotlightPostId = null;
                if (
                    user === null || user === void 0
                        ? void 0
                        : user.institute_id
                ) {
                    const institution = await models_1.Institute.findById(
                        user === null || user === void 0
                            ? void 0
                            : user.institute_id
                    );
                    consortiumId =
                        (institution === null || institution === void 0
                            ? void 0
                            : institution.consortiom_id) || null;
                }
                if (
                    user === null || user === void 0
                        ? void 0
                        : user.share_birthday_on_spotlight
                ) {
                    const spotlightPost = new models_1.SpotlightPost({
                        userId:
                            user === null || user === void 0
                                ? void 0
                                : user._id,
                        postType: spotlight_post_1.SpotlightPostType.Birthday,
                        createdBy: spotlight_post_1.AuthorType.System,
                        content: `🎉 Happy Birthday, ${
                            (user === null || user === void 0
                                ? void 0
                                : user.name) || 'Student'
                        }! Evolo AI wishes you a wonderful year ahead! 💜🎂`,
                        postMediaType: 'image',
                        media: [
                            {
                                uri: globals_1.Constants
                                    .BIRTHDAY_POST_FIREBASE_URL,
                                type: 'image',
                            },
                        ],
                        consortiumId: consortiumId,
                        postLocations: [types_1.PostLocationType.CONSORTIUM],
                    });
                    await spotlightPost.save();
                    spotlightPostId =
                        spotlightPost === null || spotlightPost === void 0
                            ? void 0
                            : spotlightPost._id.toString();
                }
                if (
                    user === null || user === void 0 ? void 0 : user.fcm_token
                ) {
                    const title = '🎉 Happy Birthday!';
                    const message = {
                        content: `Evolo AI wishes you a fantastic year ahead! 🎂`,
                    };
                    await (0, methods_1.sendPushNotifications)(
                        [
                            user === null || user === void 0
                                ? void 0
                                : user.fcm_token,
                        ],
                        title,
                        message,
                        true,
                        types_1.NotificationsTypes.Birthday,
                        {
                            postId:
                                spotlightPostId !== null &&
                                spotlightPostId !== void 0
                                    ? spotlightPostId
                                    : '',
                        }
                    );
                }
            }
        } catch (error) {
            console.error(
                'Error in spotifyBirthdayPostCron:',
                error.message,
                error
            );
        }
    });
};
exports.spotifyBirthdayPostCron = spotifyBirthdayPostCron;
//# sourceMappingURL=index.js.map
