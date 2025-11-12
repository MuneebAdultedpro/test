import { Request } from 'express';
declare const loginUser: (req: Request) => Promise<
    | {
          message: string;
          statusCode: number;
          success: boolean;
          user?: undefined;
          token?: undefined;
      }
    | {
          user: any;
          message: string;
          statusCode: number;
          success: boolean;
          token: any;
      }
>;
declare const registerUser: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          user?: undefined;
          token?: undefined;
          error?: undefined;
      }
    | {
          user: any;
          message: string;
          statusCode: number;
          success: boolean;
          token: any;
          error?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          message: string;
          error: any;
          user?: undefined;
          token?: undefined;
      }
>;
export { loginUser, registerUser };
