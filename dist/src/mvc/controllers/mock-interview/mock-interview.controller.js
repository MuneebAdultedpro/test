'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.updateMockInterviewSessionController =
    exports.addMockInterViewSessionController =
    exports.getMockInterviewSessionController =
        void 0;
const mock_interview_1 = require('../../services/mock-interview');
const addMockInterViewSessionController = async (req, res) => {
    try {
        const result = await (0, mock_interview_1.addMockInterviewSession)(req);
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
                    interviewMessages:
                        result === null || result === void 0
                            ? void 0
                            : result.interviewMessages,
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
exports.addMockInterViewSessionController = addMockInterViewSessionController;
const updateMockInterviewSessionController = async (req, res) => {
    try {
        const result = await (0,
        mock_interview_1.updateMockInterviewSessionService)(req);
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
                    interviewMessages:
                        result === null || result === void 0
                            ? void 0
                            : result.interviewMessages,
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
exports.updateMockInterviewSessionController =
    updateMockInterviewSessionController;
const getMockInterviewSessionController = async (req, res) => {
    try {
        const result = await (0, mock_interview_1.getMockInterviewSession)(req);
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
                    mockInterviews:
                        result === null || result === void 0
                            ? void 0
                            : result.mockInterviews,
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
exports.getMockInterviewSessionController = getMockInterviewSessionController;
//# sourceMappingURL=mock-interview.controller.js.map
