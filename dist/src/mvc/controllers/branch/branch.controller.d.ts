import { Request, Response } from 'express';
declare const createBranchController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const addEmployerController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getEmployerController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getEmployersController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getEmployersOpenPositionsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getBranchByIdController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getBranchByUserIdController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getBranchesController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getBranchesOfEmployerConrtoller: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getJobApplicationsByEmployerEmailController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getAllJobApplicationsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const deleteBranchController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const updateBranchController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getEmployerDashboardCountsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getEmployerByCompanyAndBranchController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getEmployerMainBranchController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
export {
    createBranchController,
    getBranchesController,
    getBranchByIdController,
    getEmployerController,
    getEmployersController,
    deleteBranchController,
    getEmployersOpenPositionsController,
    getBranchesOfEmployerConrtoller,
    getBranchByUserIdController,
    getJobApplicationsByEmployerEmailController,
    updateBranchController,
    getEmployerDashboardCountsController,
    getEmployerByCompanyAndBranchController,
    getEmployerMainBranchController,
    getAllJobApplicationsController,
    addEmployerController,
};
