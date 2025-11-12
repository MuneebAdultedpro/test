import { Request, Response } from 'express';
declare const getUserController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getUserByIdController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getUserByEmailController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const updateUserController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getAllUsersController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getUsersWithDataController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const deleteUserController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const createUserController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
export {
    getUserController,
    getUsersWithDataController,
    updateUserController,
    deleteUserController,
    getUserByIdController,
    getUserByEmailController,
    getAllUsersController,
    createUserController,
};
