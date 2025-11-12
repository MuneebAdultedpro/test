import {
    addEvent,
    findAllEvents,
    findEventById,
    findEventByIdAndUpdate,
    findUserRegisteredEvents,
    registerEvent,
    removeEvent,
    unregisterEvent,
} from '../../database/db.event';
import { EventRegistration } from '../../models';

const createEvent = async (req: any) => {
    try {
        const newEvent = await addEvent(req?.body);
        if (newEvent) {
            return {
                event: newEvent,
                message: 'new event created successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 400,
                message: 'error creating event',
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

const updateEvent = async (req: any) => {
    try {
        const eventId = req?.query?.eventId;
        const updatedEvent = await findEventByIdAndUpdate(eventId, req?.body);
        if (updatedEvent) {
            return {
                event: updatedEvent,
                message: 'event updated successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                statusCode: 400,
                success: false,
                message: 'error creating event',
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            success: false,
            message: error,
        };
    }
};

const getEventById = async (req: any) => {
    try {
        const eventId = req?.query?.eventId;
        const event = await findEventById(eventId);
        if (event) {
            return {
                event,
                message: 'event retrieved successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                statusCode: 400,
                success: false,
                message: 'error retreiving event',
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            success: false,
            message: error,
        };
    }
};

const deleteEvent = async (req: any) => {
    try {
        const eventId = req?.query?.eventId;
        const deletedEvent = await removeEvent(eventId);
        if (deletedEvent) {
            return {
                event: deletedEvent,
                message: 'event deleted successflly',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                statusCode: 400,
                success: false,
                message: 'error deleting event',
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            success: false,
            message: error,
        };
    }
};

const getAllEvents = async (req: any) => {
    try {
        const date = req?.query?.date;
        const venue = req?.query?.venue as string;
        const search = req?.query?.search as string;
        const category = req?.query?.category as string;
        const latitude = parseFloat(req?.query?.latitude);
        const longitude = parseFloat(req?.query?.longitude);
        const page = parseInt(req?.query?.page as string);
        const limit = parseInt(req?.query?.limit as string);

        const { events, totalEvents, totalPages, currentPage } =
            await findAllEvents(
                page,
                limit,
                date,
                venue,
                category,
                search,
                longitude,
                latitude
            );

        if (events) {
            return {
                success: true,
                message: 'events retrieved successfully',
                statusCode: 200,
                events,
                totalEvents,
                totalPages,
                currentPage,
            };
        } else {
            return {
                success: false,
                message: 'error in retrieving evenst',
                statusCode: 400,
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error,
            statusCode: 500,
        };
    }
};
const createEventRegistration = async (req: any) => {
    try {
        const existingRegistration = await EventRegistration.findOne({
            userId: req?.body?.userId,
            eventId: req?.body?.eventId,
        });
        if (existingRegistration) {
            return {
                eventRegistration: existingRegistration,
                message: 'User already registered for this event',
                statusCode: 200,
                success: true,
                alreadRegistered: true,
            };
        }
        const eventRegistration = await registerEvent(req?.body);
        if (eventRegistration) {
            return {
                eventRegistration,
                message: 'event registered successflly',
                statusCode: 200,
                success: true,
                alreadRegistered: false,
            };
        } else {
            return {
                statusCode: 400,
                success: false,
                message: 'error regestring event',
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            success: false,
            message: error,
        };
    }
};

const removeEventRegistration = async (req: any) => {
    try {
        const eventId = req?.query?.eventId;
        const userId = req?.query?.userId;
        const deletedRegistration = await unregisterEvent(userId, eventId);
        if (deletedRegistration) {
            return {
                deletedRegistration: deletedRegistration,
                message: 'registration deleted successflly',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                statusCode: 400,
                success: false,
                message: 'error deleting registration',
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            success: false,
            message: error,
        };
    }
};
const getUserRegisteredEvents = async (req: any) => {
    try {
        const userId = req?.query?.userId;
        const events = await findUserRegisteredEvents(userId);
        if (events) {
            return {
                success: true,
                message: 'registered events retrieved successfully',
                statusCode: 200,
                events,
            };
        } else {
            return {
                success: false,
                message: 'error in retrieving registered events',
                statusCode: 400,
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error,
            statusCode: 500,
        };
    }
};
export {
    createEvent,
    updateEvent,
    getAllEvents,
    getEventById,
    deleteEvent,
    createEventRegistration,
    removeEventRegistration,
    getUserRegisteredEvents,
};
