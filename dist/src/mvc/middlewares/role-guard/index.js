'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const roleGuardMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        var _a;
        // Ensure req.user has been set, typically in authentication middleware
        if (
            (req === null || req === void 0 ? void 0 : req.user) &&
            (allowedRoles === null || allowedRoles === void 0
                ? void 0
                : allowedRoles.includes(
                      (_a =
                          req === null || req === void 0
                              ? void 0
                              : req.user) === null || _a === void 0
                          ? void 0
                          : _a.role
                  ))
        ) {
            return next(); // User has one of the allowed roles, proceed
        }
        return res.status(403).send('Access denied.');
    };
};
exports.default = roleGuardMiddleware;
//# sourceMappingURL=index.js.map
