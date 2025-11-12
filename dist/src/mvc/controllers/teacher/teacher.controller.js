'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.unApprovedTeacherController =
    exports.updateTeacherController =
    exports.assignProgramToTeacherController =
    exports.getTeacherProgramsController =
    exports.getTeacherStudentsController =
        void 0;
const teacher_1 = require('../../services/teacher');
const teacher_service_1 = require('../../services/teacher/teacher.service');
const getTeacherStudentsController = async (req, res) => {
    try {
        const result = await (0, teacher_1.getTeacherStudentsService)(req);
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
                    students:
                        result === null || result === void 0
                            ? void 0
                            : result.students,
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
            message: error.message || 'internal server error',
        });
    }
};
exports.getTeacherStudentsController = getTeacherStudentsController;
const updateTeacherController = async (req, res) => {
    try {
        const result = await (0, teacher_service_1.updateTeacher)(req);
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
                    teacher:
                        result === null || result === void 0
                            ? void 0
                            : result.teacher,
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
            message: error.message || 'internal server error',
        });
    }
};
exports.updateTeacherController = updateTeacherController;
const unApprovedTeacherController = async (req, res) => {
    try {
        const result = await (0, teacher_service_1.unApprovedTeacher)(req);
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
                    teachers:
                        result === null || result === void 0
                            ? void 0
                            : result.teachers,
                    totalPages:
                        result === null || result === void 0
                            ? void 0
                            : result.totalPages,
                    totalTeachers:
                        result === null || result === void 0
                            ? void 0
                            : result.totalTeachers,
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
            message: error.message || 'internal server error',
        });
    }
};
exports.unApprovedTeacherController = unApprovedTeacherController;
const getTeacherProgramsController = async (req, res) => {
    try {
        const result = await (0, teacher_1.getTeacherProgramsService)(req);
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
                    programs:
                        result === null || result === void 0
                            ? void 0
                            : result.programs,
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
exports.getTeacherProgramsController = getTeacherProgramsController;
const assignProgramToTeacherController = async (req, res) => {
    try {
        const result = await (0, teacher_1.assignprogramsToTeacherService)(req);
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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.assignProgramToTeacherController = assignProgramToTeacherController;
//# sourceMappingURL=teacher.controller.js.map
