import { Request, Response } from 'express';
declare const getTeacherStudentsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const updateTeacherController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const unApprovedTeacherController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getTeacherProgramsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const assignProgramToTeacherController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
export {
    getTeacherStudentsController,
    getTeacherProgramsController,
    assignProgramToTeacherController,
    updateTeacherController,
    unApprovedTeacherController,
};
