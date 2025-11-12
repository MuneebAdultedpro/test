'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.commonRouter = exports.userRouter = exports.authRouter = void 0;
const tslib_1 = require('tslib');
const user_1 = require('./user');
Object.defineProperty(exports, 'userRouter', {
    enumerable: true,
    get: function () {
        return user_1.userRouter;
    },
});
const auth_1 = require('./auth');
Object.defineProperty(exports, 'authRouter', {
    enumerable: true,
    get: function () {
        return auth_1.authRouter;
    },
});
const common_routes_1 = tslib_1.__importDefault(require('./common-routes'));
exports.commonRouter = common_routes_1.default;
//# sourceMappingURL=index.js.map
