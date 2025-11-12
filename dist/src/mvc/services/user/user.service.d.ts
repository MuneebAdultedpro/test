import { Request } from 'express';
declare const getUser: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          user: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          user?: undefined;
      }
>;
declare const getUserById: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          user: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          user?: undefined;
      }
>;
declare const getUserByEmail: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          user: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          user?: undefined;
      }
>;
declare const deleteUser: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          user: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          user?: undefined;
      }
>;
declare const getAllUsers: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          users: any;
          totalUsers: any;
          totalPages: number;
          currentPage: number;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          users?: undefined;
          totalUsers?: undefined;
          totalPages?: undefined;
          currentPage?: undefined;
      }
>;
declare const getUsersWithData: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          users: any;
          totalUsers: any;
          totalPages: number;
          currentPage: number;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          users?: undefined;
          totalUsers?: undefined;
          totalPages?: undefined;
          currentPage?: undefined;
      }
>;
declare const updateUser: (req: any) => Promise<
    | {
          updateUser: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          updateUser?: undefined;
      }
>;
declare const createUser: (req: Request) => Promise<
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
export {
    getUser,
    getAllUsers,
    getUsersWithData,
    updateUser,
    deleteUser,
    getUserById,
    createUser,
    getUserByEmail,
};
