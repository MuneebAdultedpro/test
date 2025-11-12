'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.userRegister = exports.userLogin = void 0;
const auth_1 = require('../../services/auth');
const userLogin = async (req, res) => {
    try {
        const result = await (0, auth_1.loginUser)(req);
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
                    token:
                        result === null || result === void 0
                            ? void 0
                            : result.token,
                    user:
                        result === null || result === void 0
                            ? void 0
                            : result.user,
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
            message: 'Internal Server Error',
        });
    }
};
exports.userLogin = userLogin;
const userRegister = async (req, res) => {
    try {
        const result = await (0, auth_1.registerUser)(req);
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
                    token:
                        result === null || result === void 0
                            ? void 0
                            : result.token,
                    user:
                        result === null || result === void 0
                            ? void 0
                            : result.user,
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
exports.userRegister = userRegister;
//# sourceMappingURL=auth.controller.js.map
