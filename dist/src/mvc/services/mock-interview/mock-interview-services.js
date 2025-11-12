'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.updateMockInterviewSessionService =
    exports.getMockInterviewSession =
    exports.addMockInterviewSession =
        void 0;
const db_mock_interview_1 = require('../../database/db.mock-interview');
const addMockInterviewSession = async (req) => {
    var _a, _b, _c, _d, _e;
    try {
        const userId =
            (_a = req === null || req === void 0 ? void 0 : req.user) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        if (!userId) {
            return {
                success: false,
                statusCode: 404,
                message: 'User ID not provided',
            };
        }
        if (
            !((_d =
                (_c =
                    (_b =
                        req === null || req === void 0 ? void 0 : req.body) ===
                        null || _b === void 0
                        ? void 0
                        : _b.data) === null || _c === void 0
                    ? void 0
                    : _c.conversation) === null || _d === void 0
                ? void 0
                : _d.length)
        ) {
            return {
                success: true,
                statusCode: 201,
                message: 'No data provided',
            };
        }
        const interviewMessages = await (0,
        db_mock_interview_1.postMockInterviewMessages)(
            userId,
            (_e = req === null || req === void 0 ? void 0 : req.body) ===
                null || _e === void 0
                ? void 0
                : _e.data
        );
        if (interviewMessages) {
            return {
                interviewMessages,
                message: 'interview Messages created successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 400,
                message: 'Error creating mock interview',
            };
        }
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message:
                (error === null || error === void 0 ? void 0 : error.message) ||
                'Internal Server Error',
        };
    }
};
exports.addMockInterviewSession = addMockInterviewSession;
const updateMockInterviewSessionService = async (req) => {
    var _a, _b;
    try {
        const interviewId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const data = req.body.data;
        const convo =
            data === null || data === void 0 ? void 0 : data.conversation;
        if (!interviewId) {
            return {
                success: false,
                statusCode: 404,
                message: 'interview ID not provided',
            };
        }
        if (
            ((_b = Object.keys(data)) === null || _b === void 0
                ? void 0
                : _b.length) <= 1
        ) {
            return {
                success: true,
                statusCode: 201,
                message: 'No data provided',
            };
        }
        const payload = Object.assign(Object.assign({}, data), {
            messages: convo,
        });
        const interviewMessages = await (0,
        db_mock_interview_1.updateMockInterviewSession)(interviewId, payload);
        if (interviewMessages) {
            return {
                interviewMessages,
                message: 'interview Messages updated successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 400,
                message: 'Error creating mock interview',
            };
        }
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message:
                (error === null || error === void 0 ? void 0 : error.message) ||
                'Internal Server Error',
        };
    }
};
exports.updateMockInterviewSessionService = updateMockInterviewSessionService;
const getMockInterviewSession = async (req) => {
    var _a;
    try {
        const userId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.userId;
        if (!userId) {
            return {
                success: false,
                statusCode: 404,
                message: 'User ID not provided',
            };
        }
        const mockInterviews = await (0,
        db_mock_interview_1.getMockInterviewMessagesByUserId)(userId);
        if (
            mockInterviews ||
            (mockInterviews === null || mockInterviews === void 0
                ? void 0
                : mockInterviews.length)
        ) {
            return {
                mockInterviews,
                message: 'mockInterviews fetched successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 400,
                message: 'Error getting mock',
            };
        }
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message:
                (error === null || error === void 0 ? void 0 : error.message) ||
                'Internal Server Error',
        };
    }
};
exports.getMockInterviewSession = getMockInterviewSession;
//# sourceMappingURL=mock-interview-services.js.map
