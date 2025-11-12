'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    var _a;
    try {
        let token =
            req === null || req === void 0
                ? void 0
                : req.header('Authorization');
        token =
            token === null || token === void 0
                ? void 0
                : token.replace('Bearer ', '');
        if (token) {
            req.token = token;
            jwt.verify(
                token,
                (_a =
                    process === null || process === void 0
                        ? void 0
                        : process.env) === null || _a === void 0
                    ? void 0
                    : _a.JWT_KEY,
                function (err, decoded) {
                    if (err) {
                        err.message = 'Please, Login.';
                        return res.status(403).send({
                            success: false,
                            message: 'Please, Login.',
                        });
                    }
                    req.user = decoded;
                    next();
                }
            );
        } else {
            return res.status(403).send({
                success: false,
                unAuthorized: true,
                message: 'Unauthorized',
            });
        }
    } catch (error) {
        console.log('auth middleware failed');
    }
};
exports.default = auth;
//# sourceMappingURL=index.js.map
