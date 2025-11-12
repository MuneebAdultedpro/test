import { Request, Response } from 'express';
declare const addMockInterViewSessionController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const updateMockInterviewSessionController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getMockInterviewSessionController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
export {
    getMockInterviewSessionController,
    addMockInterViewSessionController,
    updateMockInterviewSessionController,
};
