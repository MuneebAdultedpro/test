'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const routes_1 = require('../mvc/routes');
const routes_strings_1 = require('../mvc/routes/routes-strings');
exports.default = (app) => {
    app.use(
        routes_strings_1.baseRoutes === null ||
            routes_strings_1.baseRoutes === void 0
            ? void 0
            : routes_strings_1.baseRoutes.userBase,
        routes_1.userRouter
    );
    app.use(routes_strings_1.baseRoutes.commonBase, routes_1.commonRouter);
    app.use(routes_strings_1.userRoutes.auth, routes_1.authRouter);
};
//# sourceMappingURL=routes.js.map
