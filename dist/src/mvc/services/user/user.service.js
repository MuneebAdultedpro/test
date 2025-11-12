'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getUserByEmail =
    exports.createUser =
    exports.getUserById =
    exports.deleteUser =
    exports.updateUser =
    exports.getUsersWithData =
    exports.getAllUsers =
    exports.getUser =
        void 0;
const db_user_1 = require('../../database/db.user');
const getUser = async (req) => {
    var _a;
    try {
        const userId =
            (_a = req === null || req === void 0 ? void 0 : req.user) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        if (!userId) {
            return {
                success: false,
                statusCode: 403,
                message: 'Please Provide userId',
            };
        }
        const user = await (0, db_user_1.findUserById)(userId);
        if (!user) {
            return {
                success: false,
                statusCode: 403,
                message: "user With the given id doesn't Exist",
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'User retrieved successfully',
            user: user,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getUser = getUser;
const getUserById = async (req) => {
    var _a;
    try {
        const userId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        if (!userId) {
            return {
                success: false,
                statusCode: 400,
                message: 'Please Provide userId',
            };
        }
        const user = await (0, db_user_1.findUserById)(userId);
        if (!user) {
            return {
                success: false,
                statusCode: 400,
                message: "user With the given id doesn't Exist",
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'User retrieved successfully',
            user: user,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getUserById = getUserById;
const getUserByEmail = async (req) => {
    var _a;
    try {
        const email = decodeURIComponent(
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.email
        );
        if (!email) {
            return {
                success: false,
                statusCode: 403,
                message: 'Please Provide email',
            };
        }
        const user = await (0, db_user_1.findUserByEmail)(email);
        if (!user) {
            return {
                success: true,
                statusCode: 200,
                message: "user With the given email doesn't Exist",
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'User retrieved successfully',
            user: user,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getUserByEmail = getUserByEmail;
const deleteUser = async (req) => {
    var _a;
    try {
        const userId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        if (!userId) {
            return {
                success: false,
                statusCode: 403,
                message: 'Please Provide userId',
            };
        }
        const user = await (0, db_user_1.removeUser)(userId);
        if (!user) {
            return {
                success: false,
                statusCode: 403,
                message: "user With the given id doesn't Exist",
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'User deleted Successfully successfully',
            user: user,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.deleteUser = deleteUser;
const getAllUsers = async (req) => {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        const page =
            parseInt(
                (_a = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _a === void 0
                    ? void 0
                    : _a.page
            ) || 1;
        const limit =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.limit
            ) || 10;
        const startDate = (
            (_c = req === null || req === void 0 ? void 0 : req.query) ===
                null || _c === void 0
                ? void 0
                : _c.startDate
        )
            ? new Date(
                  (_d = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _d === void 0
                      ? void 0
                      : _d.startDate
              )
            : undefined;
        const endDate = (
            (_e = req === null || req === void 0 ? void 0 : req.query) ===
                null || _e === void 0
                ? void 0
                : _e.endDate
        )
            ? new Date(
                  (_f = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _f === void 0
                      ? void 0
                      : _f.endDate
              )
            : undefined;
        const search =
            (_g = req === null || req === void 0 ? void 0 : req.query) ===
                null || _g === void 0
                ? void 0
                : _g.search;
        const { users, totalUsers, totalPages, currentPage } = await (0,
        db_user_1.findAllUsers)(page, limit, startDate, endDate, search);
        if (!users.length) {
            return {
                success: false,
                statusCode: 403,
                message: 'No users found',
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'User retrieved successfully',
            users,
            totalUsers,
            totalPages,
            currentPage,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message,
        };
    }
};
exports.getAllUsers = getAllUsers;
const getUsersWithData = async (req) => {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        const page =
            parseInt(
                (_a = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _a === void 0
                    ? void 0
                    : _a.page
            ) || 1;
        const limit =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.limit
            ) || 10;
        const startDate = (
            (_c = req === null || req === void 0 ? void 0 : req.query) ===
                null || _c === void 0
                ? void 0
                : _c.startDate
        )
            ? new Date(
                  (_d = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _d === void 0
                      ? void 0
                      : _d.startDate
              )
            : undefined;
        const endDate = (
            (_e = req === null || req === void 0 ? void 0 : req.query) ===
                null || _e === void 0
                ? void 0
                : _e.endDate
        )
            ? new Date(
                  (_f = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _f === void 0
                      ? void 0
                      : _f.endDate
              )
            : undefined;
        const search =
            (_g = req === null || req === void 0 ? void 0 : req.query) ===
                null || _g === void 0
                ? void 0
                : _g.search;
        const { users, totalUsers, totalPages, currentPage } = await (0,
        db_user_1.findUsers)(page, limit, startDate, endDate, search);
        if (!users.length) {
            return {
                success: true,
                statusCode: 200,
                message: 'No user found for the given institute ID',
                users: [],
                totalUsers: 0,
                totalPages: 0,
                currentPage: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Users retrieved successfully',
            users,
            totalUsers,
            totalPages,
            currentPage,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message,
        };
    }
};
exports.getUsersWithData = getUsersWithData;
const updateUser = async (req) => {
    var _a;
    try {
        const userId =
            (_a = req === null || req === void 0 ? void 0 : req.user) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const updateUser = await (0, db_user_1.findUserByIdAndUpdate)(
            userId,
            req.body
        );
        if (updateUser) {
            return {
                updateUser: updateUser,
                message: 'User Updated Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 403,
                message: 'Error getting Institute',
            };
        }
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.updateUser = updateUser;
const createUser = async (req) => {
    var _a;
    try {
        const user = await (0, db_user_1.findUserByEmail)(
            (_a = req === null || req === void 0 ? void 0 : req.body) ===
                null || _a === void 0
                ? void 0
                : _a.email
        );
        if (user) {
            return {
                user: user,
                message: 'User already available with this email',
                statusCode: 400,
                success: false,
            };
        }
        const newUser = await (0, db_user_1.registerUser)(
            req === null || req === void 0 ? void 0 : req.body
        );
        if (newUser) {
            return {
                user: newUser,
                message: 'New User registered Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 403,
                message: 'Error Creating User',
            };
        }
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.createUser = createUser;
//# sourceMappingURL=user.service.js.map
