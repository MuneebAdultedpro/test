export declare const getIDfromToken: (req: any) => any;
export declare const getFcmTokensForUserIds: (userIds: any) => Promise<any>;
declare const CreateSchema: (schema: any) => any;
export { CreateSchema };
export declare const sendEmail: ({
    templateName,
    data,
}: {
    templateName: any;
    data: any;
}) => Promise<boolean>;
