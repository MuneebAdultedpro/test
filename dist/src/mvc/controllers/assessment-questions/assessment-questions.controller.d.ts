import { Request, Response } from 'express';
declare const getAssessmentQuestionsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getAssessmentAttemptsController: (
    req: any,
    res: any
) => Promise<any>;
declare const postAssessmentQuestionsController: (
    req: any,
    res: any
) => Promise<any>;
declare const updateAssessmentAttemptController: (
    req: any,
    res: any
) => Promise<any>;
declare const getAllCareerPathsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const exploreNextStepController: (req: any, res: any) => Promise<any>;
export {
    getAssessmentQuestionsController,
    postAssessmentQuestionsController,
    getAssessmentAttemptsController,
    updateAssessmentAttemptController,
    getAllCareerPathsController,
    exploreNextStepController,
};
