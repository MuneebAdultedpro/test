import { Request, Response } from 'express';
declare const getStudentsOfClassController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const updateClassController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const deletClassController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const assignTeacherToClassesController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const createClassController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getAllClassesController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getClassByIdController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getClassByUserIdController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
export {
    getClassByIdController,
    createClassController,
    getAllClassesController,
    getClassByUserIdController,
    assignTeacherToClassesController,
    updateClassController,
    deletClassController,
    getStudentsOfClassController,
};
