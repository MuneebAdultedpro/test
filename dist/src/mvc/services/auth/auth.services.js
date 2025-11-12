'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.registerUser = exports.loginUser = void 0;
const db_user_1 = require('../../database/db.user');
const types_1 = require('../../../interfaces/types');
const jwt = require('jsonwebtoken');
const loginUser = async (req) => {
    var _a, _b, _c, _d;
    try {
        const { email, source } =
            req === null || req === void 0 ? void 0 : req.body;
        // Validate the role
        if (
            !((_c =
                (_b =
                    (_a = Object.values(types_1.Role)) === null || _a === void 0
                        ? void 0
                        : _a.map) === null || _b === void 0
                    ? void 0
                    : _b.call(_a, (item) =>
                          item === null || item === void 0
                              ? void 0
                              : item.toLowerCase()
                      )) === null || _c === void 0
                ? void 0
                : _c.includes(
                      source === null || source === void 0
                          ? void 0
                          : source.toLowerCase()
                  ))
        ) {
            return {
                message: `Invalid role`,
                statusCode: 400,
                success: false,
            };
        }
        if (!email || !source) {
            return {
                message: 'Invalid payload',
                statusCode: 404,
                success: false,
            };
        }
        const user = await (0, db_user_1.findUserByEmail)(email);
        if (!user) {
            return {
                success: false,
                statusCode: 403,
                message: "User with the given email doesn't exist",
            };
        }
        // default case
        const payload = {
            id: user._id,
            role: types_1.Role.User,
        };
        const token = jwt.sign(
            payload,
            (_d =
                process === null || process === void 0
                    ? void 0
                    : process.env) === null || _d === void 0
                ? void 0
                : _d.JWT_KEY
        );
        return {
            user: user,
            message: 'Logged In Successfully',
            statusCode: 200,
            success: true,
            token: token,
        };
    } catch (error) {
        throw new Error('Internal Server Error at service level');
    }
};
exports.loginUser = loginUser;
const registerUser = async (req) => {
    var _a;
    try {
        const { email, source } = req.body;
        if (!email || !source) {
            //|| !user
            return {
                success: false,
                statusCode: 400,
                message: 'Missing required fields: email, role, or user',
            };
        }
        // User flow
        const preUser = await (0, db_user_1.findUserByEmail)(email);
        if (preUser) {
            return {
                success: false,
                statusCode: 403,
                message: 'User already exists',
            };
        }
        const newUser = await (0, db_user_1.createUser)(
            Object.assign({}, req.body)
        );
        const payload = { id: newUser._id, role: types_1.Role.User };
        const token = jwt.sign(
            payload,
            (_a =
                process === null || process === void 0
                    ? void 0
                    : process.env) === null || _a === void 0
                ? void 0
                : _a.JWT_KEY
        );
        return {
            user: newUser,
            message: 'New User registered successfully',
            statusCode: 200,
            success: true,
            token,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: 'Error registering user',
            error,
        };
    }
};
exports.registerUser = registerUser;
//# sourceMappingURL=auth.services.js.map
