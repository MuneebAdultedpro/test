'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const index_1 = require('../../controllers/index');
const routes_strings_1 = require('../routes-strings');
const middlewares_1 = require('../../middlewares');
const router = express_1.default.Router();
router.get(
    routes_strings_1.todosRoutes === null ||
        routes_strings_1.todosRoutes === void 0
        ? void 0
        : routes_strings_1.todosRoutes.todos,
    middlewares_1.auth,
    index_1.todosController === null || index_1.todosController === void 0
        ? void 0
        : index_1.todosController.getTodosController
);
router.get(
    routes_strings_1.todosRoutes === null ||
        routes_strings_1.todosRoutes === void 0
        ? void 0
        : routes_strings_1.todosRoutes.todos,
    middlewares_1.auth,
    index_1.todosController === null || index_1.todosController === void 0
        ? void 0
        : index_1.todosController.getSingleTodoController
);
router.get(
    routes_strings_1.todosRoutes === null ||
        routes_strings_1.todosRoutes === void 0
        ? void 0
        : routes_strings_1.todosRoutes.todosByUserId,
    middlewares_1.auth,
    index_1.todosController === null || index_1.todosController === void 0
        ? void 0
        : index_1.todosController.getTodosByUserIdController
);
router.post(
    routes_strings_1.todosRoutes === null ||
        routes_strings_1.todosRoutes === void 0
        ? void 0
        : routes_strings_1.todosRoutes.todos,
    middlewares_1.auth,
    index_1.todosController === null || index_1.todosController === void 0
        ? void 0
        : index_1.todosController.createTodoController
);
router.delete(
    routes_strings_1.todosRoutes === null ||
        routes_strings_1.todosRoutes === void 0
        ? void 0
        : routes_strings_1.todosRoutes.todos,
    middlewares_1.auth,
    index_1.todosController === null || index_1.todosController === void 0
        ? void 0
        : index_1.todosController.deleteTodoController
);
router.put(
    routes_strings_1.todosRoutes === null ||
        routes_strings_1.todosRoutes === void 0
        ? void 0
        : routes_strings_1.todosRoutes.todos,
    middlewares_1.auth,
    index_1.todosController === null || index_1.todosController === void 0
        ? void 0
        : index_1.todosController.updateTodoController
);
exports.default = router;
//# sourceMappingURL=todo.routes.js.map
