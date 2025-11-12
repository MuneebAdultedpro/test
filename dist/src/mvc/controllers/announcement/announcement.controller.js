'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getStudentAnnouncementsController =
    exports.updateAnnouncementController =
    exports.createAnnouncementController =
    exports.getAnnouncementByIdController =
    exports.instituteAnnouncementsController =
    exports.allAnnouncementsController =
        void 0;
const announcement_1 = require('../../services/announcement');
const allAnnouncementsController = async (req, res) => {
    try {
        const result = await (0, announcement_1.getAnnouncementsList)(req);
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
                    announcements:
                        result === null || result === void 0
                            ? void 0
                            : result.announcements,
                    totalAnnouncements:
                        result === null || result === void 0
                            ? void 0
                            : result.totalAnnouncements,
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
exports.allAnnouncementsController = allAnnouncementsController;
const instituteAnnouncementsController = async (req, res) => {
    try {
        const result = await (0, announcement_1.getInstituteAnnouncementsList)(
            req
        );
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
                    announcements:
                        result === null || result === void 0
                            ? void 0
                            : result.announcements,
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
exports.instituteAnnouncementsController = instituteAnnouncementsController;
const getStudentAnnouncementsController = async (req, res) => {
    try {
        const result = await (0, announcement_1.getStudentAnnouncementsList)(
            req
        );
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
                    announcements:
                        result === null || result === void 0
                            ? void 0
                            : result.announcements,
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
exports.getStudentAnnouncementsController = getStudentAnnouncementsController;
const getAnnouncementByIdController = async (req, res) => {
    try {
        const result = await (0, announcement_1.getAnnouncementById)(req);
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
                    announcement:
                        result === null || result === void 0
                            ? void 0
                            : result.announcement,
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
exports.getAnnouncementByIdController = getAnnouncementByIdController;
const createAnnouncementController = async (req, res) => {
    try {
        const result = await (0, announcement_1.createAnnouncement)(req);
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
                    announcement:
                        result === null || result === void 0
                            ? void 0
                            : result.announcement,
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
exports.createAnnouncementController = createAnnouncementController;
const updateAnnouncementController = async (req, res) => {
    try {
        const result = await (0, announcement_1.updateAnnouncement)(req);
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
                    announcement:
                        result === null || result === void 0
                            ? void 0
                            : result.announcement,
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
exports.updateAnnouncementController = updateAnnouncementController;
//# sourceMappingURL=announcement.controller.js.map
