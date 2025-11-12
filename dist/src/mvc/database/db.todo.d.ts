export declare const getTodosList: (
    search?: string,
    limit?: number,
    page?: number
) => Promise<{
    todos: any;
    totalTodos: any;
    totalPages: number;
    currentPage: number;
}>;
export declare const getTodosListByUserId: (userId: string) => Promise<any>;
export declare const findTodo: (id: string) => Promise<any>;
export declare const deleteSingleTodo: (todoId: string) => Promise<any>;
export declare const registerTodo: (data: any) => Promise<any>;
export declare const updateSingleTodo: (id: string, data: any) => Promise<any>;
