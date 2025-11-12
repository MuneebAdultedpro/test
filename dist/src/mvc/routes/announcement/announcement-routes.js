'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const routes_strings_1 = require('../routes-strings');
const middlewares_1 = require('../../middlewares');
const announcement_1 = require('../../controllers/announcement');
const router = express_1.default.Router();
router.get(
    routes_strings_1.announcementRoutes === null ||
        routes_strings_1.announcementRoutes === void 0
        ? void 0
        : routes_strings_1.announcementRoutes.allAnnouncements,
    middlewares_1.auth,
    announcement_1.announcementController === null ||
        announcement_1.announcementController === void 0
        ? void 0
        : announcement_1.announcementController.allAnnouncementsController
);
router.get(
    routes_strings_1.announcementRoutes === null ||
        routes_strings_1.announcementRoutes === void 0
        ? void 0
        : routes_strings_1.announcementRoutes.instituteAnnouncement,
    middlewares_1.auth,
    announcement_1.announcementController === null ||
        announcement_1.announcementController === void 0
        ? void 0
        : announcement_1.announcementController.instituteAnnouncementsController
);
router.get(
    routes_strings_1.announcementRoutes === null ||
        routes_strings_1.announcementRoutes === void 0
        ? void 0
        : routes_strings_1.announcementRoutes.getStudentAnnouncements,
    middlewares_1.auth,
    announcement_1.announcementController === null ||
        announcement_1.announcementController === void 0
        ? void 0
        : announcement_1.announcementController
              .getStudentAnnouncementsController
);
router.get(
    routes_strings_1.announcementRoutes === null ||
        routes_strings_1.announcementRoutes === void 0
        ? void 0
        : routes_strings_1.announcementRoutes.announcementById,
    middlewares_1.auth,
    announcement_1.announcementController === null ||
        announcement_1.announcementController === void 0
        ? void 0
        : announcement_1.announcementController.getAnnouncementByIdController
);
router.post(
    routes_strings_1.announcementRoutes === null ||
        routes_strings_1.announcementRoutes === void 0
        ? void 0
        : routes_strings_1.announcementRoutes.createAnnouncement,
    middlewares_1.auth,
    announcement_1.announcementController === null ||
        announcement_1.announcementController === void 0
        ? void 0
        : announcement_1.announcementController.createAnnouncementController
);
router.patch(
    routes_strings_1.announcementRoutes.updateAnnouncement,
    middlewares_1.auth,
    announcement_1.announcementController.updateAnnouncementController
);
exports.default = router;
//# sourceMappingURL=announcement-routes.js.map
