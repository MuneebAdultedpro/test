import { Request } from 'express';
declare const createEvent: (req: Request) => Promise<
    | {
          event: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          event?: undefined;
      }
>;
declare const registerParticipantService: (req: Request) => Promise<{
    success: boolean;
    statusCode: number;
    message: any;
}>;
declare const unRegisterParticipantService: (req: Request) => Promise<{
    success: boolean;
    statusCode: number;
    message: any;
}>;
declare const getEvents: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          events: any;
          totalEvents: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          events?: undefined;
          totalEvents?: undefined;
      }
>;
declare const getUpcomingEvents: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          events: any;
          totalEvents: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          events?: undefined;
          totalEvents?: undefined;
      }
>;
declare const getInstituteUpcomingEvents: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          events: any;
          totalEvents: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          events?: undefined;
          totalEvents?: undefined;
      }
>;
declare const getRequestedEvents: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          events: any;
          totalEvents: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          events?: undefined;
          totalEvents?: undefined;
      }
>;
declare const getPastEvents: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          events: any;
          totalEvents: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          events?: undefined;
          totalEvents?: undefined;
      }
>;
declare const getEventWithStatus: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          events: any;
          totalEvents: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          events?: undefined;
          totalEvents?: undefined;
      }
>;
declare const getInstitutePastEvents: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          events: any;
          totalEvents: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          events?: undefined;
          totalEvents?: undefined;
      }
>;
declare const getOnGoingEvents: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          events: any;
          totalEvents: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          events?: undefined;
          totalEvents?: undefined;
      }
>;
declare const getEventEmployersParticipents: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          employers: any;
          totalEmployers: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          employers?: undefined;
          totalEmployers?: undefined;
      }
>;
declare const getEventStudentParticipents: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          employers: any[];
          totalEmployers: number;
          students?: undefined;
          totalStudents?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          message: string;
          students: any;
          totalStudents: any;
          employers?: undefined;
          totalEmployers?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          employers?: undefined;
          totalEmployers?: undefined;
          students?: undefined;
          totalStudents?: undefined;
      }
>;
declare const updateEventEmployersParticipents: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          employers: any;
          totalEmployers: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          employers?: undefined;
          totalEmployers?: undefined;
      }
>;
declare const getEventParticipants: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          participants: any;
          totalParticipants: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          participants?: undefined;
          totalParticipants?: undefined;
      }
>;
declare const fetchJoinedEventsByEmployer: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          events: any;
          totalEvents: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          events?: undefined;
          totalEvents?: undefined;
      }
>;
declare const getEventsByOrganizerService: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          events: any;
          totalEvents: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          events?: undefined;
          totalEvents?: undefined;
      }
>;
declare const getEventsByParticipantService: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          events: any;
          totalEvents: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          events?: undefined;
          totalEvents?: undefined;
      }
>;
declare const getEvent: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          event: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          event?: undefined;
      }
>;
declare const updateEventService: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          updatedEvent: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          updatedEvent?: undefined;
      }
>;
declare const deleteEvent: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          deletedEvent: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          deletedEvent?: undefined;
      }
>;
declare const deleteEventRegistration: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          deletedEventRegistrations: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          deletedEventRegistrations?: undefined;
      }
>;
export {
    createEvent,
    updateEventService,
    getEvent,
    getEvents,
    getUpcomingEvents,
    deleteEvent,
    getRequestedEvents,
    getOnGoingEvents,
    getEventsByParticipantService,
    getPastEvents,
    getEventsByOrganizerService,
    registerParticipantService,
    unRegisterParticipantService,
    fetchJoinedEventsByEmployer,
    getEventEmployersParticipents,
    getEventParticipants,
    getInstituteUpcomingEvents,
    getInstitutePastEvents,
    deleteEventRegistration,
    updateEventEmployersParticipents,
    getEventStudentParticipents,
    getEventWithStatus,
};
