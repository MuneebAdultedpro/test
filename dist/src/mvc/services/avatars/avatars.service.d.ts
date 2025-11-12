declare const getAvatars: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          avatars: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          avatars?: undefined;
      }
>;
declare const getProgramAvatars: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          avatars: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          avatars?: undefined;
      }
>;
export { getAvatars, getProgramAvatars };
