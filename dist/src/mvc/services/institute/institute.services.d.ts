import { Request } from 'express';
declare const createInstitute: (req: Request) => Promise<
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
declare const requestInstituteForApproval: (req: Request) => Promise<
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
declare const updateInstitute: (req: any) => Promise<
    | {
          updatedInstitute: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          updatedInstitute?: undefined;
      }
>;
declare const getInstitueEmployers: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          employers: any;
          totalEmployers: any;
          totalPages: any;
          currentPage: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          employers?: undefined;
          totalEmployers?: undefined;
          totalPages?: undefined;
          currentPage?: undefined;
      }
>;
declare const createProgram: (req: Request) => Promise<
    | {
          program: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          program?: undefined;
      }
>;
declare const getProgram: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          program: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          program?: undefined;
      }
>;
declare const getPrograms: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          programs: any;
          totalPrograms: any;
          totalPages: any;
          currentPage: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          programs?: undefined;
          totalPrograms?: undefined;
          totalPages?: undefined;
          currentPage?: undefined;
      }
>;
declare const getInstituteUsersByProgramId: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          users: any;
          totalUsers: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          users?: undefined;
          totalUsers?: undefined;
      }
>;
declare const getInstitute: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          institute: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          institute?: undefined;
      }
>;
declare const getInstitutes: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          institutes: any;
          totalInstitutes: any;
          totalPages: any;
          currentPage: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          institutes?: undefined;
          totalInstitutes?: undefined;
          totalPages?: undefined;
          currentPage?: undefined;
      }
>;
declare const getConsortiumInstitutesByInstituteId: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          institutes: any;
          totalInstitutes: any;
          totalPages: any;
          currentPage: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          institutes?: undefined;
          totalInstitutes?: undefined;
          totalPages?: undefined;
          currentPage?: undefined;
      }
>;
declare const getInstituteTeachers: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          teachers: any;
          totalTeachers: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          teachers?: undefined;
          totalTeachers?: undefined;
      }
>;
declare const getDashboardCounts: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          counts: {
              studentsCount: any;
              jobCounts: any;
              swipeCounts: any;
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
declare const getEmployerCounts: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          counts: {
              employersCount: any;
              jobCounts: any;
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
declare const getUsersByRole: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          users: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          users?: undefined;
      }
>;
declare const getProgramsWithStudents: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          users: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          users?: undefined;
      }
>;
declare const getJobApplicationsByInstituteId: (req: any) => Promise<
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
export {
    createInstitute,
    getInstitutes,
    getInstitute,
    getDashboardCounts,
    createProgram,
    getProgram,
    getPrograms,
    getInstitueEmployers,
    updateInstitute,
    requestInstituteForApproval,
    getInstituteUsersByProgramId,
    getInstituteTeachers,
    getUsersByRole,
    getProgramsWithStudents,
    getJobApplicationsByInstituteId,
    getConsortiumInstitutesByInstituteId,
    getEmployerCounts,
};
