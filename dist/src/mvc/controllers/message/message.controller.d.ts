import { Request, Response } from 'express';
declare const getChatMessagesController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const sendMessageController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
export { getChatMessagesController, sendMessageController };
