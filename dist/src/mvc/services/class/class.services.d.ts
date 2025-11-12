declare const createClassService: (req: any) => Promise<
    | {
          class: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          class?: undefined;
      }
>;
declare const getAllClassesService: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          classes: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          classes?: undefined;
      }
>;
declare const getClassByIdService: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          class: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          class?: undefined;
      }
>;
declare const getClassesByUserIdService: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          classes: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          classes?: undefined;
      }
>;
declare const assignTeacherToClassesService: (req: any) => Promise<{
    success: boolean;
    statusCode: number;
    message: any;
}>;
declare const updateClassService: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          class: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          class?: undefined;
      }
>;
declare const deleteClassService: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          class: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          class?: undefined;
      }
>;
declare const getClassStudentsService: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          students: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          students?: undefined;
      }
>;
export {
    createClassService,
    getAllClassesService,
    getClassByIdService,
    getClassesByUserIdService,
    assignTeacherToClassesService,
    deleteClassService,
    updateClassService,
    getClassStudentsService,
};
