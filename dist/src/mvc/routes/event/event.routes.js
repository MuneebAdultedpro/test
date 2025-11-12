'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const index_1 = require('../../controllers/index');
const routes_strings_1 = require('../routes-strings');
const auth_1 = tslib_1.__importDefault(require('../../middlewares/auth'));
const router = express_1.default.Router();
router.post(
    routes_strings_1.eventRoutes.create,
    auth_1.default,
    index_1.eventController === null || index_1.eventController === void 0
        ? void 0
        : index_1.eventController.createEventController
);
router.post(
    routes_strings_1.eventRoutes.addParticipant,
    auth_1.default,
    index_1.eventController === null || index_1.eventController === void 0
        ? void 0
        : index_1.eventController.registerEventUserController
);
router.post(
    routes_strings_1.eventRoutes.removeParticipant,
    auth_1.default,
    index_1.eventController === null || index_1.eventController === void 0
        ? void 0
        : index_1.eventController.unRegisterEventUserController
);
router.get(
    routes_strings_1.eventRoutes.get,
    auth_1.default,
    index_1.eventController === null || index_1.eventController === void 0
        ? void 0
        : index_1.eventController.getEventController
);
router.get(
    routes_strings_1.eventRoutes.getAll,
    auth_1.default,
    index_1.eventController.getEventsController
);
router.get(
    routes_strings_1.eventRoutes.getRequestedEvents,
    auth_1.default,
    index_1.eventController.getRequestedEventsController
);
router.get(
    routes_strings_1.eventRoutes.getByOrganizer,
    auth_1.default,
    index_1.eventController.getEventsByOrganizerController
);
router.get(
    routes_strings_1.eventRoutes.getByParticipant,
    auth_1.default,
    index_1.eventController.getEventsByParticipantController
);
router.delete(
    routes_strings_1.eventRoutes.delete,
    auth_1.default,
    index_1.eventController === null || index_1.eventController === void 0
        ? void 0
        : index_1.eventController.deleteEventController
);
router.delete(
    routes_strings_1.eventRoutes.deleteEventRegistration,
    auth_1.default,
    index_1.eventController === null || index_1.eventController === void 0
        ? void 0
        : index_1.eventController.deleteEventRegistrationController
);
router.patch(
    routes_strings_1.eventRoutes === null ||
        routes_strings_1.eventRoutes === void 0
        ? void 0
        : routes_strings_1.eventRoutes.update,
    auth_1.default,
    index_1.eventController === null || index_1.eventController === void 0
        ? void 0
        : index_1.eventController.updateEventController
);
router.get(
    routes_strings_1.eventRoutes === null ||
        routes_strings_1.eventRoutes === void 0
        ? void 0
        : routes_strings_1.eventRoutes.upcommingEvents,
    auth_1.default,
    index_1.eventController === null || index_1.eventController === void 0
        ? void 0
        : index_1.eventController.upcommingEventsController
);
router.get(
    routes_strings_1.eventRoutes === null ||
        routes_strings_1.eventRoutes === void 0
        ? void 0
        : routes_strings_1.eventRoutes.instituteUpcommingEvents,
    auth_1.default,
    index_1.eventController === null || index_1.eventController === void 0
        ? void 0
        : index_1.eventController.instituteUpcommingEventsController
);
router.get(
    routes_strings_1.eventRoutes === null ||
        routes_strings_1.eventRoutes === void 0
        ? void 0
        : routes_strings_1.eventRoutes.pastEvents,
    auth_1.default,
    index_1.eventController === null || index_1.eventController === void 0
        ? void 0
        : index_1.eventController.pastEventsController
);
router.get(
    routes_strings_1.eventRoutes === null ||
        routes_strings_1.eventRoutes === void 0
        ? void 0
        : routes_strings_1.eventRoutes.getEventWithStatus,
    auth_1.default,
    index_1.eventController === null || index_1.eventController === void 0
        ? void 0
        : index_1.eventController.getEventWithStatusController
);
router.get(
    routes_strings_1.eventRoutes === null ||
        routes_strings_1.eventRoutes === void 0
        ? void 0
        : routes_strings_1.eventRoutes.institutePastEvents,
    auth_1.default,
    index_1.eventController === null || index_1.eventController === void 0
        ? void 0
        : index_1.eventController.institutePastEventsController
);
router.get(
    routes_strings_1.eventRoutes === null ||
        routes_strings_1.eventRoutes === void 0
        ? void 0
        : routes_strings_1.eventRoutes.onGoingEvents,
    auth_1.default,
    index_1.eventController === null || index_1.eventController === void 0
        ? void 0
        : index_1.eventController.onGoingEventsController
);
router.get(
    routes_strings_1.eventRoutes === null ||
        routes_strings_1.eventRoutes === void 0
        ? void 0
        : routes_strings_1.eventRoutes.getEventEmployersParticipents,
    auth_1.default,
    index_1.eventController === null || index_1.eventController === void 0
        ? void 0
        : index_1.eventController.getEventEmployersParticipentsController
);
router.get(
    routes_strings_1.eventRoutes === null ||
        routes_strings_1.eventRoutes === void 0
        ? void 0
        : routes_strings_1.eventRoutes.getEventStudentParticipents,
    auth_1.default,
    index_1.eventController === null || index_1.eventController === void 0
        ? void 0
        : index_1.eventController.getEventStudentParticipentsController
);
router.patch(
    routes_strings_1.eventRoutes === null ||
        routes_strings_1.eventRoutes === void 0
        ? void 0
        : routes_strings_1.eventRoutes.updateEventEmployersParticipents,
    auth_1.default,
    index_1.eventController === null || index_1.eventController === void 0
        ? void 0
        : index_1.eventController.updateEventEmployersParticipentsController
);
router.get(
    routes_strings_1.eventRoutes === null ||
        routes_strings_1.eventRoutes === void 0
        ? void 0
        : routes_strings_1.eventRoutes.getEventParticipants,
    auth_1.default,
    index_1.eventController === null || index_1.eventController === void 0
        ? void 0
        : index_1.eventController.getEventParticipantsController
);
router.get(
    routes_strings_1.eventRoutes === null ||
        routes_strings_1.eventRoutes === void 0
        ? void 0
        : routes_strings_1.eventRoutes.fetchJoinedEventsByEmployer,
    auth_1.default,
    index_1.eventController === null || index_1.eventController === void 0
        ? void 0
        : index_1.eventController.fetchJoinedEventsByEmployerController
);
exports.default = router;
//# sourceMappingURL=event.routes.js.map
