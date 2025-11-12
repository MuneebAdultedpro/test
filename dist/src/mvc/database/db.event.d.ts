export declare const findEventByCreaterEmail: (email: string) => Promise<any>;
export declare const registerParticipant: (data: any) => Promise<any>;
export declare const checkIfParticipentAlreadyExist: (
    data: any
) => Promise<any>;
export declare const unRegisterParticipant: (data: any) => Promise<any>;
export declare const findEventById: (id: string) => Promise<any>;
export declare const findEvents: (
    page: number,
    limit: number,
    startDate?: Date,
    endDate?: Date,
    search?: string
) => Promise<{
    events: any;
    totalEvents: any;
}>;
export declare const findJoinedEventsByEmployer: (
    page: number,
    limit: number,
    employerId: string,
    startDate?: Date,
    endDate?: Date,
    search?: string
) => Promise<{
    events: any;
    totalEvents: any;
}>;
export declare const findUpcomingEvents: (
    page: any,
    limit: any,
    userId: any
) => Promise<{
    events: any;
    totalEvents: any;
}>;
export declare const findInstituteUpcomingEvents: (
    page: number,
    limit: number,
    instituteId: string,
    startDate?: string | null,
    endDate?: string | null
) => Promise<{
    events: any;
    totalEvents: any;
}>;
export declare const findRequestedEvents: (
    instituteId: any,
    page: any,
    limit: any
) => Promise<{
    events: any;
    totalEvents: any;
}>;
export declare const findInstitutePastEvents: (
    page: number,
    limit: number,
    instituteId: string,
    startDate?: string | null,
    endDate?: string | null
) => Promise<{
    events: any;
    totalEvents: any;
}>;
export declare const findEventWithStatus: (
    page: number,
    limit: number,
    instituteId: string,
    status: string,
    startDate?: string | null,
    endDate?: string | null
) => Promise<{
    events: any;
    totalEvents: any;
}>;
export declare const findPastEvents: (
    page: any,
    limit: any,
    userId: any
) => Promise<{
    events: any;
    totalEvents: any;
}>;
export declare const findOngoingEvents: (
    page: any,
    limit: any,
    userId: any
) => Promise<{
    events: any;
    totalEvents: any;
}>;
export declare const findEventEmployersParticipents: (
    page: number,
    limit: number,
    eventId?: string
) => Promise<{
    employers: any;
    totalEmployers: any;
}>;
export declare const findEventStudentsParticipents: (
    page: number,
    limit: number,
    eventId?: string
) => Promise<{
    students: any;
    totalStudents: any;
}>;
export declare const findAndUpdateEventEmployersParticipants: (
    eventId: string,
    employerIds: string[]
) => Promise<{
    employers: any;
    totalEmployers: any;
}>;
export declare const findEventParticipants: (
    page: number,
    limit: number,
    eventId: string
) => Promise<{
    success: boolean;
    participants: any;
    totalParticipants: any;
}>;
export declare const findEventsByOrganizer: (
    page: number,
    limit: number | 'All',
    startDate?: Date,
    endDate?: Date,
    eventFromDate?: Date,
    search?: string,
    organizerType?: string,
    organizerId?: string
) => Promise<{
    events: any;
    totalEvents: any;
}>;
export declare const findEventsByParticipants: (
    page: number,
    limit: number,
    startDate?: Date,
    endDate?: Date,
    search?: string,
    participantType?: string,
    participantId?: string
) => Promise<{
    events: any;
    totalEvents: any;
}>;
export declare const registerEvent: (data: any) => Promise<any>;
export declare const findEventByIdAndUpdate: (
    id: string,
    data: any
) => Promise<any>;
export declare const removeEvent: (
    id: string,
    sendEmails: any,
    adminName: any
) => Promise<any>;
export declare const removeEventRegistration: (
    eventId?: string,
    branchId?: string
) => Promise<any>;
