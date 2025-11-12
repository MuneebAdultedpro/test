import { Request, Response } from 'express';
declare const getAvatarsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getProgramAvatarsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
export { getAvatarsController, getProgramAvatarsController };
