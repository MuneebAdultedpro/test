'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.unApprovedTeacher =
    exports.updateTeacher =
    exports.getTeacherProgramsService =
    exports.getTeacherStudentsService =
    exports.assignprogramsToTeacherService =
        void 0;
const db_institute_1 = require('../../database/db.institute');
const db_teacherProgram_1 = require('../../database/db.teacherProgram');
const assignprogramsToTeacherService = async (req) => {
    try {
        let universalTeacherId;
        const { teacherId, programIds } = req.body;
        universalTeacherId = teacherId;
        if (
            !teacherId ||
            !programIds ||
            !(programIds === null || programIds === void 0
                ? void 0
                : programIds.length)
        ) {
            return {
                success: true,
                statusCode: 400,
                message: 'Invalid payload',
            };
        }
        const teacherExist = await (0, db_teacherProgram_1.findTeacher)(
            teacherId
        );
        //if teacher does not exist then first create the teacher
        if (!teacherExist) {
            const user = await (0, db_institute_1.findUser)(teacherId);
            if (!user) {
                return {
                    success: false,
                    statusCode: 400,
                    message: "User with the given id doesn't exist",
                };
            }
            universalTeacherId =
                user === null || user === void 0 ? void 0 : user._id;
            await (0, db_teacherProgram_1.assignprogramsToTeacher)({
                teacher_id: universalTeacherId,
                program_ids: programIds,
            });
        } else {
            universalTeacherId = teacherExist._id;
            // Get current programs and merge
            const existingProgramIds =
                (teacherExist === null || teacherExist === void 0
                    ? void 0
                    : teacherExist.programIds) || [];
            const updatedProgramIds = [
                ...new Set([...existingProgramIds, ...programIds]),
            ];
            // Update teacher programs
            await (0, db_teacherProgram_1.updateTeacherPrograms)(
                universalTeacherId,
                updatedProgramIds
            );
        }
        return {
            status: true,
            statusCode: 200,
            message: 'Programs Assigned Successfully',
        };
    } catch (error) {
        console.log('error', error);
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.assignprogramsToTeacherService = assignprogramsToTeacherService;
const getTeacherStudentsService = async (req) => {
    try {
        const { teacherId } = req.query;
        const teacherExist = await (0, db_teacherProgram_1.findTeacher)(
            teacherId
        );
        if (!teacherExist) {
            return {
                success: false,
                statusCode: 200,
                message: "Teacher with the given id doesn't exist",
            };
        }
        const students = await (0, db_teacherProgram_1.getStudentsForTeacher)(
            teacherId
        );
        if (
            !students ||
            !(students === null || students === void 0
                ? void 0
                : students.length)
        ) {
            //|| !students?.length
            return {
                success: false,
                statusCode: 200,
                message: "students with the given teacher id doesn't found",
            };
        }
        return {
            success: true,
            statusCode: 200,
            students,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getTeacherStudentsService = getTeacherStudentsService;
const updateTeacher = async (req) => {
    try {
        const { teacherId } = req.query;
        if (!teacherId) {
            return {
                success: false,
                statusCode: 400,
                message: 'Teacher id is required',
            };
        }
        const teacher = await (0, db_teacherProgram_1.findTeacherByIdAndUpdate)(
            teacherId,
            req.body
        );
        return {
            success: true,
            statusCode: 200,
            teacher: teacher,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.updateTeacher = updateTeacher;
const getTeacherProgramsService = async (req) => {
    try {
        const { teacherId } = req.query;
        const teacherExist = await (0, db_teacherProgram_1.findTeacher)(
            teacherId
        );
        if (!teacherExist) {
            return {
                success: false,
                statusCode: 400,
                message: "Teacher with the given id doesn't exist",
            };
        }
        const programs = await (0, db_teacherProgram_1.getTeacherProgram)(
            teacherId
        );
        if (
            !programs ||
            !(programs === null || programs === void 0
                ? void 0
                : programs.length)
        ) {
            return {
                success: false,
                statusCode: 200,
                message: "Programs with the given id doesn't found",
            };
        }
        return {
            success: true,
            statusCode: 200,
            programs,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getTeacherProgramsService = getTeacherProgramsService;
const unApprovedTeacher = async (req) => {
    try {
        const { page, limit, search } = req.query;
        const teachers = await (0, db_teacherProgram_1.findUnApprovedTeacher)({
            page,
            limit,
            search,
        });
        if (!teachers) {
            return {
                success: false,
                statusCode: 400,
                message: 'Error fetching teacher',
            };
        }
        const { unApprovedTeachers, totalPages, totalTeachers } = teachers;
        if (
            !unApprovedTeachers ||
            !(unApprovedTeachers === null || unApprovedTeachers === void 0
                ? void 0
                : unApprovedTeachers.length)
        ) {
            return {
                success: false,
                statusCode: 200,
                message: 'No teacher found',
            };
        }
        return {
            success: true,
            statusCode: 200,
            teachers: unApprovedTeachers,
            totalPages,
            totalTeachers,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.unApprovedTeacher = unApprovedTeacher;
//# sourceMappingURL=teacher.service.js.map
