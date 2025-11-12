import { Request } from 'express';
declare const createBranch: (req: Request) => Promise<
    | {
          user: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          user?: undefined;
      }
>;
declare const addEmployer: (req: Request) => Promise<
    | {
          user: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          user?: undefined;
      }
>;
declare const getEmployers: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          employers: any;
          totalEmployers: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          employers?: undefined;
          totalEmployers?: undefined;
      }
>;
declare const getEmployer: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          employer: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          employer?: undefined;
      }
>;
declare const getEmployerOpenPosition: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          openPositions: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          openPositions?: undefined;
      }
>;
declare const deleteBranch: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          branch: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          branch?: undefined;
      }
>;
declare const updateBranch: (req: any) => Promise<
    | {
          updateBranch: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          updateBranch?: undefined;
      }
>;
declare const getEmployerDashboardCounts: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          counts: {
              jobCounts: any;
              swipeCounts: any;
              applicationCounts: any;
              chatCounts: any;
          };
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          counts?: undefined;
      }
>;
declare const getEmployerByCompanyAndBranch: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          branch: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          branch?: undefined;
      }
>;
declare const getEmployerMainBranch: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          branch: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          branch?: undefined;
      }
>;
declare const getBranchById: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          branch: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          branch?: undefined;
      }
>;
declare const getBranchByUserId: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          branch: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          branch?: undefined;
      }
>;
declare const getBranches: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          branches: any;
          totalBranches: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          branches?: undefined;
          totalBranches?: undefined;
      }
>;
declare const getBranchesOfEmployer: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          branches: any;
          totalBranches: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          branches?: undefined;
          totalBranches?: undefined;
      }
>;
declare const getJobApplicationsByEmployerEmail: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          applications: any;
          totalApplications: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          applications?: undefined;
          totalApplications?: undefined;
      }
>;
declare const getAllJobApplications: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          applications: any;
          totalApplications: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          applications?: undefined;
          totalApplications?: undefined;
      }
>;
export {
    createBranch,
    getBranches,
    getBranchById,
    getEmployers,
    getEmployer,
    deleteBranch,
    getEmployerOpenPosition,
    getBranchesOfEmployer,
    getBranchByUserId,
    getJobApplicationsByEmployerEmail,
    updateBranch,
    getEmployerDashboardCounts,
    getEmployerByCompanyAndBranch,
    getEmployerMainBranch,
    getAllJobApplications,
    addEmployer,
};
