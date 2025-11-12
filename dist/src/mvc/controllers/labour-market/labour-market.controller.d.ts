import { Request, Response } from 'express';
declare const getLabourMarketStatsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
export { getLabourMarketStatsController };
