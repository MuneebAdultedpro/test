import { Request } from 'express';
declare const getAssessmentQuestions: () => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          questions: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          questions?: undefined;
      }
>;
declare const getAssessmentAttempts: (userId: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          attempts: any;
          dataFound: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: string;
          attempts?: undefined;
          dataFound?: undefined;
      }
>;
declare const postAssessmentQuestion: (
    userId: any,
    status: any,
    questionWithResponse: any
) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          attempt: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          attempt?: undefined;
      }
>;
declare const validateUpdateAssessmentAttempt: (
    userId: any,
    assessmentId: any,
    status: any,
    questionWithResponse: any
) => string;
declare const validateGetAssessmentAttempts: (userId: any) => string;
declare const validatePostAssessmentQuestions: (
    userId: any,
    status: any,
    questionWithResponse: any
) =>
    | 'User ID and status are required'
    | 'Questions are required and should not be empty';
declare const updateAssessmentAttempt: (
    userId: any,
    assessmentId: any,
    status: any,
    questionWithResponse: any
) => Promise<
    | {
          success: boolean;
          status: number;
          message: string;
          updatedAttempt: any;
          allUserAssessmentAttempts: any;
      }
    | {
          success: boolean;
          message: any;
          status?: undefined;
          updatedAttempt?: undefined;
          allUserAssessmentAttempts?: undefined;
      }
>;
declare const getAllCareerPaths: () => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          careerPaths: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          careerPaths?: undefined;
      }
>;
declare const exploreNextStep: (req: Request) => Promise<{
    success: boolean;
    statusCode: number;
    message: any;
}>;
export {
    getAssessmentQuestions,
    postAssessmentQuestion,
    getAssessmentAttempts,
    updateAssessmentAttempt,
    getAllCareerPaths,
    validateUpdateAssessmentAttempt,
    validateGetAssessmentAttempts,
    exploreNextStep,
    validatePostAssessmentQuestions,
};
