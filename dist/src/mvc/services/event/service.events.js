'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getEventWithStatus =
    exports.getEventStudentParticipents =
    exports.updateEventEmployersParticipents =
    exports.deleteEventRegistration =
    exports.getInstitutePastEvents =
    exports.getInstituteUpcomingEvents =
    exports.getEventParticipants =
    exports.getEventEmployersParticipents =
    exports.fetchJoinedEventsByEmployer =
    exports.unRegisterParticipantService =
    exports.registerParticipantService =
    exports.getEventsByOrganizerService =
    exports.getPastEvents =
    exports.getEventsByParticipantService =
    exports.getOnGoingEvents =
    exports.getRequestedEvents =
    exports.deleteEvent =
    exports.getUpcomingEvents =
    exports.getEvents =
    exports.getEvent =
    exports.updateEventService =
    exports.createEvent =
        void 0;
const tslib_1 = require('tslib');
const db_event_1 = require('../../database/db.event');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const models_1 = require('../../models');
const types_1 = require('../../../interfaces/types');
const events_1 = require('../../../methods/events');
const createEvent = async (req) => {
    var _a, _b, _c;
    try {
        // const event = await findEventByCreaterEmail(req?.body?.email);
        // // const userId = req?.user?.id;
        // // const userRole = req?.user?.role;
        // if (event) {
        //     return {
        //         success: false,
        //         statusCode: 403,
        //         message: 'Event Already Exist',
        //     };
        // }
        const eventPayload = Object.assign(
            Object.assign(
                {},
                req === null || req === void 0 ? void 0 : req.body
            ),
            {
                organized_by: {
                    // type: req?.user?.role, when we enable the auth middleware
                    // ref_id: req?.user?.id //when we enable the auth
                    type:
                        (_a =
                            req === null || req === void 0
                                ? void 0
                                : req.body) === null || _a === void 0
                            ? void 0
                            : _a.organizer_type,
                    ref_id: (
                        (_b =
                            req === null || req === void 0
                                ? void 0
                                : req.body) === null || _b === void 0
                            ? void 0
                            : _b.organizer_id
                    )
                        ? new mongoose_1.default.Types.ObjectId(
                              (_c =
                                  req === null || req === void 0
                                      ? void 0
                                      : req.body) === null || _c === void 0
                                  ? void 0
                                  : _c.organizer_id
                          )
                        : new mongoose_1.default.Types.ObjectId(
                              req.body.organizer_Id
                          ), // Convert to ObjectId with new
                },
            }
        );
        //need to alter the body to make it compatable with model e.g organized_by is an object
        const newEvent = await (0, db_event_1.registerEvent)(eventPayload);
        // const newParticipent = await registerParticipant(req?.body);
        // TODO: in firebase when we create an event it by defaults add the creater as participent so we need to do the same in mongo  ^^^
        if (newEvent) {
            return {
                event: newEvent,
                message: 'new event registered Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 403,
                message: 'Error Registering Event',
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
exports.createEvent = createEvent;
const registerParticipantService = async (req) => {
    var _a, _b, _c, _d;
    try {
        const event_id =
            (_a = req === null || req === void 0 ? void 0 : req.body) ===
                null || _a === void 0
                ? void 0
                : _a.eventId;
        const userId =
            (_b = req === null || req === void 0 ? void 0 : req.body) ===
                null || _b === void 0
                ? void 0
                : _b.participantId;
        const userStatus =
            (_c = req === null || req === void 0 ? void 0 : req.body) ===
                null || _c === void 0
                ? void 0
                : _c.participantStatus;
        if (!event_id) {
            return {
                success: false,
                statusCode: 403,
                message: 'Please provide the event id',
            };
        }
        const event = await (0, db_event_1.findEventById)(event_id);
        if (!event) {
            return {
                success: false,
                statusCode: 403,
                message: "Event with the given id doesn't exist",
            };
        }
        const userStatusLower =
            (_d =
                userStatus === null || userStatus === void 0
                    ? void 0
                    : userStatus.toLowerCase) === null || _d === void 0
                ? void 0
                : _d.call(userStatus);
        const registerParticipantPayload = {
            event_id,
            candidate_id: ['student', 'jobseeker'].includes(userStatusLower)
                ? userId
                : null,
            institute_id: ['admin', 'teacher', 'counsellor'].includes(
                userStatusLower
            )
                ? userId
                : null,
            branch_id: userStatusLower === 'employer' ? userId : null,
        };
        //need to alter the body to make it compatable with model e.g organized_by is an object
        const newRegistration = await (0, db_event_1.registerParticipant)(
            registerParticipantPayload
        );
        if (
            newRegistration &&
            userStatusLower === 'employer' &&
            (event === null || event === void 0
                ? void 0
                : event.approved_by_admin)
        ) {
            const employer = await models_1.Branch.findById(userId);
            const eventDate = (0, events_1.getEventDate)(
                event === null || event === void 0 ? void 0 : event.event_from
            );
            if (
                employer === null || employer === void 0
                    ? void 0
                    : employer.email
            ) {
                await (0, events_1.sendEventEmailToUsers)({
                    users: [employer],
                    templateName: types_1.EventEmailsTemplates.Scheduled,
                    subject: `Invitation to Upcoming Event: ${
                        event === null || event === void 0
                            ? void 0
                            : event.title
                    } – ${eventDate}`,
                    eventData: event,
                });
            }
        }
        if (newRegistration) {
            return {
                // event: newEvent,
                message: 'new User registered Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 403,
                message: 'Error Registering User',
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
exports.registerParticipantService = registerParticipantService;
const unRegisterParticipantService = async (req) => {
    var _a, _b, _c, _d;
    try {
        const event_id =
            (_a = req === null || req === void 0 ? void 0 : req.body) ===
                null || _a === void 0
                ? void 0
                : _a.eventId;
        const userId =
            (_b = req === null || req === void 0 ? void 0 : req.body) ===
                null || _b === void 0
                ? void 0
                : _b.participantId;
        const userStatus =
            (_c = req === null || req === void 0 ? void 0 : req.body) ===
                null || _c === void 0
                ? void 0
                : _c.participantStatus;
        if (!event_id) {
            return {
                success: false,
                statusCode: 403,
                message: 'Please provide the event id',
            };
        }
        const event = await (0, db_event_1.findEventById)(event_id);
        if (!event) {
            return {
                success: false,
                statusCode: 403,
                message: "Event with the given id doesn't exist",
            };
        }
        const userStatusLower =
            (_d =
                userStatus === null || userStatus === void 0
                    ? void 0
                    : userStatus.toLowerCase) === null || _d === void 0
                ? void 0
                : _d.call(userStatus);
        const registerParticipantPayload = {
            event_id,
            candidate_id: ['student', 'jobseeker'].includes(userStatusLower)
                ? userId
                : null,
            institute_id: ['admin', 'teacher', 'counsellor'].includes(
                userStatusLower
            )
                ? userId
                : null,
            branch_id: userStatusLower === 'employer' ? userId : null,
        };
        //need to alter the body to make it compatable with model e.g organized_by is an object
        const unRegisterResult = await (0, db_event_1.unRegisterParticipant)(
            registerParticipantPayload
        );
        if (unRegisterResult) {
            return {
                // event: newEvent,
                message: 'User unregistered Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 403,
                message: 'Error UnRegistering User',
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
exports.unRegisterParticipantService = unRegisterParticipantService;
const getEvents = async (req) => {
    var _a, _b, _c, _d, _e, _f, _g;
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
            ) || 10; // Pagination: number of records per page
        const startDate = (
            (_c = req === null || req === void 0 ? void 0 : req.query) ===
                null || _c === void 0
                ? void 0
                : _c.startDate
        )
            ? new Date(
                  (_d = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _d === void 0
                      ? void 0
                      : _d.startDate
              )
            : undefined; // Optional start date
        const endDate = (
            (_e = req === null || req === void 0 ? void 0 : req.query) ===
                null || _e === void 0
                ? void 0
                : _e.endDate
        )
            ? new Date(
                  (_f = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _f === void 0
                      ? void 0
                      : _f.endDate
              )
            : undefined; // Optional end date
        const search =
            (_g = req === null || req === void 0 ? void 0 : req.query) ===
                null || _g === void 0
                ? void 0
                : _g.search; // Optional search query for event name
        const { events, totalEvents } = await (0, db_event_1.findEvents)(
            page,
            limit,
            startDate,
            endDate,
            search
        );
        if (!(events === null || events === void 0 ? void 0 : events.length)) {
            return {
                success: true,
                statusCode: 200,
                message: 'No events Found',
                events: [],
                totalEvents: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Events retrieved successfully',
            events,
            totalEvents,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getEvents = getEvents;
const getUpcomingEvents = async (req) => {
    var _a, _b, _c;
    try {
        const userId =
            (_a = req === null || req === void 0 ? void 0 : req.user) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const page =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.page
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10; // Pagination: number of records per page
        const { events, totalEvents } = await (0,
        db_event_1.findUpcomingEvents)(page, limit, userId);
        if (!(events === null || events === void 0 ? void 0 : events.length)) {
            return {
                success: true,
                statusCode: 200,
                message: 'No events Found',
                events: [],
                totalEvents: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Events retrieved successfully',
            events,
            totalEvents,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getUpcomingEvents = getUpcomingEvents;
const getInstituteUpcomingEvents = async (req) => {
    var _a, _b, _c, _d, _e;
    try {
        const instituteId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const page =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.page
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10; // Pagination: number of records per page
        const startDate =
            (_d = req === null || req === void 0 ? void 0 : req.query) ===
                null || _d === void 0
                ? void 0
                : _d.startDate;
        const endDate =
            (_e = req === null || req === void 0 ? void 0 : req.query) ===
                null || _e === void 0
                ? void 0
                : _e.endDate;
        const { events, totalEvents } = await (0,
        db_event_1.findInstituteUpcomingEvents)(
            page,
            limit,
            instituteId,
            startDate,
            endDate
        );
        if (!(events === null || events === void 0 ? void 0 : events.length)) {
            return {
                success: true,
                statusCode: 200,
                message: 'No events Found',
                events: [],
                totalEvents: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Events retrieved successfully',
            events,
            totalEvents,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getInstituteUpcomingEvents = getInstituteUpcomingEvents;
const getRequestedEvents = async (req) => {
    var _a, _b, _c;
    try {
        const instituteId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const page =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.page
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10; // Pagination: number of records per page
        const { events, totalEvents } = await (0,
        db_event_1.findRequestedEvents)(instituteId, page, limit);
        if (!(events === null || events === void 0 ? void 0 : events.length)) {
            return {
                success: true,
                statusCode: 200,
                message: 'No events Found',
                events: [],
                totalEvents: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Events retrieved successfully',
            events,
            totalEvents,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getRequestedEvents = getRequestedEvents;
const getPastEvents = async (req) => {
    var _a, _b, _c;
    try {
        const userId =
            (_a = req === null || req === void 0 ? void 0 : req.user) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const page =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.page
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10; // Pagination: number of records per page
        const { events, totalEvents } = await (0, db_event_1.findPastEvents)(
            page,
            limit,
            userId
        );
        if (!(events === null || events === void 0 ? void 0 : events.length)) {
            return {
                success: true,
                statusCode: 200,
                message: 'No events Found',
                events: [],
                totalEvents: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Events retrieved successfully',
            events,
            totalEvents,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getPastEvents = getPastEvents;
const getEventWithStatus = async (req) => {
    var _a, _b, _c, _d, _e, _f;
    try {
        const instituteId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const page =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.page
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10; // Pagination: number of records per page
        const startDate =
            (_d = req === null || req === void 0 ? void 0 : req.query) ===
                null || _d === void 0
                ? void 0
                : _d.startDate;
        const endDate =
            (_e = req === null || req === void 0 ? void 0 : req.query) ===
                null || _e === void 0
                ? void 0
                : _e.endDate;
        const status =
            (_f = req === null || req === void 0 ? void 0 : req.query) ===
                null || _f === void 0
                ? void 0
                : _f.status;
        const { events, totalEvents } = await (0,
        db_event_1.findEventWithStatus)(
            page,
            limit,
            instituteId,
            status,
            startDate,
            endDate
        );
        if (!(events === null || events === void 0 ? void 0 : events.length)) {
            return {
                success: true,
                statusCode: 200,
                message: 'No events Found',
                events: [],
                totalEvents: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Events retrieved successfully',
            events,
            totalEvents,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getEventWithStatus = getEventWithStatus;
const getInstitutePastEvents = async (req) => {
    var _a, _b, _c, _d, _e;
    try {
        const instituteId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const page =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.page
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10; // Pagination: number of records per page
        const startDate =
            (_d = req === null || req === void 0 ? void 0 : req.query) ===
                null || _d === void 0
                ? void 0
                : _d.startDate;
        const endDate =
            (_e = req === null || req === void 0 ? void 0 : req.query) ===
                null || _e === void 0
                ? void 0
                : _e.endDate;
        const { events, totalEvents } = await (0,
        db_event_1.findInstitutePastEvents)(
            page,
            limit,
            instituteId,
            startDate,
            endDate
        );
        if (!(events === null || events === void 0 ? void 0 : events.length)) {
            return {
                success: true,
                statusCode: 200,
                message: 'No events Found',
                events: [],
                totalEvents: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Events retrieved successfully',
            events,
            totalEvents,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getInstitutePastEvents = getInstitutePastEvents;
const getOnGoingEvents = async (req) => {
    var _a, _b, _c;
    try {
        const userId =
            (_a = req === null || req === void 0 ? void 0 : req.user) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const page =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.page
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10; // Pagination: number of records per page
        const { events, totalEvents } = await (0, db_event_1.findOngoingEvents)(
            page,
            limit,
            userId
        );
        if (!(events === null || events === void 0 ? void 0 : events.length)) {
            return {
                success: true,
                statusCode: 200,
                message: 'No events Found',
                events: [],
                totalEvents: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Events retrieved successfully',
            events,
            totalEvents,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getOnGoingEvents = getOnGoingEvents;
const getEventEmployersParticipents = async (req) => {
    var _a, _b, _c;
    try {
        const eventId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.eventId;
        const page =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.page
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10; // Pagination: number of records per page
        const { employers, totalEmployers } = await (0,
        db_event_1.findEventEmployersParticipents)(page, limit, eventId);
        const processedEmployers = employers.map((employer) => {
            var _a;
            if (
                !employer.name &&
                (employer === null || employer === void 0
                    ? void 0
                    : employer.email)
            ) {
                const nameFromEmail =
                    (_a =
                        employer === null || employer === void 0
                            ? void 0
                            : employer.email) === null || _a === void 0
                        ? void 0
                        : _a.split('@')[0];
                return Object.assign(Object.assign({}, employer), {
                    name: nameFromEmail,
                });
            }
            return employer;
        });
        if (
            !(employers === null || employers === void 0
                ? void 0
                : employers.length)
        ) {
            return {
                success: true,
                statusCode: 200,
                message: 'No Participent Found',
                employers: [],
                totalEmployers: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Events Participent retrieved successfully',
            employers: processedEmployers,
            totalEmployers,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getEventEmployersParticipents = getEventEmployersParticipents;
const getEventStudentParticipents = async (req) => {
    var _a, _b, _c;
    try {
        const eventId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.eventId;
        const page =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.page
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10; // Pagination: number of records per page
        const { students, totalStudents } = await (0,
        db_event_1.findEventStudentsParticipents)(page, limit, eventId);
        if (
            !(students === null || students === void 0
                ? void 0
                : students.length)
        ) {
            return {
                success: true,
                statusCode: 200,
                message: 'No Participent Found',
                employers: [],
                totalEmployers: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Events Participent retrieved successfully',
            students,
            totalStudents,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getEventStudentParticipents = getEventStudentParticipents;
const updateEventEmployersParticipents = async (req) => {
    var _a, _b;
    try {
        const eventId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.eventId;
        const { employers, totalEmployers } = await (0,
        db_event_1.findAndUpdateEventEmployersParticipants)(
            eventId,
            (_b = req === null || req === void 0 ? void 0 : req.body) ===
                null || _b === void 0
                ? void 0
                : _b.selectedEmployers
        );
        if (
            !(employers === null || employers === void 0
                ? void 0
                : employers.length)
        ) {
            return {
                success: true,
                statusCode: 200,
                message: 'No Participent Found',
                employers: [],
                totalEmployers: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Events Participent updated successfully',
            employers,
            totalEmployers,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.updateEventEmployersParticipents = updateEventEmployersParticipents;
const getEventParticipants = async (req) => {
    var _a, _b, _c;
    try {
        const eventId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const page =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.page
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10; // Pagination: number of records per page
        const { participants, totalParticipants } = await (0,
        db_event_1.findEventParticipants)(page, limit, eventId);
        return {
            success: true,
            statusCode: 200,
            message: 'Events Participent retrieved successfully',
            participants,
            totalParticipants,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getEventParticipants = getEventParticipants;
const fetchJoinedEventsByEmployer = async (req) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
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
            ) || 10; // Pagination: number of records per page
        const employerId =
            (_c = req === null || req === void 0 ? void 0 : req.query) ===
                null || _c === void 0
                ? void 0
                : _c.employerId;
        const startDate = (
            (_d = req === null || req === void 0 ? void 0 : req.query) ===
                null || _d === void 0
                ? void 0
                : _d.startDate
        )
            ? new Date(
                  (_e = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _e === void 0
                      ? void 0
                      : _e.startDate
              )
            : undefined; // Optional start date
        const endDate = (
            (_f = req === null || req === void 0 ? void 0 : req.query) ===
                null || _f === void 0
                ? void 0
                : _f.endDate
        )
            ? new Date(
                  (_g = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _g === void 0
                      ? void 0
                      : _g.endDate
              )
            : undefined; // Optional end date
        const search =
            (_h = req === null || req === void 0 ? void 0 : req.query) ===
                null || _h === void 0
                ? void 0
                : _h.search; // Optional search query for event name
        const { events, totalEvents } = await (0,
        db_event_1.findJoinedEventsByEmployer)(
            page,
            limit,
            employerId,
            startDate,
            endDate,
            search
        );
        if (!(events === null || events === void 0 ? void 0 : events.length)) {
            return {
                success: true,
                statusCode: 200,
                message: 'No events Found',
                events: [],
                totalEvents: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Events retrieved successfully',
            events,
            totalEvents,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.fetchJoinedEventsByEmployer = fetchJoinedEventsByEmployer;
const getEventsByOrganizerService = async (req) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    try {
        const page =
            parseInt(
                (_a = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _a === void 0
                    ? void 0
                    : _a.page
            ) || 1; // Pagination: current page
        const limitParam =
            (_b = req === null || req === void 0 ? void 0 : req.query) ===
                null || _b === void 0
                ? void 0
                : _b.limit;
        const limit = limitParam === 'All' ? 'All' : parseInt(limitParam) || 10;
        // Pagination: number of records per page
        const startDate = (
            (_c = req === null || req === void 0 ? void 0 : req.query) ===
                null || _c === void 0
                ? void 0
                : _c.startDate
        )
            ? new Date(
                  (_d = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _d === void 0
                      ? void 0
                      : _d.startDate
              )
            : undefined; // Optional start date
        const endDate = (
            (_e = req === null || req === void 0 ? void 0 : req.query) ===
                null || _e === void 0
                ? void 0
                : _e.endDate
        )
            ? new Date(
                  (_f = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _f === void 0
                      ? void 0
                      : _f.endDate
              )
            : undefined; // Optional end date
        const eventFromDate = (
            (_g = req === null || req === void 0 ? void 0 : req.query) ===
                null || _g === void 0
                ? void 0
                : _g.eventFromDate
        )
            ? new Date(
                  (_h = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _h === void 0
                      ? void 0
                      : _h.eventFromDate
              )
            : undefined; // Optional end date
        const search =
            (_j = req === null || req === void 0 ? void 0 : req.query) ===
                null || _j === void 0
                ? void 0
                : _j.search; // Optional search query for event name
        const organizerType =
            (_k = req === null || req === void 0 ? void 0 : req.query) ===
                null || _k === void 0
                ? void 0
                : _k.organizerType;
        const organizerId =
            (_l = req === null || req === void 0 ? void 0 : req.query) ===
                null || _l === void 0
                ? void 0
                : _l.organizerId;
        if (!organizerType || !organizerId) {
            return {
                success: false,
                statusCode: 403,
                message: 'Please mention organizer details',
            };
        }
        const { events, totalEvents } = await (0,
        db_event_1.findEventsByOrganizer)(
            page,
            limit,
            startDate,
            endDate,
            eventFromDate,
            search,
            organizerType,
            organizerId
        );
        if (!(events === null || events === void 0 ? void 0 : events.length)) {
            return {
                success: true,
                statusCode: 200,
                message: 'No events Found with given organizer',
                events: [],
                totalEvents: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Events retrieved successfully',
            events,
            totalEvents,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getEventsByOrganizerService = getEventsByOrganizerService;
const getEventsByParticipantService = async (req) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
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
            ) || 10; // Pagination: number of records per page
        const startDate = (
            (_c = req === null || req === void 0 ? void 0 : req.query) ===
                null || _c === void 0
                ? void 0
                : _c.startDate
        )
            ? new Date(
                  (_d = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _d === void 0
                      ? void 0
                      : _d.startDate
              )
            : undefined; // Optional start date
        const endDate = (
            (_e = req === null || req === void 0 ? void 0 : req.query) ===
                null || _e === void 0
                ? void 0
                : _e.endDate
        )
            ? new Date(
                  (_f = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _f === void 0
                      ? void 0
                      : _f.endDate
              )
            : undefined; // Optional end date
        const search =
            (_g = req === null || req === void 0 ? void 0 : req.query) ===
                null || _g === void 0
                ? void 0
                : _g.search; // Optional search query for event name
        const participantType =
            (_h = req === null || req === void 0 ? void 0 : req.query) ===
                null || _h === void 0
                ? void 0
                : _h.participantType;
        const participantId =
            (_j = req === null || req === void 0 ? void 0 : req.query) ===
                null || _j === void 0
                ? void 0
                : _j.participantId;
        if (!participantType || !participantId) {
            return {
                success: false,
                statusCode: 403,
                message: 'Please mention participant details',
            };
        }
        const { events, totalEvents } = await (0,
        db_event_1.findEventsByParticipants)(
            page,
            limit,
            startDate,
            endDate,
            search,
            participantType,
            participantId
        );
        if (!(events === null || events === void 0 ? void 0 : events.length)) {
            return {
                success: true,
                statusCode: 200,
                message: 'No events found with given participant',
                events: [],
                totalEvents: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Events retrieved successfully',
            events,
            totalEvents,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getEventsByParticipantService = getEventsByParticipantService;
const getEvent = async (req) => {
    var _a;
    try {
        const EventId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        if (!EventId) {
            return {
                success: false,
                statusCode: 403,
                message: 'Please Provide eventId',
            };
        }
        const event = await (0, db_event_1.findEventById)(EventId);
        if (!event) {
            return {
                success: false,
                statusCode: 403,
                message: "Event with the given id doesn't exist",
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Event retrieved successfully',
            event: event,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getEvent = getEvent;
const updateEventService = async (req) => {
    var _a;
    try {
        const eventId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        if (!eventId) {
            return {
                success: false,
                statusCode: 404,
                message: 'eventId is required',
            };
        }
        const updatedEvent = await (0, db_event_1.findEventByIdAndUpdate)(
            eventId,
            req === null || req === void 0 ? void 0 : req.body
        );
        if (!updatedEvent) {
            return {
                success: false,
                statusCode: 403,
                message: 'No Job Found',
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Event retrieved successfully',
            updatedEvent,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.updateEventService = updateEventService;
const deleteEvent = async (req) => {
    var _a, _b, _c;
    try {
        const eventId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const sendEmail =
            ((_b = req === null || req === void 0 ? void 0 : req.query) ===
                null || _b === void 0
                ? void 0
                : _b.sendEmail) === 'true';
        const adminName =
            (_c = req === null || req === void 0 ? void 0 : req.query) ===
                null || _c === void 0
                ? void 0
                : _c.adminName;
        if (!eventId) {
            return {
                success: false,
                statusCode: 404,
                message: 'eventId is required',
            };
        }
        const deletedEvent = await (0, db_event_1.removeEvent)(
            eventId,
            sendEmail,
            adminName
        );
        if (!deletedEvent) {
            return {
                success: false,
                statusCode: 403,
                message: 'No event Found',
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'event deleted successfully',
            deletedEvent,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.deleteEvent = deleteEvent;
const deleteEventRegistration = async (req) => {
    var _a, _b;
    try {
        const eventId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.eventId;
        const branchId =
            (_b = req === null || req === void 0 ? void 0 : req.query) ===
                null || _b === void 0
                ? void 0
                : _b.branchId;
        if (!eventId) {
            return {
                success: false,
                statusCode: 404,
                message: 'eventId is required',
            };
        }
        const deletedEventRegistrations = await (0,
        db_event_1.removeEventRegistration)(eventId, branchId);
        if (!deletedEventRegistrations) {
            return {
                success: false,
                statusCode: 403,
                message: 'No event registration Found',
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'event registrations deleted successfully',
            deletedEventRegistrations,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.deleteEventRegistration = deleteEventRegistration;
//# sourceMappingURL=service.events.js.map
