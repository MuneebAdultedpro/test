'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getStudentAnnouncementsList =
    exports.updateAnnouncement =
    exports.createAnnouncement =
    exports.getAnnouncementById =
    exports.getInstituteAnnouncementsList =
    exports.getAnnouncementsList =
        void 0;
const db_announcement_1 = require('../../database/db.announcement');
const types_1 = require('../../../interfaces/types');
const methods_1 = require('../../../methods');
const getAnnouncementsList = async (req) => {
    var _a, _b, _c;
    try {
        const page =
            parseInt(
                (_a = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _a === void 0
                    ? void 0
                    : _a.page
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.limit
            ) || 10;
        const search =
            (_c = req === null || req === void 0 ? void 0 : req.query) ===
                null || _c === void 0
                ? void 0
                : _c.search;
        const { announcements, totalAnnouncements, totalPages, currentPage } =
            await (0, db_announcement_1.fetchAllAnnouncements)(
                search,
                limit,
                page
            );
        return {
            success: true,
            statusCode: 200,
            message: 'Announcements retrieved successfully',
            announcements,
            totalAnnouncements,
            totalPages,
            currentPage,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getAnnouncementsList = getAnnouncementsList;
const getInstituteAnnouncementsList = async (req) => {
    var _a;
    try {
        const instituteId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.institute_id;
        const announcements = await (0,
        db_announcement_1.fetchInstitueAnnouncements)(instituteId);
        return {
            success: true,
            statusCode: 200,
            message: 'Announcements retrieved successfully',
            announcements,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getInstituteAnnouncementsList = getInstituteAnnouncementsList;
const getStudentAnnouncementsList = async (req) => {
    var _a, _b;
    try {
        const instituteId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.institute_id;
        const userId =
            (_b = req === null || req === void 0 ? void 0 : req.user) ===
                null || _b === void 0
                ? void 0
                : _b.id;
        const announcements = await (0,
        db_announcement_1.fetchStudentAnnouncements)(instituteId, userId);
        return {
            success: true,
            statusCode: 200,
            message: 'Announcements retrieved successfully',
            announcements,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getStudentAnnouncementsList = getStudentAnnouncementsList;
const getAnnouncementById = async (req) => {
    var _a;
    try {
        const announcementId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const announcement = await (0, db_announcement_1.fetchAnnouncementById)(
            announcementId
        );
        return {
            success: true,
            statusCode: 200,
            message: 'Announcement retrieved successfully',
            announcement,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getAnnouncementById = getAnnouncementById;
const createAnnouncement = async (req) => {
    var _a, _b, _c, _d, _e;
    try {
        const announcement = await (0, db_announcement_1.createNewAnnouncement)(
            req === null || req === void 0 ? void 0 : req.body
        );
        // handle push notifications
        if (
            ((_a = req === null || req === void 0 ? void 0 : req.body) ===
                null || _a === void 0
                ? void 0
                : _a.type) !== types_1.AnnouncementTypes.Notification &&
            ((_b = req === null || req === void 0 ? void 0 : req.body) ===
                null || _b === void 0
                ? void 0
                : _b.type) !== types_1.AnnouncementTypes.EmailAndNotification
        ) {
        } else {
            if (
                ((_d =
                    (_c =
                        req === null || req === void 0 ? void 0 : req.body) ===
                        null || _c === void 0
                        ? void 0
                        : _c.toIds) === null || _d === void 0
                    ? void 0
                    : _d.length) > 0
            ) {
                (0, methods_1.getFcmTokensForUserIds)(
                    (_e =
                        req === null || req === void 0 ? void 0 : req.body) ===
                        null || _e === void 0
                        ? void 0
                        : _e.toIds
                )
                    .then((tokens) => {
                        var _a, _b;
                        (0, methods_1.sendPushNotifications)(
                            tokens,
                            (_a =
                                req === null || req === void 0
                                    ? void 0
                                    : req.body) === null || _a === void 0
                                ? void 0
                                : _a.title,
                            (_b =
                                req === null || req === void 0
                                    ? void 0
                                    : req.body) === null || _b === void 0
                                ? void 0
                                : _b.description,
                            false,
                            types_1.NotificationsTypes.Announcement
                        );
                    })
                    .catch((fcmErrors) => console.log(fcmErrors));
            }
        }
        if (announcement) {
            return {
                announcement: announcement,
                message: 'New Announcement created Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 403,
                message: 'Error Creating Announcement',
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
exports.createAnnouncement = createAnnouncement;
const updateAnnouncement = async (req) => {
    var _a;
    try {
        const announcementId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const updateAnnouncement = await (0,
        db_announcement_1.findAnnouncementByIdAndUpdate)(
            announcementId,
            req.body
        );
        if (updateAnnouncement) {
            return {
                announcement: updateAnnouncement,
                message: 'Announcement Updated Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 403,
                message: 'Error getting Announcement',
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
exports.updateAnnouncement = updateAnnouncement;
//# sourceMappingURL=announcement-services.js.map
