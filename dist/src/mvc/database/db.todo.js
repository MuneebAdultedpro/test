'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.updateSingleTodo =
    exports.registerTodo =
    exports.deleteSingleTodo =
    exports.findTodo =
    exports.getTodosListByUserId =
    exports.getTodosList =
        void 0;
const models_1 = require('../models');
const getTodosList = async (search, limit, page) => {
    try {
        const query = {};
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        const totalTodos = await models_1.Todo.countDocuments(query);
        const totalPages = Math.ceil(totalTodos / limit);
        // Removed exec() here
        const todos = await models_1.Todo.find(query)
            .sort({
                title: 1,
                createdAt: -1,
            })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('institute_id')
            .populate('userId');
        return { todos, totalTodos, totalPages, currentPage: page };
    } catch (error) {
        throw new Error(`Error Fetching Todo: ${error.message}`);
    }
};
exports.getTodosList = getTodosList;
const getTodosListByUserId = async (userId) => {
    try {
        return await models_1.Todo.find({ userId: userId });
    } catch (error) {
        throw new Error(
            `Error Fetching Todo: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.getTodosListByUserId = getTodosListByUserId;
const findTodo = async (id) => {
    try {
        return await models_1.Todo.find({ id: id });
    } catch (error) {
        throw new Error(
            `Error Fetching Todo: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findTodo = findTodo;
const deleteSingleTodo = async (todoId) => {
    try {
        return await models_1.Todo.findByIdAndDelete(todoId);
    } catch (error) {
        throw new Error(
            `Error Deleting Todo: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.deleteSingleTodo = deleteSingleTodo;
const registerTodo = async (data) => {
    try {
        const todo = await new models_1.Todo(data);
        return todo.save();
    } catch (error) {
        throw new Error(
            `Error Creating Todo: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.registerTodo = registerTodo;
const updateSingleTodo = async (id, data) => {
    try {
        const updatedDocument = await models_1.Todo.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
            }
        );
        if (!updatedDocument) {
            throw new Error('Todo not found');
        }
        return updatedDocument;
    } catch (error) {
        throw new Error(`Error updating todo: ${error.message}`);
    }
};
exports.updateSingleTodo = updateSingleTodo;
//# sourceMappingURL=db.todo.js.map
