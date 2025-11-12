import { AssessmentsTestType } from '../../interfaces/assessments.interface';
export declare const findAllTestTemplates: (
    testTypes?: AssessmentsTestType[]
) => Promise<any>;
export declare const getTestTemplateByType: (testType: any) => Promise<any>;
export declare const getRandomQuestionsByCategory: (
    category: any,
    limit?: number
) => Promise<any>;
export declare const saveTestAttempt: (attemptData: any) => Promise<any>;
export declare const saveNewQuestion: (questionData: any) => Promise<any>;
export declare const updateQuestionById: (
    questionId: any,
    questionData: any
) => Promise<any>;
export declare const findAllAttemptsByUser: (
    userId: any,
    testTypes: AssessmentsTestType[],
    limit: any,
    page: any
) => Promise<{
    testAttempts: any;
    totalTestAttempts: any;
    totalPages: number;
    currentPage: any;
}>;
export declare const findAllQuestions: (
    limit: any,
    page: any
) => Promise<{
    questions: any;
    totalQuestions: any;
    totalPages: number;
    currentPage: any;
}>;
