import { Request } from 'express';
declare const postJob: (req: Request) => Promise<
    | {
          job: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          job?: undefined;
      }
>;
declare const applyJob: (req: Request) => Promise<
    | {
          jobApplication: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          jobApplication?: undefined;
      }
>;
declare const getJobs: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          jobs: any;
          totalJobs: any;
          totalPages: any;
          currentPage: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          jobs?: undefined;
          totalJobs?: undefined;
          totalPages?: undefined;
          currentPage?: undefined;
      }
>;
declare const getAllApplications: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          applications: any;
          totalApplications: any;
          totalPages: any;
          currentPage: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          applications?: undefined;
          totalApplications?: undefined;
          totalPages?: undefined;
          currentPage?: undefined;
      }
>;
declare const getSavedJobs: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          jobs: any;
          totalJobs: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          jobs?: undefined;
          totalJobs?: undefined;
      }
>;
declare const getAppliedJobs: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          jobs: any;
          totalJobs: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          jobs?: undefined;
          totalJobs?: undefined;
      }
>;
declare const getApplicantAppliedJobs: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          jobs: any;
          totalJobs: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          jobs?: undefined;
          totalJobs?: undefined;
      }
>;
declare const getJob: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          job: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          job?: undefined;
      }
>;
declare const getJobByUserIdService: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          jobs: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          jobs?: undefined;
      }
>;
declare const getByEmployerEmail: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          jobs: any;
          totalPages: any;
          currentPage: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          jobs?: undefined;
          totalPages?: undefined;
          currentPage?: undefined;
      }
>;
declare const getByEmployerId: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          jobs: any;
          totalPages: any;
          currentPage: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          jobs?: undefined;
          totalPages?: undefined;
          currentPage?: undefined;
      }
>;
declare const updateJobService: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          updatedJob: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          updatedJob?: undefined;
      }
>;
declare const deleteJob: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          job: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          job?: undefined;
      }
>;
declare const getApplications: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          applications: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          applications?: undefined;
      }
>;
declare const updateApplication: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          application: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          application?: undefined;
      }
>;
export {
    getJob,
    getJobs,
    deleteJob,
    getSavedJobs,
    getAppliedJobs,
    postJob,
    updateJobService,
    getJobByUserIdService,
    applyJob,
    getApplications,
    updateApplication,
    getApplicantAppliedJobs,
    getByEmployerEmail,
    getByEmployerId,
    getAllApplications,
};
