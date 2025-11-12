declare const getAllTestsTemplates: (req: any) => Promise<
    | {
          message: string;
          statusCode: number;
          success: boolean;
          testTemplates: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          testTemplates?: undefined;
      }
>;
declare const getTestQuestionsByType: (req: any) => Promise<
    | {
          message: string;
          success: boolean;
          statusCode: number;
          testType: any;
          testTitle: any;
          questions: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          testType?: undefined;
          testTitle?: undefined;
          questions?: undefined;
      }
>;
declare const submitTestResult: (req: any) => Promise<
    | {
          message: string;
          statusCode: number;
          success: boolean;
          testAttempt: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          testAttempt?: undefined;
      }
>;
declare const addNewQustion: (req: any) => Promise<
    | {
          message: string;
          statusCode: number;
          success: boolean;
          question: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          question?: undefined;
      }
>;
declare const updateQustion: (req: any) => Promise<
    | {
          message: string;
          statusCode: number;
          success: boolean;
          question: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          question?: undefined;
      }
>;
declare const getAllTestAttemptsByUser: (req: any) => Promise<
    | {
          message: string;
          statusCode: number;
          success: boolean;
          testAttempts: any;
          totalTestAttempts: any;
          totalPages: any;
          currentPage: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          testAttempts?: undefined;
          totalTestAttempts?: undefined;
          totalPages?: undefined;
          currentPage?: undefined;
      }
>;
declare const getAllQuestions: (req: any) => Promise<
    | {
          message: string;
          statusCode: number;
          success: boolean;
          questions: any;
          totalQuestions: any;
          totalPages: any;
          currentPage: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          questions?: undefined;
          totalQuestions?: undefined;
          totalPages?: undefined;
          currentPage?: undefined;
      }
>;
export {
    getAllTestsTemplates,
    getTestQuestionsByType,
    submitTestResult,
    getAllTestAttemptsByUser,
    addNewQustion,
    getAllQuestions,
    updateQustion,
};
