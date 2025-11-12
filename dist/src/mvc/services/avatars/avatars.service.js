'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getProgramAvatars = exports.getAvatars = void 0;
const db_avatars_1 = require('../../database/db.avatars');
const getAvatars = async (req) => {
    try {
        const avatars = await (0, db_avatars_1.getAvatarsList)();
        return {
            success: true,
            statusCode: 200,
            message: 'Avatars retrieved successfully',
            avatars,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getAvatars = getAvatars;
const getProgramAvatars = async (req) => {
    var _a;
    try {
        const program =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.program;
        const avatars = await (0, db_avatars_1.getProgramAvatarsList)(program);
        return {
            success: true,
            statusCode: 200,
            message: 'Avatars retrieved successfully',
            avatars,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getProgramAvatars = getProgramAvatars;
//# sourceMappingURL=avatars.service.js.map
