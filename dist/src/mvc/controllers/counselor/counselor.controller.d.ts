import { Request, Response } from 'express';
declare const getAllDocsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getInstitutionDocsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const updateDocController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const deleteDocController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
export {
    getAllDocsController,
    updateDocController,
    getInstitutionDocsController,
    deleteDocController,
};
