'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.createUserController =
    exports.getAllUsersController =
    exports.getUserByEmailController =
    exports.getUserByIdController =
    exports.deleteUserController =
    exports.updateUserController =
    exports.getUsersWithDataController =
    exports.getUserController =
        void 0;
const user_1 = require('../../services/user');
const user_service_1 = require('../../services/user/user.service');
const getUserController = async (req, res) => {
    var _a, _b;
    try {
        const result = await (0, user_1.getUser)(req);
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
                    user: Object.assign(
                        Object.assign(
                            {},
                            (_a =
                                result === null || result === void 0
                                    ? void 0
                                    : result.user) === null || _a === void 0
                                ? void 0
                                : _a._doc
                        ),
                        {
                            instagram_token:
                                (_b =
                                    process === null || process === void 0
                                        ? void 0
                                        : process.env) === null || _b === void 0
                                    ? void 0
                                    : _b.LONG_TIME_ACCESS_TOKEN,
                        }
                    ),
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
exports.getUserController = getUserController;
const getUserByIdController = async (req, res) => {
    try {
        const result = await (0, user_service_1.getUserById)(req);
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
exports.getUserByIdController = getUserByIdController;
const getUserByEmailController = async (req, res) => {
    try {
        const result = await (0, user_service_1.getUserByEmail)(req);
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
exports.getUserByEmailController = getUserByEmailController;
const updateUserController = async (req, res) => {
    var _a, _b;
    try {
        const result = await (0, user_1.updateUser)(req);
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
                    user: Object.assign(
                        Object.assign(
                            {},
                            (_a =
                                result === null || result === void 0
                                    ? void 0
                                    : result.updateUser) === null ||
                                _a === void 0
                                ? void 0
                                : _a._doc
                        ),
                        {
                            instagram_token:
                                (_b =
                                    process === null || process === void 0
                                        ? void 0
                                        : process.env) === null || _b === void 0
                                    ? void 0
                                    : _b.LONG_TIME_ACCESS_TOKEN,
                        }
                    ),
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
exports.updateUserController = updateUserController;
const getAllUsersController = async (req, res) => {
    try {
        const result = await (0, user_1.getAllUsers)(req);
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
                    users:
                        result === null || result === void 0
                            ? void 0
                            : result.users,
                    totalUsers:
                        result === null || result === void 0
                            ? void 0
                            : result.totalUsers,
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
exports.getAllUsersController = getAllUsersController;
const getUsersWithDataController = async (req, res) => {
    try {
        const result = await (0, user_1.getUsersWithData)(req);
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
                    users:
                        result === null || result === void 0
                            ? void 0
                            : result.users,
                    totalUsers:
                        result === null || result === void 0
                            ? void 0
                            : result.totalUsers,
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
exports.getUsersWithDataController = getUsersWithDataController;
const deleteUserController = async (req, res) => {
    try {
        const result = await (0, user_1.deleteUser)(req);
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
exports.deleteUserController = deleteUserController;
const createUserController = async (req, res) => {
    try {
        const result = await (0, user_service_1.createUser)(req);
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
exports.createUserController = createUserController;
//# sourceMappingURL=user.contoller.js.map
