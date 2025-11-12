export declare const findAllChats: () => Promise<any>;
export declare const findChatByIdAndUpdate: (
    chatId: any,
    chatData: any
) => Promise<any>;
export declare const findUserChats: (
    userId: string,
    page?: number,
    limit?: number,
    search?: string
) => Promise<any>;
export declare const findEmployerChats: (
    userId: string,
    page?: number,
    limit?: number,
    search?: string
) => Promise<any>;
export declare const findChatWithParticipantIds: (
    userId: string,
    participantId: string
) => Promise<any>;
export declare const findStudentEmployerChats: (
    userId: string,
    jobId: string,
    page?: number,
    limit?: number,
    search?: string
) => Promise<any>;
export declare const findMultipleUsersChats: (
    userIds: string[],
    page?: number,
    limit?: number,
    search?: string
) => Promise<any>;
export declare const dashboardChatsCount: (
    userId: string,
    studentIds?: string[]
) => Promise<any>;
export declare const findUsersNotifiedForChatCompletion: (
    page: number,
    limit: number,
    startDate?: Date,
    endDate?: Date
) => Promise<{
    chats: any;
    totalChats: any;
    totalPages: number;
    currentPage: number;
}>;
export declare const startChat: (chatData: any) => Promise<any>;
export declare const startChatAndMessage: (
    chatData: any,
    messageData: any
) => Promise<{
    chat: any;
    newMessage: any;
}>;
export declare const getStudentsTeacherChat: (teacher_id: any) => Promise<any>;
export declare const getChatofTeacherProgram: (
    teacher_id: any,
    program_id: any,
    institute_id: any
) => Promise<any>;
export declare const findUserChatsByChatType: (
    userId: string,
    page: number,
    limit: number,
    chatType: string,
    search?: string
) => Promise<any>;
export declare const findInstituteAndStudentChats: (
    userId: string,
    page?: number,
    limit?: number,
    search?: string
) => Promise<any>;
