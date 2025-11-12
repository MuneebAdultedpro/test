declare const addMockInterviewSession: (req: any) => Promise<
    | {
          interviewMessages: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          interviewMessages?: undefined;
      }
>;
declare const updateMockInterviewSessionService: (req: any) => Promise<
    | {
          interviewMessages: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          interviewMessages?: undefined;
      }
>;
declare const getMockInterviewSession: (req: any) => Promise<
    | {
          mockInterviews: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          mockInterviews?: undefined;
      }
>;
export {
    addMockInterviewSession,
    getMockInterviewSession,
    updateMockInterviewSessionService,
};
