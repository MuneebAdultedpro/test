import { Request, Response } from 'express';
declare const allAnnouncementsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const instituteAnnouncementsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getStudentAnnouncementsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getAnnouncementByIdController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const createAnnouncementController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const updateAnnouncementController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
export {
    allAnnouncementsController,
    instituteAnnouncementsController,
    getAnnouncementByIdController,
    createAnnouncementController,
    updateAnnouncementController,
    getStudentAnnouncementsController,
};
