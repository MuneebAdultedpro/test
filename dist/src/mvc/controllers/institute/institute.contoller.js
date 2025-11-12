'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getEmployerCountsController =
    exports.getConsortiumInstitutesByInstituteIdController =
    exports.getJobApplicationsByInstituteIdController =
    exports.getProgramsWithStudentsController =
    exports.getUsersByRoleController =
    exports.fetchTeachersOfInstitutionContoller =
    exports.getInstituteUsersByProgramIdController =
    exports.requestInstituteForApprovalController =
    exports.getInstitueEmployersController =
    exports.updateInstitutesController =
    exports.createProgramController =
    exports.getProgramsController =
    exports.getProgramController =
    exports.getDashboardCountsController =
    exports.getInstitutesController =
    exports.getInstituteController =
    exports.createInstituteController =
        void 0;
const institute_1 = require('../../services/institute');
const createInstituteController = async (req, res) => {
    try {
        const result = await (0, institute_1.createInstitute)(req);
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
exports.createInstituteController = createInstituteController;
const requestInstituteForApprovalController = async (req, res) => {
    try {
        const result = await (0, institute_1.requestInstituteForApproval)(req);
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
exports.requestInstituteForApprovalController =
    requestInstituteForApprovalController;
const getInstituteController = async (req, res) => {
    try {
        const result = await (0, institute_1.getInstitute)(req);
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
                    institute:
                        result === null || result === void 0
                            ? void 0
                            : result.institute,
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
exports.getInstituteController = getInstituteController;
const getInstitutesController = async (req, res) => {
    try {
        const result = await (0, institute_1.getInstitutes)(req);
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
                    institutes:
                        result === null || result === void 0
                            ? void 0
                            : result.institutes,
                    totalInstitutes:
                        result === null || result === void 0
                            ? void 0
                            : result.totalInstitutes,
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
exports.getInstitutesController = getInstitutesController;
const getConsortiumInstitutesByInstituteIdController = async (req, res) => {
    try {
        const result = await (0,
        institute_1.getConsortiumInstitutesByInstituteId)(req);
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
                    institutes:
                        result === null || result === void 0
                            ? void 0
                            : result.institutes,
                    totalInstitutes:
                        result === null || result === void 0
                            ? void 0
                            : result.totalInstitutes,
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
exports.getConsortiumInstitutesByInstituteIdController =
    getConsortiumInstitutesByInstituteIdController;
const fetchTeachersOfInstitutionContoller = async (req, res) => {
    try {
        const result = await (0, institute_1.getInstituteTeachers)(req);
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
            message: error,
        });
    }
};
exports.fetchTeachersOfInstitutionContoller =
    fetchTeachersOfInstitutionContoller;
const updateInstitutesController = async (req, res) => {
    try {
        const result = await (0, institute_1.updateInstitute)(req);
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
                    updatedInstitute:
                        result === null || result === void 0
                            ? void 0
                            : result.updatedInstitute,
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
exports.updateInstitutesController = updateInstitutesController;
const getInstitueEmployersController = async (req, res) => {
    try {
        const result = await (0, institute_1.getInstitueEmployers)(req);
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
                    employers:
                        result === null || result === void 0
                            ? void 0
                            : result.employers,
                    totalEmployers:
                        result === null || result === void 0
                            ? void 0
                            : result.totalEmployers,
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
exports.getInstitueEmployersController = getInstitueEmployersController;
const createProgramController = async (req, res) => {
    try {
        const result = await (0, institute_1.createProgram)(req);
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
                    program:
                        result === null || result === void 0
                            ? void 0
                            : result.program,
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
exports.createProgramController = createProgramController;
const getProgramController = async (req, res) => {
    try {
        const result = await (0, institute_1.getProgram)(req);
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
                    program:
                        result === null || result === void 0
                            ? void 0
                            : result.program,
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
exports.getProgramController = getProgramController;
const getProgramsController = async (req, res) => {
    try {
        const result = await (0, institute_1.getPrograms)(req);
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
                    totalPrograms:
                        result === null || result === void 0
                            ? void 0
                            : result.totalPrograms,
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
exports.getProgramsController = getProgramsController;
const getInstituteUsersByProgramIdController = async (req, res) => {
    try {
        const result = await (0, institute_1.getInstituteUsersByProgramId)(req);
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
exports.getInstituteUsersByProgramIdController =
    getInstituteUsersByProgramIdController;
const getDashboardCountsController = async (req, res) => {
    try {
        const result = await (0, institute_1.getDashboardCounts)(req);
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
                    counts:
                        result === null || result === void 0
                            ? void 0
                            : result.counts,
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
exports.getDashboardCountsController = getDashboardCountsController;
const getEmployerCountsController = async (req, res) => {
    try {
        const result = await (0, institute_1.getEmployerCounts)(req);
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
                    counts:
                        result === null || result === void 0
                            ? void 0
                            : result.counts,
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
exports.getEmployerCountsController = getEmployerCountsController;
const getUsersByRoleController = async (req, res) => {
    try {
        const result = await (0, institute_1.getUsersByRole)(req);
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
exports.getUsersByRoleController = getUsersByRoleController;
const getProgramsWithStudentsController = async (req, res) => {
    try {
        const result = await (0, institute_1.getProgramsWithStudents)(req);
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
exports.getProgramsWithStudentsController = getProgramsWithStudentsController;
const getJobApplicationsByInstituteIdController = async (req, res) => {
    try {
        const result = await (0, institute_1.getJobApplicationsByInstituteId)(
            req
        );
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
                    jobs:
                        result === null || result === void 0
                            ? void 0
                            : result.jobs,
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
exports.getJobApplicationsByInstituteIdController =
    getJobApplicationsByInstituteIdController;
//# sourceMappingURL=institute.contoller.js.map
