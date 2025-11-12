declare const assignprogramsToTeacherService: (req: any) => Promise<
    | {
          status: boolean;
          statusCode: number;
          message: string;
          success?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          status?: undefined;
      }
>;
declare const getTeacherStudentsService: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          students: any;
          message?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          students?: undefined;
      }
>;
declare const updateTeacher: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          teacher: any;
          message?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          teacher?: undefined;
      }
>;
declare const getTeacherProgramsService: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          programs: any;
          message?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          programs?: undefined;
      }
>;
declare const unApprovedTeacher: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          teachers: any;
          totalPages: any;
          totalTeachers: any;
          message?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          teachers?: undefined;
          totalPages?: undefined;
          totalTeachers?: undefined;
      }
>;
export {
    assignprogramsToTeacherService,
    getTeacherStudentsService,
    getTeacherProgramsService,
    updateTeacher,
    unApprovedTeacher,
};
