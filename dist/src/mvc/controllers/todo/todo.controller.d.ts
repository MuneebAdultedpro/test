import { Request, Response } from 'express';
declare const getTodosController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getTodosByUserIdController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getSingleTodoController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const deleteTodoController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const updateTodoController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const createTodoController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
export {
    getTodosController,
    deleteTodoController,
    updateTodoController,
    getSingleTodoController,
    createTodoController,
    getTodosByUserIdController,
};
