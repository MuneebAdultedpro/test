import { Request } from 'express';
declare const getTodos: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          todos: any;
          totalTodos: any;
          totalPages: any;
          currentPage: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          todos?: undefined;
          totalTodos?: undefined;
          totalPages?: undefined;
          currentPage?: undefined;
      }
>;
declare const getTodosByUserId: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          todos: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          todos?: undefined;
      }
>;
declare const getSingleTodo: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          todo: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          todo?: undefined;
      }
>;
declare const deleteTodo: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          todo: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          todo?: undefined;
      }
>;
declare const updateTodo: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          todo: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          todo?: undefined;
      }
>;
declare const createTodo: (req: Request) => Promise<
    | {
          todo: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          todo?: undefined;
      }
>;
export {
    getTodos,
    deleteTodo,
    updateTodo,
    getSingleTodo,
    createTodo,
    getTodosByUserId,
};
