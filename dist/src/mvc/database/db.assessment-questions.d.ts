declare const getAssessmentQuestionsList: () => Promise<any>;
declare const findStudentAttemptsByUserId: (userId: any) => Promise<any>;
declare const createStudentAttempt: (
    userId: any,
    newAttempt: any
) => Promise<any>;
declare const addingAttemptInExistingStudentAttempts: (
    studentAttempts: any,
    newAttempt: any
) => Promise<any>;
declare const findStudentAssessmentAttempts: (userId: any) => Promise<any>;
declare const getCareerPathsList: () => Promise<any>;
declare const getAssessmentAttemptByUserIdAndId: (
    userId: any,
    assessmentId: any
) => Promise<
    | {
          success: boolean;
          fullAttempts: any;
          matchingAttempt: any;
          message?: undefined;
      }
    | {
          success: boolean;
          message: any;
          fullAttempts?: undefined;
          matchingAttempt?: undefined;
      }
>;
declare const updateAssessmentAttemptInDB: (
    userId: any,
    assessmentId: any,
    updateData: any
) => Promise<boolean>;
declare const getUpdatedAssessmentAttemptFromDB: (
    userId: any,
    assessmentId: any
) => Promise<any>;
export {
    getAssessmentQuestionsList,
    findStudentAttemptsByUserId,
    createStudentAttempt,
    addingAttemptInExistingStudentAttempts,
    findStudentAssessmentAttempts,
    getCareerPathsList,
    getAssessmentAttemptByUserIdAndId,
    getUpdatedAssessmentAttemptFromDB,
    updateAssessmentAttemptInDB,
};
