'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getEmployerCounts =
    exports.getConsortiumInstitutesByInstituteId =
    exports.getJobApplicationsByInstituteId =
    exports.getProgramsWithStudents =
    exports.getUsersByRole =
    exports.getInstituteTeachers =
    exports.getInstituteUsersByProgramId =
    exports.requestInstituteForApproval =
    exports.updateInstitute =
    exports.getInstitueEmployers =
    exports.getPrograms =
    exports.getProgram =
    exports.createProgram =
    exports.getDashboardCounts =
    exports.getInstitute =
    exports.getInstitutes =
    exports.createInstitute =
        void 0;
const db_institute_1 = require('../../database/db.institute');
const db_user_1 = require('../../database/db.user');
const db_chat_1 = require('../../database/db.chat');
const db_branch_1 = require('../../database/db.branch');
const types_1 = require('../../../interfaces/types');
const createInstitute = async (req) => {
    var _a;
    try {
        const institute = await (0, db_institute_1.findInstituteByEmail)(
            (_a = req === null || req === void 0 ? void 0 : req.body) ===
                null || _a === void 0
                ? void 0
                : _a.email
        );
        if (institute) {
            return {
                success: false,
                statusCode: 403,
                message: 'Institute Already Exist',
            };
        }
        const newInstitute = await (0, db_institute_1.registerInstitute)(
            req === null || req === void 0 ? void 0 : req.body
        );
        if (newInstitute) {
            return {
                user: newInstitute,
                message: 'new Institute registered Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 403,
                message: 'Error Registering Institute',
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
exports.createInstitute = createInstitute;
const requestInstituteForApproval = async (req) => {
    try {
        const newInstitute = await (0, db_institute_1.registerInstitute)(
            req === null || req === void 0 ? void 0 : req.body
        );
        if (newInstitute) {
            return {
                user: newInstitute,
                message: 'new Institute registered Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 403,
                message: 'Error Registering Institute',
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
exports.requestInstituteForApproval = requestInstituteForApproval;
const updateInstitute = async (req) => {
    var _a;
    try {
        const instituteId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const updatedInstitute = await (0,
        db_institute_1.findInstituteByIdAndUpdate)(instituteId, req.body);
        if (updatedInstitute) {
            return {
                updatedInstitute: updatedInstitute,
                message: 'Institute Updated Successfully',
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
exports.updateInstitute = updateInstitute;
const getInstitueEmployers = async (req) => {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        const page =
            parseInt(
                (_a = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _a === void 0
                    ? void 0
                    : _a.page
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.limit
            ) || 10; // Pagination: number of records per page
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
            : undefined; // Optional start date
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
            : undefined; // Optional end date
        const search =
            (_g = req === null || req === void 0 ? void 0 : req.query) ===
                null || _g === void 0
                ? void 0
                : _g.search; // Optional search query for branch name
        const { employers, totalEmployers, totalPages, currentPage } = await (0,
        db_institute_1.findInstituteEmployers)(
            page,
            limit,
            startDate,
            endDate,
            search
        );
        if (
            !(employers === null || employers === void 0
                ? void 0
                : employers.length)
        ) {
            return {
                success: true,
                statusCode: 200,
                message: 'No Employers Found',
                employers: [],
                totalEmployers: 0,
                totalPages: 0,
                currentPage: 1,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Employers retrieved successfully',
            employers,
            totalEmployers,
            totalPages,
            currentPage,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getInstitueEmployers = getInstitueEmployers;
const createProgram = async (req) => {
    var _a;
    try {
        const program = await (0, db_institute_1.findProgramByName)(
            (_a = req === null || req === void 0 ? void 0 : req.body) ===
                null || _a === void 0
                ? void 0
                : _a.name
        );
        if (program) {
            return {
                success: false,
                statusCode: 403,
                message: 'program with the given name already exist',
            };
        }
        const newProgram = await (0, db_institute_1.registerProgram)(
            req === null || req === void 0 ? void 0 : req.body
        );
        if (newProgram) {
            return {
                program: newProgram,
                message: 'new Program registered Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 403,
                message: 'Error Creating Program',
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
exports.createProgram = createProgram;
const getProgram = async (req) => {
    var _a;
    try {
        const programId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        if (!programId) {
            return {
                success: false,
                statusCode: 403,
                message: 'Please Provide ProgramId',
            };
        }
        const program = await (0, db_institute_1.findProgramById)(programId);
        if (!program) {
            return {
                success: false,
                statusCode: 403,
                message: "Program with the given id doesn't exist",
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Program retrieved successfully',
            program: program,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getProgram = getProgram;
const getPrograms = async (req) => {
    var _a, _b;
    try {
        const approved =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.approved;
        const search =
            (_b = req === null || req === void 0 ? void 0 : req.query) ===
                null || _b === void 0
                ? void 0
                : _b.search;
        const { programs, totalPrograms, totalPages, currentPage } = await (0,
        db_institute_1.findPrograms)(approved, search);
        if (
            !(programs === null || programs === void 0
                ? void 0
                : programs.length)
        ) {
            return {
                success: true,
                statusCode: 200,
                message: 'No Programs Found',
                programs: [],
                totalPrograms: 0,
                totalPages: 0,
                currentPage: 1,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Programs retrieved successfully',
            programs: programs,
            totalPrograms: totalPrograms,
            totalPages: totalPages,
            currentPage: currentPage,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getPrograms = getPrograms;
const getInstituteUsersByProgramId = async (req) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    try {
        const programId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.programId;
        const instituteId =
            (_b = req === null || req === void 0 ? void 0 : req.query) ===
                null || _b === void 0
                ? void 0
                : _b.instituteId;
        const page =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.page
            ) || 1;
        const limit =
            parseInt(
                (_d = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _d === void 0
                    ? void 0
                    : _d.limit
            ) || 10;
        const startDate = (
            (_e = req === null || req === void 0 ? void 0 : req.query) ===
                null || _e === void 0
                ? void 0
                : _e.startDate
        )
            ? new Date(
                  (_f = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _f === void 0
                      ? void 0
                      : _f.startDate
              )
            : undefined;
        const endDate = (
            (_g = req === null || req === void 0 ? void 0 : req.query) ===
                null || _g === void 0
                ? void 0
                : _g.endDate
        )
            ? new Date(
                  (_h = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _h === void 0
                      ? void 0
                      : _h.endDate
              )
            : undefined;
        const search =
            (_j = req === null || req === void 0 ? void 0 : req.query) ===
                null || _j === void 0
                ? void 0
                : _j.search;
        if (!programId) {
            return {
                success: false,
                statusCode: 400,
                message: 'Program ID is required',
            };
        }
        const { users, totalUsers } = await (0,
        db_institute_1.findInstituteUsersByProgramId)(
            programId,
            instituteId,
            page,
            limit,
            startDate,
            endDate,
            search
        );
        if (!(users === null || users === void 0 ? void 0 : users.length)) {
            return {
                success: true,
                statusCode: 200,
                message: 'No users found for the given program ID',
                users: [],
                totalUsers: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Users retrieved successfully',
            users,
            totalUsers,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message,
        };
    }
};
exports.getInstituteUsersByProgramId = getInstituteUsersByProgramId;
const getInstitute = async (req) => {
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
                message: 'Please Provide instituteId',
            };
        }
        const user = await (0, db_institute_1.findInstituteById)(userId);
        if (!user) {
            return {
                success: false,
                statusCode: 404,
                message: "Institute with the given id doesn't exist",
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Institute retrieved successfully',
            institute: user,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getInstitute = getInstitute;
const getInstitutes = async (req) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    try {
        const approved =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.approved;
        const page =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.page
            ) || 1;
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10;
        const startDate = (
            (_d = req === null || req === void 0 ? void 0 : req.query) ===
                null || _d === void 0
                ? void 0
                : _d.startDate
        )
            ? new Date(
                  (_e = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _e === void 0
                      ? void 0
                      : _e.startDate
              )
            : undefined;
        const endDate = (
            (_f = req === null || req === void 0 ? void 0 : req.query) ===
                null || _f === void 0
                ? void 0
                : _f.endDate
        )
            ? new Date(
                  (_g = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _g === void 0
                      ? void 0
                      : _g.endDate
              )
            : undefined;
        const search =
            (_h = req === null || req === void 0 ? void 0 : req.query) ===
                null || _h === void 0
                ? void 0
                : _h.search;
        const { institutes, totalInstitutes, totalPages, currentPage } =
            await (0, db_institute_1.findInstitutes)(
                page,
                limit,
                approved,
                startDate,
                endDate,
                search
            );
        if (!institutes.length) {
            return {
                success: true,
                statusCode: 200,
                message: 'No Institute Found',
                institutes: [],
                totalInstitutes: 0,
                totalPages: 0,
                currentPage: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Institutes retrieved successfully',
            institutes,
            totalInstitutes,
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
exports.getInstitutes = getInstitutes;
const getConsortiumInstitutesByInstituteId = async (req) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    try {
        const approved =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.approved;
        const page =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.page
            ) || 1;
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10;
        const instituteId =
            (_d = req === null || req === void 0 ? void 0 : req.query) ===
                null || _d === void 0
                ? void 0
                : _d.instituteId;
        const startDate = (
            (_e = req === null || req === void 0 ? void 0 : req.query) ===
                null || _e === void 0
                ? void 0
                : _e.startDate
        )
            ? new Date(
                  (_f = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _f === void 0
                      ? void 0
                      : _f.startDate
              )
            : undefined;
        const endDate = (
            (_g = req === null || req === void 0 ? void 0 : req.query) ===
                null || _g === void 0
                ? void 0
                : _g.endDate
        )
            ? new Date(
                  (_h = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _h === void 0
                      ? void 0
                      : _h.endDate
              )
            : undefined;
        const search =
            (_j = req === null || req === void 0 ? void 0 : req.query) ===
                null || _j === void 0
                ? void 0
                : _j.search;
        const { institutes, totalInstitutes, totalPages, currentPage } =
            await (0, db_institute_1.findInstitutesOfConsortiumByInstituteId)(
                page,
                limit,
                instituteId,
                approved,
                startDate,
                endDate,
                search
            );
        if (!institutes.length) {
            return {
                success: true,
                statusCode: 200,
                message: 'No Institute Found',
                institutes: [],
                totalInstitutes: 0,
                totalPages: 0,
                currentPage: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Institutes retrieved successfully',
            institutes,
            totalInstitutes,
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
exports.getConsortiumInstitutesByInstituteId =
    getConsortiumInstitutesByInstituteId;
const getInstituteTeachers = async (req) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    try {
        const instituteId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.instituteId;
        const page =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.page
            ) || 1;
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10;
        const startDate = (
            (_d = req === null || req === void 0 ? void 0 : req.query) ===
                null || _d === void 0
                ? void 0
                : _d.startDate
        )
            ? new Date(
                  (_e = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _e === void 0
                      ? void 0
                      : _e.startDate
              )
            : undefined;
        const endDate = (
            (_f = req === null || req === void 0 ? void 0 : req.query) ===
                null || _f === void 0
                ? void 0
                : _f.endDate
        )
            ? new Date(
                  (_g = req === null || req === void 0 ? void 0 : req.query) ===
                      null || _g === void 0
                      ? void 0
                      : _g.endDate
              )
            : undefined;
        const search =
            (_h = req === null || req === void 0 ? void 0 : req.query) ===
                null || _h === void 0
                ? void 0
                : _h.search;
        const role =
            (_j = req === null || req === void 0 ? void 0 : req.query) ===
                null || _j === void 0
                ? void 0
                : _j.role;
        const { teachers, totalTeachers } = await (0,
        db_institute_1.findInstituteTeachers)(
            instituteId,
            page,
            limit,
            startDate,
            endDate,
            search,
            role
        );
        if (!teachers.length) {
            return {
                success: true,
                statusCode: 200,
                message: 'No teacher Found',
                teachers: [],
                totalTeachers: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Teachers retrieved successfully',
            teachers,
            totalTeachers,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message,
        };
    }
};
exports.getInstituteTeachers = getInstituteTeachers;
const getDashboardCounts = async (req) => {
    var _a, _b, _c, _d, _e;
    try {
        const id =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const userId =
            (_b = req === null || req === void 0 ? void 0 : req.query) ===
                null || _b === void 0
                ? void 0
                : _b.userId;
        const institute = await (0, db_institute_1.findInstituteById)(id);
        if (!institute) {
            return {
                success: false,
                statusCode: 404,
                message: "Institue with the given id doesn't exist",
            };
        }
        const user = await (0, db_user_1.findUserById)(userId);
        let studentIds;
        if (
            (_c = user === null || user === void 0 ? void 0 : user.role) ===
                null || _c === void 0
                ? void 0
                : _c.includes(types_1.Role.Teacher)
        ) {
            studentIds = await (0, db_user_1.findUsersByTeacherIdCount)(
                userId,
                institute === null || institute === void 0
                    ? void 0
                    : institute.id
            );
        } else {
            studentIds = await (0, db_user_1.findUsersByInstituteIdCount)(id);
        }
        const jobCounts = await (0, db_user_1.getJobCounts)();
        const swipeCounts = await (0, db_user_1.getswipeCounts)(id, studentIds);
        let chatCounts;
        if (
            (_e =
                (_d = user === null || user === void 0 ? void 0 : user.role) ===
                    null || _d === void 0
                    ? void 0
                    : _d.includes) === null || _e === void 0
                ? void 0
                : _e.call(_d, types_1.Role.Teacher)
        ) {
            chatCounts = await (0, db_chat_1.dashboardTeacherChatsCount)(
                userId
            );
        } else {
            chatCounts = await (0, db_chat_1.dashboardChatsCount)(
                userId,
                studentIds
            );
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Institute retrieved successfully',
            counts: {
                studentsCount:
                    studentIds === null || studentIds === void 0
                        ? void 0
                        : studentIds.length,
                jobCounts,
                swipeCounts,
                chatCounts,
            },
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getDashboardCounts = getDashboardCounts;
const getEmployerCounts = async (req) => {
    var _a;
    try {
        const userId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.userId;
        const { employers, totalEmployers } = await (0,
        db_branch_1.findAllEmployersIds)();
        const jobCounts = await (0, db_user_1.getJobCounts)();
        const chatCounts = await (0, db_chat_1.dashboardChatsCount)(
            userId,
            employers
        );
        return {
            success: true,
            statusCode: 200,
            message: 'Employers count retrieved successfully',
            counts: {
                employersCount: totalEmployers,
                jobCounts,
                chatCounts,
            },
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getEmployerCounts = getEmployerCounts;
const getUsersByRole = async (req) => {
    var _a, _b, _c;
    try {
        const role =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.role;
        const page =
            (_b = req === null || req === void 0 ? void 0 : req.query) ===
                null || _b === void 0
                ? void 0
                : _b.page;
        const limit =
            (_c = req === null || req === void 0 ? void 0 : req.query) ===
                null || _c === void 0
                ? void 0
                : _c.limit;
        const users = await (0, db_institute_1.findUsersByRole)(
            role,
            page,
            limit
        );
        if (!users) {
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
            users: users,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getUsersByRole = getUsersByRole;
const getProgramsWithStudents = async (req) => {
    var _a, _b, _c;
    try {
        const id =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const page =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.page
            ) || 1;
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10;
        if (!id) {
            return {
                success: false,
                statusCode: 404,
                message: 'Id missing',
            };
        }
        const users = await (0, db_institute_1.findProgramsWithStudents)(
            id,
            page,
            limit
        );
        if (!users) {
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
            users: users,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getProgramsWithStudents = getProgramsWithStudents;
const getJobApplicationsByInstituteId = async (req) => {
    var _a, _b, _c;
    try {
        const id =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const page =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.page
            ) || 1;
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10;
        const jobApplications = await (0, db_institute_1.findJobsByInstitute)(
            id,
            page,
            limit
        );
        if (!jobApplications) {
            return {
                success: true,
                statusCode: 200,
                message: 'No Job Applications found',
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Job Applications retrieved successfully',
            jobs: jobApplications,
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
exports.getJobApplicationsByInstituteId = getJobApplicationsByInstituteId;
//# sourceMappingURL=institute.services.js.map
