import { Request, Response } from 'express';
declare const userLogin: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const userRegister: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
export { userLogin, userRegister };
