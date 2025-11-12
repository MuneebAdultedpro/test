import { Request, Response } from 'express';
declare const getAllTestsTemplatesController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getTestQuestionsByTypeController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const submitTestResultController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const addNewQuestionController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const updateQuestionController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getUserTestAttemptsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getAllQuestionsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
export {
    getAllTestsTemplatesController,
    getTestQuestionsByTypeController,
    submitTestResultController,
    getUserTestAttemptsController,
    addNewQuestionController,
    getAllQuestionsController,
    updateQuestionController,
};
