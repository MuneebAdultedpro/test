import { Request, Response } from 'express';
declare const getTeacherProgramChatController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getTeacherStudentChatController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getAllChatsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getUserChatsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getEmployerChatController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getUserChatsByChatTypeController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getInstitueAndStudentChatsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getStudentEmployerChatController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getMultipleUsersChatsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const inititateChatAndMessageController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const createChatController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getNotifiedForChatCompletion: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const updateChatController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getChatWithParticipantIdsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
export {
    getAllChatsController,
    getUserChatsController,
    getMultipleUsersChatsController,
    createChatController,
    getStudentEmployerChatController,
    updateChatController,
    getUserChatsByChatTypeController,
    inititateChatAndMessageController,
    getEmployerChatController,
    getTeacherStudentChatController,
    getTeacherProgramChatController,
    getChatWithParticipantIdsController,
    getInstitueAndStudentChatsController,
    getNotifiedForChatCompletion,
};
