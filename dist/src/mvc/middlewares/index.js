'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.roleGuardMiddleware = exports.auth = void 0;
const tslib_1 = require('tslib');
const auth_1 = tslib_1.__importDefault(require('./auth'));
exports.auth = auth_1.default;
const role_guard_1 = tslib_1.__importDefault(require('./role-guard'));
exports.roleGuardMiddleware = role_guard_1.default;
//# sourceMappingURL=index.js.map
