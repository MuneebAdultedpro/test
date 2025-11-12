import { Request, Response } from 'express';
declare const createEventController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const registerEventUserController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const unRegisterEventUserController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getEventController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getEventsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getRequestedEventsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getEventsByOrganizerController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getEventsByParticipantController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const deleteEventController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const deleteEventRegistrationController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const updateEventController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const upcommingEventsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const instituteUpcommingEventsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const pastEventsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getEventWithStatusController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const institutePastEventsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const onGoingEventsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getEventEmployersParticipentsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getEventStudentParticipentsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const updateEventEmployersParticipentsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getEventParticipantsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const fetchJoinedEventsByEmployerController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
export {
    createEventController,
    getEventController,
    getRequestedEventsController,
    getEventsController,
    deleteEventController,
    updateEventController,
    getEventsByOrganizerController,
    onGoingEventsController,
    getEventsByParticipantController,
    registerEventUserController,
    upcommingEventsController,
    pastEventsController,
    getEventEmployersParticipentsController,
    unRegisterEventUserController,
    fetchJoinedEventsByEmployerController,
    getEventParticipantsController,
    instituteUpcommingEventsController,
    institutePastEventsController,
    deleteEventRegistrationController,
    updateEventEmployersParticipentsController,
    getEventStudentParticipentsController,
    getEventWithStatusController,
};
