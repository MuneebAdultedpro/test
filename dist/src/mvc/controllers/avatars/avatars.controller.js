'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getProgramAvatarsController = exports.getAvatarsController = void 0;
const avatars_1 = require('../../services/avatars');
const avatars_service_1 = require('../../services/avatars/avatars.service');
const getAvatarsController = async (req, res) => {
    try {
        const result = await (0, avatars_1.getAvatars)(req);
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
                    avatars:
                        result === null || result === void 0
                            ? void 0
                            : result.avatars,
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
exports.getAvatarsController = getAvatarsController;
const getProgramAvatarsController = async (req, res) => {
    try {
        const result = await (0, avatars_service_1.getProgramAvatars)(req);
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
                    avatars:
                        result === null || result === void 0
                            ? void 0
                            : result.avatars,
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
exports.getProgramAvatarsController = getProgramAvatarsController;
//# sourceMappingURL=avatars.controller.js.map
