'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.removeEventRegistration =
    exports.removeEvent =
    exports.findEventByIdAndUpdate =
    exports.registerEvent =
    exports.findEventsByParticipants =
    exports.findEventsByOrganizer =
    exports.findEventParticipants =
    exports.findAndUpdateEventEmployersParticipants =
    exports.findEventStudentsParticipents =
    exports.findEventEmployersParticipents =
    exports.findOngoingEvents =
    exports.findPastEvents =
    exports.findEventWithStatus =
    exports.findInstitutePastEvents =
    exports.findRequestedEvents =
    exports.findInstituteUpcomingEvents =
    exports.findUpcomingEvents =
    exports.findJoinedEventsByEmployer =
    exports.findEvents =
    exports.findEventById =
    exports.unRegisterParticipant =
    exports.checkIfParticipentAlreadyExist =
    exports.registerParticipant =
    exports.findEventByCreaterEmail =
        void 0;
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const models_1 = require('../models');
const moment_1 = tslib_1.__importDefault(require('moment'));
const types_1 = require('../../interfaces/types');
const events_1 = require('../../methods/events');
const findEventByCreaterEmail = async (email) => {
    try {
        return await models_1.Event.findOne({ creater_email: email });
    } catch (error) {
        throw new Error(
            `Error Fetching Events: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findEventByCreaterEmail = findEventByCreaterEmail;
const registerParticipant = async (data) => {
    try {
        const alreadyExist = await (0, exports.checkIfParticipentAlreadyExist)(
            data
        );
        if (alreadyExist) {
            const unRegisterResult = await (0, exports.unRegisterParticipant)(
                data
            );
            return unRegisterResult;
        } else {
            const eventRegistration = await new models_1.EventRegistration(
                data
            );
            return eventRegistration.save();
        }
    } catch (error) {
        throw new Error(
            `Error Registering Participent: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.registerParticipant = registerParticipant;
const checkIfParticipentAlreadyExist = async (data) => {
    try {
        const filter = Object.assign(
            Object.assign(
                Object.assign(
                    {
                        event_id:
                            data === null || data === void 0
                                ? void 0
                                : data.event_id,
                    },
                    (data === null || data === void 0
                        ? void 0
                        : data.candidate_id) && {
                        candidate_id:
                            data === null || data === void 0
                                ? void 0
                                : data.candidate_id,
                    }
                ),
                (data === null || data === void 0
                    ? void 0
                    : data.institute_id) && {
                    institute_id:
                        data === null || data === void 0
                            ? void 0
                            : data.institute_id,
                }
            ),
            (data === null || data === void 0 ? void 0 : data.branch_id) && {
                branch_id:
                    data === null || data === void 0 ? void 0 : data.branch_id,
            }
        );
        // Perform the delete operation
        const result = await models_1.EventRegistration.findOne(filter);
        return result;
    } catch (error) {
        console.error('Error deleting document:', error);
    }
};
exports.checkIfParticipentAlreadyExist = checkIfParticipentAlreadyExist;
const unRegisterParticipant = async (data) => {
    try {
        const filter = Object.assign(
            Object.assign(
                Object.assign(
                    {
                        event_id:
                            data === null || data === void 0
                                ? void 0
                                : data.event_id,
                    },
                    (data === null || data === void 0
                        ? void 0
                        : data.candidate_id) && {
                        candidate_id:
                            data === null || data === void 0
                                ? void 0
                                : data.candidate_id,
                    }
                ),
                (data === null || data === void 0
                    ? void 0
                    : data.institute_id) && {
                    institute_id:
                        data === null || data === void 0
                            ? void 0
                            : data.institute_id,
                }
            ),
            (data === null || data === void 0 ? void 0 : data.branch_id) && {
                branch_id:
                    data === null || data === void 0 ? void 0 : data.branch_id,
            }
        );
        // Perform the delete operation
        const result = await models_1.EventRegistration.deleteOne(filter);
        return result;
    } catch (error) {
        console.error('Error deleting document:', error);
    }
};
exports.unRegisterParticipant = unRegisterParticipant;
const findEventById = async (id) => {
    try {
        return await models_1.Event.findById(id);
    } catch (error) {
        throw new Error(
            `Error Fetching Event: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findEventById = findEventById;
const findEvents = async (page, limit, startDate, endDate, search) => {
    try {
        const query = {};
        if (startDate && endDate) {
            const formattedStartDate = (0, moment_1.default)(startDate)
                .startOf('day')
                .toDate();
            const formattedEndDate = (0, moment_1.default)(endDate)
                .endOf('day')
                .toDate();
            query.createdAt = {
                $gte: formattedStartDate,
                $lte: formattedEndDate,
            };
        }
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        const totalEvents = await models_1.Event.countDocuments(query);
        const events = await models_1.Event.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        return { events, totalEvents };
    } catch (error) {
        throw new Error(`Error retrieving Events: ${error.message}`);
    }
};
exports.findEvents = findEvents;
const findJoinedEventsByEmployer = async (
    page,
    limit,
    employerId,
    startDate,
    endDate,
    search
) => {
    var _a;
    try {
        const eventRegistrationQuery = { branch_id: employerId };
        // Event filters
        const eventQuery = {};
        if (startDate && endDate) {
            const formattedStartDate = (0, moment_1.default)(startDate)
                .startOf('day')
                .toDate();
            const formattedEndDate = (0, moment_1.default)(endDate)
                .endOf('day')
                .toDate();
            eventQuery.createdAt = {
                $gte: formattedStartDate,
                $lte: formattedEndDate,
            };
        }
        if (search) {
            eventQuery.title = { $regex: search, $options: 'i' }; // Assuming event title is searchable
        }
        // Count total events matching the criteria
        const totalEvents = await models_1.EventRegistration.countDocuments(
            eventRegistrationQuery
        );
        // Retrieve paginated events
        const events = await models_1.EventRegistration.find(
            eventRegistrationQuery
        )
            .populate({
                path: 'event_id',
                match: eventQuery, // Apply filters on populated event
            })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        // Filter out registrations where the event does not match the filters
        const filteredEvents =
            (_a =
                events === null || events === void 0
                    ? void 0
                    : events.filter) === null || _a === void 0
                ? void 0
                : _a.call(
                      events,
                      (registration) => registration.event_id !== null
                  );
        return { events: filteredEvents, totalEvents };
    } catch (error) {
        throw new Error(`Error retrieving Events: ${error.message}`);
    }
};
exports.findJoinedEventsByEmployer = findJoinedEventsByEmployer;
const findUpcomingEvents = async (page, limit, userId) => {
    try {
        const query = { approved_by_admin: true };
        // Get the current date to filter for upcoming events
        const currentDate = (0, moment_1.default)().startOf('day').toDate();
        query.event_from = {
            $gte: currentDate,
        };
        // Define the aggregation pipeline
        const pipeline = [
            {
                $match: query,
            },
            {
                $lookup: {
                    from: 'eventregistrations',
                    let: { eventId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$event_id', '$$eventId'] },
                                        {
                                            $eq: [
                                                '$candidate_id',
                                                new mongoose_1.default.Types.ObjectId(
                                                    userId
                                                ),
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                        { $limit: 1 }, // Only check if a registration exists
                    ],
                    as: 'userRegistration',
                },
            },
            {
                $addFields: {
                    isRegistered: { $gt: [{ $size: '$userRegistration' }, 0] },
                },
            },
            {
                $sort: { event_from: 1 },
            },
            {
                $skip: (page - 1) * limit,
            },
            {
                $limit: limit,
            },
        ];
        const totalEvents = await models_1.Event.countDocuments(query);
        // Run the aggregation pipeline
        const events = await models_1.Event.aggregate(pipeline);
        // Count total upcoming events (without pagination)
        return { events, totalEvents };
    } catch (error) {
        throw new Error(`Error retrieving upcoming events: ${error.message}`);
    }
};
exports.findUpcomingEvents = findUpcomingEvents;
const findInstituteUpcomingEvents = async (
    page,
    limit,
    instituteId,
    startDate,
    endDate
) => {
    try {
        const query = {
            'organized_by.type': 'institution',
            'organized_by.ref_id': new mongoose_1.default.Types.ObjectId(
                instituteId
            ),
            status: 'Scheduled',
        };
        // Validate and parse dates
        const startMoment = startDate && (0, moment_1.default)(startDate);
        const endMoment = endDate && (0, moment_1.default)(endDate);
        if (
            (startMoment === null || startMoment === void 0
                ? void 0
                : startMoment.isValid()) &&
            (endMoment === null || endMoment === void 0
                ? void 0
                : endMoment.isValid())
        ) {
            query.event_from = {
                $gte: startMoment.startOf('day').toDate(),
                $lte: endMoment.endOf('day').toDate(),
            };
        } else if (
            startMoment === null || startMoment === void 0
                ? void 0
                : startMoment.isValid()
        ) {
            query.event_from = { $gte: startMoment.startOf('day').toDate() };
        } else {
            query.event_from = {
                $gte: (0, moment_1.default)().startOf('day').toDate(),
            };
        }
        const totalEvents = await models_1.Event.countDocuments(query);
        const events = await models_1.Event.find(query)
            .sort({ event_from: 1 })
            .skip((page - 1) * limit)
            .limit(limit);
        return { events, totalEvents };
    } catch (error) {
        throw new Error(`Error retrieving upcoming events: ${error.message}`);
    }
};
exports.findInstituteUpcomingEvents = findInstituteUpcomingEvents;
const findRequestedEvents = async (instituteId, page, limit) => {
    try {
        const query = {
            _id: instituteId,
            rejected_by_admin: { $ne: true },
            approved_by_admin: { $ne: true },
        };
        // Query for events where the 'event_from' date is greater than or equal to the current date
        query.requested_partner = {
            $ne: null,
        };
        // Get the total count of upcoming events
        const totalEvents = await models_1.Event.countDocuments(query);
        // Find and paginate upcoming events
        const events = await models_1.Event.find(query)
            .sort({ event_from: 1 }) // Sort by upcoming date in ascending order
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('requested_partner');
        return { events, totalEvents };
    } catch (error) {
        throw new Error(`Error retrieving upcoming events: ${error.message}`);
    }
};
exports.findRequestedEvents = findRequestedEvents;
const findInstitutePastEvents = async (
    page,
    limit,
    instituteId,
    startDate,
    endDate
) => {
    try {
        const query = {
            'organized_by.type': 'institution',
            'organized_by.ref_id': new mongoose_1.default.Types.ObjectId(
                instituteId
            ),
        };
        // Validate and parse dates
        const startMoment = startDate && (0, moment_1.default)(startDate);
        const endMoment = endDate && (0, moment_1.default)(endDate);
        if (
            (startMoment === null || startMoment === void 0
                ? void 0
                : startMoment.isValid()) &&
            (endMoment === null || endMoment === void 0
                ? void 0
                : endMoment.isValid())
        ) {
            query.event_from = {
                $gte: startMoment.startOf('day').toDate(),
                $lte: endMoment.endOf('day').toDate(),
            };
        } else if (
            startMoment === null || startMoment === void 0
                ? void 0
                : startMoment.isValid()
        ) {
            query.event_from = { $gte: startMoment.startOf('day').toDate() };
        } else {
            query.event_from = {
                $lt: (0, moment_1.default)().startOf('day').toDate(),
            };
        }
        const totalEvents = await models_1.Event.countDocuments(query);
        const events = await models_1.Event.find(query)
            .sort({ event_from: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        return { events, totalEvents };
    } catch (error) {
        throw new Error(`Error retrieving past events: ${error.message}`);
    }
};
exports.findInstitutePastEvents = findInstitutePastEvents;
const findEventWithStatus = async (
    page,
    limit,
    instituteId,
    status,
    startDate,
    endDate
) => {
    try {
        const query = {
            status: status,
        };
        if (status === types_1.EventStatus.Requested) {
            query.$or = [
                {
                    'organized_by.type': types_1.EventOrganizerType.Institution,
                    'organized_by.ref_id':
                        new mongoose_1.default.Types.ObjectId(instituteId),
                },
                {
                    requested_partner: new mongoose_1.default.Types.ObjectId(
                        instituteId
                    ),
                },
            ];
        } else {
            query['organized_by.type'] = types_1.EventOrganizerType.Institution;
            query['organized_by.ref_id'] =
                new mongoose_1.default.Types.ObjectId(instituteId);
        }
        // Validate and parse dates
        const startMoment = startDate && (0, moment_1.default)(startDate);
        const endMoment = endDate && (0, moment_1.default)(endDate);
        if (
            (startMoment === null || startMoment === void 0
                ? void 0
                : startMoment.isValid()) &&
            (endMoment === null || endMoment === void 0
                ? void 0
                : endMoment.isValid())
        ) {
            query.event_from = {
                $gte: startMoment.startOf('day').toDate(),
                $lte: endMoment.endOf('day').toDate(),
            };
        } else if (
            startMoment === null || startMoment === void 0
                ? void 0
                : startMoment.isValid()
        ) {
            query.event_from = { $gte: startMoment.startOf('day').toDate() };
        }
        const totalEvents = await models_1.Event.countDocuments(query);
        const events = await models_1.Event.find(query)
            .sort({ event_from: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        return { events, totalEvents };
    } catch (error) {
        throw new Error(`Error retrieving events: ${error.message}`);
    }
};
exports.findEventWithStatus = findEventWithStatus;
const findPastEvents = async (page, limit, userId) => {
    try {
        const query = { approved_by_admin: true };
        // Get the current date to filter for past events
        const currentDate = (0, moment_1.default)().startOf('day').toDate();
        // Query for events where the 'event_to' date is less than the current date
        query.event_to = {
            $lt: currentDate,
        };
        // Define the aggregation pipeline
        const pipeline = [
            {
                $match: query,
            },
            {
                $lookup: {
                    from: 'eventregistrations',
                    let: { eventId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$event_id', '$$eventId'] },
                                        {
                                            $eq: [
                                                '$candidate_id',
                                                new mongoose_1.default.Types.ObjectId(
                                                    userId
                                                ),
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                        { $limit: 1 }, // Only check if a registration exists
                    ],
                    as: 'userRegistration',
                },
            },
            {
                $addFields: {
                    isRegistered: { $gt: [{ $size: '$userRegistration' }, 0] },
                },
            },
            {
                $lookup: {
                    from: 'branches',
                    localField: 'organized_by.ref_id',
                    foreignField: '_id',
                    as: 'organized_by_branch',
                },
            },
            {
                $lookup: {
                    from: 'institutions',
                    localField: 'organized_by.ref_id',
                    foreignField: '_id',
                    as: 'organized_by_institution',
                },
            },
            {
                $addFields: {
                    organized_by_details: {
                        $switch: {
                            branches: [
                                {
                                    case: {
                                        $eq: ['$organized_by.type', 'branch'],
                                    },
                                    then: {
                                        $arrayElemAt: [
                                            '$organized_by_branch',
                                            0,
                                        ],
                                    },
                                },
                                {
                                    case: {
                                        $eq: [
                                            '$organized_by.type',
                                            'institution',
                                        ],
                                    },
                                    then: {
                                        $arrayElemAt: [
                                            '$organized_by_institution',
                                            0,
                                        ],
                                    },
                                },
                            ],
                            default: null,
                        },
                    },
                },
            },
            {
                $project: {
                    organized_by_branch: 0,
                    organized_by_institution: 0,
                },
            },
            {
                $sort: { event_from: 1 },
            },
            {
                $skip: (page - 1) * limit,
            },
            {
                $limit: limit,
            },
        ];
        // Get the total count of past events
        const totalEvents = await models_1.Event.countDocuments(query);
        // Run the aggregation pipeline
        const events = await models_1.Event.aggregate(pipeline);
        return { events, totalEvents };
    } catch (error) {
        throw new Error(`Error retrieving past events: ${error.message}`);
    }
};
exports.findPastEvents = findPastEvents;
const findOngoingEvents = async (page, limit, userId) => {
    try {
        const query = { approved_by_admin: true };
        // Get the current date to filter for ongoing events
        const currentDate = (0, moment_1.default)().toDate();
        // Query for events where the current date is between 'event_from' and 'event_to'
        query.event_from = { $lte: currentDate };
        query.event_to = { $gte: currentDate };
        // Define the aggregation pipeline
        const pipeline = [
            {
                $match: query,
            },
            {
                $lookup: {
                    from: 'eventregistrations',
                    let: { eventId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$event_id', '$$eventId'] },
                                        {
                                            $eq: [
                                                '$candidate_id',
                                                new mongoose_1.default.Types.ObjectId(
                                                    userId
                                                ),
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                        { $limit: 1 }, // Only check if a registration exists
                    ],
                    as: 'userRegistration',
                },
            },
            {
                $addFields: {
                    isRegistered: { $gt: [{ $size: '$userRegistration' }, 0] },
                },
            },
            {
                $sort: { event_from: 1 },
            },
            {
                $skip: (page - 1) * limit,
            },
            {
                $limit: limit,
            },
        ];
        // Get the total count of ongoing events
        const totalEvents = await models_1.Event.countDocuments(query);
        // Run the aggregation pipeline
        const events = await models_1.Event.aggregate(pipeline);
        return { events, totalEvents };
    } catch (error) {
        throw new Error(`Error retrieving ongoing events: ${error.message}`);
    }
};
exports.findOngoingEvents = findOngoingEvents;
const findEventEmployersParticipents = async (page, limit, eventId) => {
    try {
        const query = {
            event_id: new mongoose_1.default.Types.ObjectId(eventId),
            branch_id: { $ne: null },
        };
        const totalEmployers = await models_1.EventRegistration.countDocuments(
            query
        );
        const employers = await models_1.EventRegistration.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('branch_id');
        return { employers, totalEmployers };
    } catch (error) {
        throw new Error(
            `Error retrieving Event Participents: ${error.message}`
        );
    }
};
exports.findEventEmployersParticipents = findEventEmployersParticipents;
const findEventStudentsParticipents = async (page, limit, eventId) => {
    try {
        const query = {
            event_id: new mongoose_1.default.Types.ObjectId(eventId),
            candidate_id: { $ne: null },
        };
        const totalStudents = await models_1.EventRegistration.countDocuments(
            query
        );
        const students = await models_1.EventRegistration.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate({
                path: 'candidate_id',
                populate: {
                    path: 'institute_id',
                },
            });
        return { students, totalStudents };
    } catch (error) {
        throw new Error(
            `Error retrieving Event Participents: ${error.message}`
        );
    }
};
exports.findEventStudentsParticipents = findEventStudentsParticipents;
const findAndUpdateEventEmployersParticipants = async (
    eventId,
    employerIds
) => {
    try {
        const eventObjectId = new mongoose_1.default.Types.ObjectId(eventId);
        const existingEmployers = await models_1.EventRegistration.find({
            event_id: eventObjectId,
            branch_id: { $ne: null },
        });
        //Extract existing employer IDs
        const existingEmployerIds = existingEmployers.map((entry) =>
            entry.branch_id.toString()
        );
        // Find employers to be removed
        const employersToRemove = existingEmployerIds.filter(
            (id) => !employerIds.includes(id)
        );
        // Find employers to be added
        const employersToAdd = employerIds.filter(
            (id) => !existingEmployerIds.includes(id)
        );
        // Remove employers that are no longer part of the event
        if (employersToRemove.length > 0) {
            await models_1.EventRegistration.deleteMany({
                event_id: eventObjectId,
                branch_id: { $in: employersToRemove },
            });
        }
        // Add new employers to the event
        if (employersToAdd.length > 0) {
            const newEntries = employersToAdd.map((id) => ({
                event_id: eventObjectId,
                branch_id: new mongoose_1.default.Types.ObjectId(id),
                createdAt: new Date(),
            }));
            await models_1.EventRegistration.insertMany(newEntries);
        }
        // Fetch updated list of employers
        const updatedTotalEmployers =
            await models_1.EventRegistration.countDocuments({
                event_id: eventObjectId,
            });
        const updatedEmployers = await models_1.EventRegistration.find({
            event_id: eventObjectId,
        })
            .sort({ createdAt: -1 })
            .populate('branch_id');
        return {
            employers: updatedEmployers,
            totalEmployers: updatedTotalEmployers,
        };
    } catch (error) {
        throw new Error(`Error updating Event Participants: ${error.message}`);
    }
};
exports.findAndUpdateEventEmployersParticipants =
    findAndUpdateEventEmployersParticipants;
const findEventParticipants = async (page, limit, eventId) => {
    try {
        const query = { event_id: eventId };
        const totalParticipants =
            await models_1.EventRegistration.countDocuments(query);
        const participants = await models_1.EventRegistration.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('candidate_id', 'name email city state')
            .populate('institute_id', 'name email city state')
            .populate('branch_id', 'name email city state');
        return {
            success: true,
            participants: participants,
            totalParticipants,
        };
    } catch (error) {
        throw new Error(
            `Error retrieving event participants: ${error.message}`
        );
    }
};
exports.findEventParticipants = findEventParticipants;
const findEventsByOrganizer = async (
    page,
    limit,
    startDate,
    endDate,
    eventFromDate,
    search,
    organizerType,
    organizerId
) => {
    try {
        const query = {};
        if (organizerType) {
            query['organized_by.type'] = organizerType.toLowerCase();
        }
        if (organizerId) {
            query['organized_by.ref_id'] = organizerId;
        }
        if (startDate && endDate) {
            const formattedStartDate = (0, moment_1.default)(startDate)
                .startOf('day')
                .toDate();
            const formattedEndDate = (0, moment_1.default)(endDate)
                .endOf('day')
                .toDate();
            query.createdAt = {
                $gte: formattedStartDate,
                $lte: formattedEndDate,
            };
        }
        if (eventFromDate) {
            query.event_from = { $gte: eventFromDate };
        }
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        const totalEvents = await models_1.Event.countDocuments(query);
        let eventsQuery = models_1.Event.find(query).sort({ createdAt: -1 });
        if (limit !== 'All') {
            const numericLimit = Number(limit);
            eventsQuery = eventsQuery
                .skip((page - 1) * numericLimit)
                .limit(numericLimit);
        } else {
            eventsQuery = eventsQuery.skip((page - 1) * 0);
        }
        const events = await eventsQuery;
        return { events, totalEvents };
    } catch (error) {
        throw new Error(`Error retrieving Events: ${error.message}`);
    }
};
exports.findEventsByOrganizer = findEventsByOrganizer;
const findEventsByParticipants = async (
    page,
    limit,
    startDate,
    endDate,
    search,
    participantType,
    participantId
) => {
    try {
        const matchStage = {};
        if (
            participantType.toLowerCase() === 'jobseeker' ||
            participantType.toLowerCase() === 'student'
        ) {
            matchStage.candidate_id = new mongoose_1.default.Types.ObjectId(
                participantId
            );
        } else if (participantType.toLowerCase() === 'employer') {
            matchStage.branch_id = new mongoose_1.default.Types.ObjectId(
                participantId
            );
        } else if (
            participantType.toLowerCase() === 'admin' ||
            participantType.toLowerCase() === 'teacher' ||
            participantType.toLowerCase() === 'counselor'
        ) {
            matchStage.institute_id = new mongoose_1.default.Types.ObjectId(
                participantId
            );
        }
        const pipeline = [
            { $match: matchStage },
            {
                $lookup: {
                    from: 'events',
                    localField: 'event_id',
                    foreignField: '_id',
                    as: 'eventDetails',
                },
            },
            { $unwind: '$eventDetails' },
            { $replaceRoot: { newRoot: '$eventDetails' } },
        ];
        if (startDate && endDate) {
            const formattedStartDate = new Date(startDate);
            const formattedEndDate = new Date(endDate);
            pipeline.push({
                $match: {
                    createdAt: {
                        $gte: formattedStartDate,
                        $lte: formattedEndDate,
                    },
                },
            });
        }
        if (search) {
            pipeline.push({
                $match: {
                    name: { $regex: search, $options: 'i' },
                },
            });
        }
        pipeline.push(
            { $sort: { createdAt: -1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit }
        );
        const totalEventsPipeline = [
            ...pipeline.slice(0, -3),
            { $count: 'total' },
        ];
        const [events, totalCountResult] = await Promise.all([
            models_1.EventRegistration.aggregate(pipeline).exec(),
            models_1.EventRegistration.aggregate(totalEventsPipeline).exec(),
        ]);
        const totalEvents =
            totalCountResult.length > 0 ? totalCountResult[0].total : 0;
        return { events, totalEvents };
    } catch (error) {
        throw new Error(`Error retrieving Events: ${error.message}`);
    }
};
exports.findEventsByParticipants = findEventsByParticipants;
const registerEvent = async (data) => {
    var _a, _b, _c, _d, _e;
    const event = new models_1.Event(data);
    const savedEvent = await event.save();
    const eventDate = (0, events_1.getEventDate)(
        savedEvent === null || savedEvent === void 0
            ? void 0
            : savedEvent.event_from
    );
    const isApproved =
        data === null || data === void 0 ? void 0 : data.approved_by_admin;
    const organizerRefId =
        (_a = data === null || data === void 0 ? void 0 : data.organized_by) ===
            null || _a === void 0
            ? void 0
            : _a.ref_id;
    const organizerType =
        (_b = data === null || data === void 0 ? void 0 : data.organized_by) ===
            null || _b === void 0
            ? void 0
            : _b.type;
    const eventStatus = data === null || data === void 0 ? void 0 : data.status;
    //for scheduled events by institution
    if (isApproved && organizerRefId) {
        const students = await models_1.User.find({
            institute_id:
                (_c =
                    data === null || data === void 0
                        ? void 0
                        : data.organized_by) === null || _c === void 0
                    ? void 0
                    : _c.ref_id,
            role: { $in: [types_1.Role.Student] },
            approved_by_admin: true,
        }).populate('institute_id', 'name');
        (0, events_1.sendEventEmailToUsers)({
            users: students,
            templateName: types_1.EventEmailsTemplates.Scheduled,
            subject: `Invitation to Upcoming Event: ${
                savedEvent === null || savedEvent === void 0
                    ? void 0
                    : savedEvent.title
            } – ${eventDate}`,
            eventData: data,
        });
    }
    //for requested events by institution
    else if (
        !isApproved &&
        organizerRefId &&
        eventStatus === types_1.EventStatus.Requested &&
        organizerType === types_1.EventOrganizerType.Institution
    ) {
        const admins = await models_1.User.find({
            institute_id:
                (_d =
                    data === null || data === void 0
                        ? void 0
                        : data.organized_by) === null || _d === void 0
                    ? void 0
                    : _d.ref_id,
            role: { $in: [types_1.Role.Admin] },
        }).populate('institute_id', 'name');
        (0, events_1.sendEventEmailToUsers)({
            users: admins,
            templateName: types_1.EventEmailsTemplates.ApprovalForInstitution,
            subject: `Event Approval Request – ${
                savedEvent === null || savedEvent === void 0
                    ? void 0
                    : savedEvent.title
            }`,
            eventData: data,
        });
    }
    //for requested events by employer
    else if (
        !isApproved &&
        organizerRefId &&
        eventStatus === types_1.EventStatus.Requested &&
        organizerType === types_1.EventOrganizerType.Branch
    ) {
        const admins = await models_1.User.find({
            institute_id:
                data === null || data === void 0
                    ? void 0
                    : data.requested_partner,
            role: { $in: [types_1.Role.Admin] },
        }).populate('institute_id', 'name');
        const institute = await models_1.Institute.findById(
            data === null || data === void 0 ? void 0 : data.requested_partner
        );
        const user = await models_1.User.findById(
            (_e =
                data === null || data === void 0
                    ? void 0
                    : data.organized_by) === null || _e === void 0
                ? void 0
                : _e.ref_id
        );
        const branch = await models_1.Branch.findOne({
            email: user === null || user === void 0 ? void 0 : user.email,
        });
        (0, events_1.sendEventEmailToUsers)({
            users: admins,
            templateName: types_1.EventEmailsTemplates.ApprovalForEmployer,
            subject: `Request to Organize Event for Students at ${
                institute === null || institute === void 0
                    ? void 0
                    : institute.name
            }`,
            eventData: data,
            branchName:
                branch === null || branch === void 0 ? void 0 : branch.name,
        });
    }
    return savedEvent;
};
exports.registerEvent = registerEvent;
const findEventByIdAndUpdate = async (id, data) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    try {
        const updatedEvent = await models_1.Event.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!updatedEvent) {
            throw new Error('events not found');
        }
        const isInstitutionOrganizer =
            ((_a =
                updatedEvent === null || updatedEvent === void 0
                    ? void 0
                    : updatedEvent.organized_by) === null || _a === void 0
                ? void 0
                : _a.type) === types_1.EventOrganizerType.Institution;
        const organizerId = isInstitutionOrganizer
            ? (_b =
                  updatedEvent === null || updatedEvent === void 0
                      ? void 0
                      : updatedEvent.organized_by) === null || _b === void 0
                ? void 0
                : _b.ref_id
            : updatedEvent === null || updatedEvent === void 0
            ? void 0
            : updatedEvent.requested_partner;
        const students = await models_1.User.find({
            institute_id: organizerId,
            role: { $in: [types_1.Role.Student] },
            approved_by_admin: true,
        }).populate('institute_id', 'name');
        const registrations = await models_1.EventRegistration.find({
            event_id: id,
            branch_id: { $ne: null },
        }).populate('branch_id');
        const branchUsers =
            (_e =
                (_d =
                    (_c =
                        registrations === null || registrations === void 0
                            ? void 0
                            : registrations.map) === null || _c === void 0
                        ? void 0
                        : _c.call(registrations, (r) =>
                              r === null || r === void 0 ? void 0 : r.branch_id
                          )) === null || _d === void 0
                    ? void 0
                    : _d.filter) === null || _e === void 0
                ? void 0
                : _e.call(_d, (b) =>
                      b === null || b === void 0 ? void 0 : b.email
                  );
        const allRecipients = [...students, ...branchUsers];
        const eventDate = (0, events_1.getEventDate)(
            updatedEvent === null || updatedEvent === void 0
                ? void 0
                : updatedEvent.event_from
        );
        const eventTime = (0, events_1.getEventTime)(
            updatedEvent === null || updatedEvent === void 0
                ? void 0
                : updatedEvent.event_from
        );
        // When admin approves the event
        if (
            (data === null || data === void 0
                ? void 0
                : data.reviewed_by_admin) &&
            (data === null || data === void 0 ? void 0 : data.status) ===
                types_1.EventStatus.Scheduled
        ) {
            (0, events_1.sendEventEmailToUsers)({
                users: allRecipients,
                templateName: types_1.EventEmailsTemplates.Scheduled,
                subject: `Invitation to Upcoming Event: ${updatedEvent.title} – ${eventDate}`,
                eventData: updatedEvent,
                adminName:
                    data === null || data === void 0 ? void 0 : data.admin_name,
            });
            const templateName = isInstitutionOrganizer
                ? types_1.EventEmailsTemplates.AcceptedForInstitution
                : types_1.EventEmailsTemplates.AcceptedForEmployer;
            const subject = isInstitutionOrganizer
                ? 'Approval Granted – Student-Employer Event'
                : `Approval to Host Event at ${
                      ((_g =
                          (_f =
                              students === null || students === void 0
                                  ? void 0
                                  : students[0]) === null || _f === void 0
                              ? void 0
                              : _f.institute_id) === null || _g === void 0
                          ? void 0
                          : _g.name) || ''
                  }`;
            (0, events_1.sendCreatorEmail)({
                event: updatedEvent,
                templateName,
                subject,
                adminName:
                    data === null || data === void 0 ? void 0 : data.admin_name,
                schoolName:
                    (_j =
                        (_h =
                            students === null || students === void 0
                                ? void 0
                                : students[0]) === null || _h === void 0
                            ? void 0
                            : _h.institute_id) === null || _j === void 0
                        ? void 0
                        : _j.name,
            });
        }
        // When admin rejects the event
        else if (
            (data === null || data === void 0
                ? void 0
                : data.reviewed_by_admin) &&
            (data === null || data === void 0 ? void 0 : data.status) ===
                types_1.EventStatus.Cancelled
        ) {
            const templateName = isInstitutionOrganizer
                ? types_1.EventEmailsTemplates.RejectedForInstitution
                : types_1.EventEmailsTemplates.RejectedForEmployer;
            const subject = `Re: Event Request – ${updatedEvent.title}`;
            (0, events_1.sendCreatorEmail)({
                event: updatedEvent,
                templateName,
                subject,
                adminName:
                    data === null || data === void 0 ? void 0 : data.admin_name,
                schoolName:
                    (_l =
                        (_k =
                            students === null || students === void 0
                                ? void 0
                                : students[0]) === null || _k === void 0
                            ? void 0
                            : _k.institute_id) === null || _l === void 0
                        ? void 0
                        : _l.name,
            });
        }
        //when the event is updated or rescheduled
        else if (data === null || data === void 0 ? void 0 : data.sendEmail) {
            (0, events_1.sendEventEmailToUsers)({
                users: allRecipients,
                templateName: types_1.EventEmailsTemplates.Updated,
                subject: `Important Update: Changes to Your Upcoming Event - ${
                    updatedEvent === null || updatedEvent === void 0
                        ? void 0
                        : updatedEvent.title
                }`,
                eventData: updatedEvent,
                adminName:
                    data === null || data === void 0 ? void 0 : data.admin_name,
            });
        }
        return updatedEvent;
    } catch (error) {
        throw new Error(`Error updating events: ${error.message}`);
    }
};
exports.findEventByIdAndUpdate = findEventByIdAndUpdate;
const removeEvent = async (id, sendEmails, adminName) => {
    var _a, _b, _c, _d;
    try {
        const event = await models_1.Event.findById(id);
        if (!event) {
            throw new Error('Event not found');
        }
        //to send email to students
        const students = await models_1.User.find({
            institute_id:
                (_a = event.organized_by) === null || _a === void 0
                    ? void 0
                    : _a.ref_id,
            role: types_1.Role.Student,
            approved_by_admin: true,
        }).populate('institute_id', 'name');
        // to send emails to employers
        const registrations = await models_1.EventRegistration.find({
            event_id: id,
            branch_id: { $ne: null },
        }).populate('branch_id');
        const branchUsers =
            (_d =
                (_c =
                    (_b =
                        registrations === null || registrations === void 0
                            ? void 0
                            : registrations.map) === null || _b === void 0
                        ? void 0
                        : _b.call(registrations, (r) =>
                              r === null || r === void 0 ? void 0 : r.branch_id
                          )) === null || _c === void 0
                    ? void 0
                    : _c.filter) === null || _d === void 0
                ? void 0
                : _d.call(_c, (b) =>
                      b === null || b === void 0 ? void 0 : b.email
                  );
        const combinedUsers = [...students, ...branchUsers];
        // Remove all event registrations linked to this event
        await (0, exports.removeEventRegistration)(id);
        // Delete the event
        const deletedEvent = await models_1.Event.findByIdAndDelete(id);
        if (sendEmails) {
            (0, events_1.sendEventEmailToUsers)({
                users: combinedUsers,
                templateName: types_1.EventEmailsTemplates.Deleted,
                subject: `Important Notice: Cancellation of ${
                    event === null || event === void 0 ? void 0 : event.title
                } Event`,
                eventData: event,
                adminName: adminName,
            });
        }
        return deletedEvent;
    } catch (error) {
        throw new Error(
            `Error Deleting Event: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.removeEvent = removeEvent;
const removeEventRegistration = async (eventId, branchId) => {
    try {
        let deletedRegistrations;
        if (branchId) {
            deletedRegistrations = await models_1.EventRegistration.deleteMany({
                event_id: eventId,
                branch_id: branchId,
            });
        } else {
            deletedRegistrations = await models_1.EventRegistration.deleteMany({
                event_id: eventId,
            });
        }
        return deletedRegistrations;
    } catch (error) {
        throw new Error(
            `Error Deleting Event Registrations: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.removeEventRegistration = removeEventRegistration;
//# sourceMappingURL=db.event.js.map
