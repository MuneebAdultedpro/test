import { Request, Response } from 'express';
declare const postjobController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const applyJobController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getJobController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getJobsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getAllApplicationsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getSavedJobsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getAppliedJobsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getApplicantAppliedJobsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getJobsByUserIdController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getByEmployerEmailController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const deleteJobController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const updateJobController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getApplicationsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const updateApplicationController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
export {
    updateJobController,
    postjobController,
    getJobController,
    getJobsController,
    deleteJobController,
    getAppliedJobsController,
    getSavedJobsController,
    getJobsByUserIdController,
    applyJobController,
    getApplicationsController,
    updateApplicationController,
    getApplicantAppliedJobsController,
    getByEmployerEmailController,
    getAllApplicationsController,
};
