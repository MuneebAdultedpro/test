'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getTodosByUserId =
    exports.createTodo =
    exports.getSingleTodo =
    exports.updateTodo =
    exports.deleteTodo =
    exports.getTodos =
        void 0;
const db_todo_1 = require('../../database/db.todo');
const getTodos = async (req) => {
    var _a, _b, _c;
    try {
        const page =
            parseInt(
                (_a = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _a === void 0
                    ? void 0
                    : _a.page
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.limit
            ) || 10;
        const search =
            (_c = req === null || req === void 0 ? void 0 : req.query) ===
                null || _c === void 0
                ? void 0
                : _c.search;
        const { todos, totalTodos, totalPages, currentPage } = await (0,
        db_todo_1.getTodosList)(search, limit, page);
        return {
            success: true,
            statusCode: 200,
            message: 'Todos retrieved successfully',
            todos,
            totalTodos,
            totalPages,
            currentPage,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getTodos = getTodos;
const getTodosByUserId = async (req) => {
    var _a;
    try {
        const userId =
            (_a = req === null || req === void 0 ? void 0 : req.user) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const todos = await (0, db_todo_1.getTodosListByUserId)(userId);
        return {
            success: true,
            statusCode: 200,
            message: 'Todos retrieved successfully',
            todos,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getTodosByUserId = getTodosByUserId;
const getSingleTodo = async (req) => {
    var _a;
    try {
        const todoId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const todo = await (0, db_todo_1.findTodo)(todoId);
        return {
            success: true,
            statusCode: 200,
            message: 'Todo retrieved successfully',
            todo,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getSingleTodo = getSingleTodo;
const deleteTodo = async (req) => {
    var _a;
    try {
        const todoId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const todo = await (0, db_todo_1.deleteSingleTodo)(todoId);
        return {
            success: true,
            statusCode: 200,
            message: 'Todos removed successfully',
            todo,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.deleteTodo = deleteTodo;
const updateTodo = async (req) => {
    var _a;
    try {
        const todoId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const todo = await (0, db_todo_1.updateSingleTodo)(
            todoId,
            req === null || req === void 0 ? void 0 : req.body
        );
        return {
            success: true,
            statusCode: 200,
            message: 'Todos updated successfully',
            todo,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.updateTodo = updateTodo;
const createTodo = async (req) => {
    try {
        const newProgram = await (0, db_todo_1.registerTodo)(
            req === null || req === void 0 ? void 0 : req.body
        );
        if (newProgram) {
            return {
                todo: newProgram,
                message: 'New Todo registered Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 403,
                message: 'Error Creating Todo',
            };
        }
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.createTodo = createTodo;
//# sourceMappingURL=todo.service.js.map
