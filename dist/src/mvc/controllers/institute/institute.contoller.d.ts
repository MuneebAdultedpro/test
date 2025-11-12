import { Request, Response } from 'express';
declare const createInstituteController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const requestInstituteForApprovalController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getInstituteController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getInstitutesController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getConsortiumInstitutesByInstituteIdController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const fetchTeachersOfInstitutionContoller: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const updateInstitutesController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getInstitueEmployersController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const createProgramController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getProgramController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getProgramsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getInstituteUsersByProgramIdController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getDashboardCountsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getEmployerCountsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getUsersByRoleController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getProgramsWithStudentsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getJobApplicationsByInstituteIdController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
export {
    createInstituteController,
    getInstituteController,
    getInstitutesController,
    getDashboardCountsController,
    getProgramController,
    getProgramsController,
    createProgramController,
    updateInstitutesController,
    getInstitueEmployersController,
    requestInstituteForApprovalController,
    getInstituteUsersByProgramIdController,
    fetchTeachersOfInstitutionContoller,
    getUsersByRoleController,
    getProgramsWithStudentsController,
    getJobApplicationsByInstituteIdController,
    getConsortiumInstitutesByInstituteIdController,
    getEmployerCountsController,
};
