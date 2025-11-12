'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getTodosByUserIdController =
    exports.createTodoController =
    exports.getSingleTodoController =
    exports.updateTodoController =
    exports.deleteTodoController =
    exports.getTodosController =
        void 0;
const todo_1 = require('../../services/todo');
const todo_service_1 = require('../../services/todo/todo.service');
const getTodosController = async (req, res) => {
    try {
        const result = await (0, todo_1.getTodos)(req);
        if (result.success) {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    todos:
                        result === null || result === void 0
                            ? void 0
                            : result.todos,
                    totalTodos:
                        result === null || result === void 0
                            ? void 0
                            : result.totalTodos,
                    totalPages:
                        result === null || result === void 0
                            ? void 0
                            : result.totalPages,
                    currentPage:
                        result === null || result === void 0
                            ? void 0
                            : result.currentPage,
                });
        } else {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    message:
                        result === null || result === void 0
                            ? void 0
                            : result.message,
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.getTodosController = getTodosController;
const getTodosByUserIdController = async (req, res) => {
    try {
        const result = await (0, todo_service_1.getTodosByUserId)(req);
        if (result.success) {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    todos:
                        result === null || result === void 0
                            ? void 0
                            : result.todos,
                });
        } else {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    message:
                        result === null || result === void 0
                            ? void 0
                            : result.message,
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.getTodosByUserIdController = getTodosByUserIdController;
const getSingleTodoController = async (req, res) => {
    try {
        const result = await (0, todo_service_1.getSingleTodo)(req);
        if (result.success) {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    todo:
                        result === null || result === void 0
                            ? void 0
                            : result.todo,
                });
        } else {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    message:
                        result === null || result === void 0
                            ? void 0
                            : result.message,
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.getSingleTodoController = getSingleTodoController;
const deleteTodoController = async (req, res) => {
    try {
        const result = await (0, todo_service_1.deleteTodo)(req);
        if (result.success) {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    todo:
                        result === null || result === void 0
                            ? void 0
                            : result.todo,
                });
        } else {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    message:
                        result === null || result === void 0
                            ? void 0
                            : result.message,
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.deleteTodoController = deleteTodoController;
const updateTodoController = async (req, res) => {
    try {
        const result = await (0, todo_service_1.updateTodo)(req);
        if (result.success) {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    todo:
                        result === null || result === void 0
                            ? void 0
                            : result.todo,
                });
        } else {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    message:
                        result === null || result === void 0
                            ? void 0
                            : result.message,
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.updateTodoController = updateTodoController;
const createTodoController = async (req, res) => {
    try {
        const result = await (0, todo_service_1.createTodo)(req);
        if (result.success) {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    todo:
                        result === null || result === void 0
                            ? void 0
                            : result.todo,
                });
        } else {
            return res
                .status(
                    result === null || result === void 0
                        ? void 0
                        : result.statusCode
                )
                .json({
                    success:
                        result === null || result === void 0
                            ? void 0
                            : result.success,
                    message:
                        result === null || result === void 0
                            ? void 0
                            : result.message,
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.createTodoController = createTodoController;
//# sourceMappingURL=todo.controller.js.map
