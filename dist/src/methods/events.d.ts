export declare const getEventDate: (date: any) => string;
export declare const getEventTime: (time: any) => string;
export declare const sendEventEmailToUsers: ({
    users,
    templateName,
    subject,
    eventData,
    adminName,
    branchName,
}: {
    users: any[];
    templateName: string;
    subject: string;
    eventData: any;
    adminName?: string;
    branchName?: string;
}) => Promise<void>;
export declare const sendCreatorEmail: ({
    event,
    templateName,
    subject,
    adminName,
    schoolName,
}: {
    event: any;
    templateName: string;
    subject: string;
    adminName?: string;
    schoolName?: string;
}) => Promise<void>;
