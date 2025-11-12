'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.addEmployer =
    exports.getAllJobApplications =
    exports.getEmployerMainBranch =
    exports.getEmployerByCompanyAndBranch =
    exports.getEmployerDashboardCounts =
    exports.updateBranch =
    exports.getJobApplicationsByEmployerEmail =
    exports.getBranchByUserId =
    exports.getBranchesOfEmployer =
    exports.getEmployerOpenPosition =
    exports.deleteBranch =
    exports.getEmployer =
    exports.getEmployers =
    exports.getBranchById =
    exports.getBranches =
    exports.createBranch =
        void 0;
const db_branch_1 = require('../../database/db.branch');
const db_user_1 = require('../../database/db.user');
const db_jobs_1 = require('../../database/db.jobs');
const db_chat_1 = require('../../database/db.chat');
const createBranch = async (req) => {
    try {
        // const user = await findBranchByEmail(req?.body?.email);
        // if (user) {
        //     return {
        //         success: false,
        //         statusCode: 403,
        //         message: 'User Already Exist',
        //     };
        // }
        const newUser = await (0, db_branch_1.registerBranch)(
            req === null || req === void 0 ? void 0 : req.body
        );
        if (newUser) {
            return {
                user: newUser,
                message: 'new Branch registered Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 403,
                message: 'Error Registering Branch',
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
exports.createBranch = createBranch;
const addEmployer = async (req) => {
    var _a;
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return {
                success: false,
                statusCode: 400,
                message: 'Invalid request. Data is required.',
            };
        }
        const user = await (0, db_branch_1.findBranchByEmail)(
            (_a = req === null || req === void 0 ? void 0 : req.body) ===
                null || _a === void 0
                ? void 0
                : _a.email
        );
        if (user) {
            return {
                success: false,
                statusCode: 400,
                message: 'User Already Exist',
            };
        }
        const newUser = await (0, db_branch_1.registerBranchAndUser)(
            req === null || req === void 0 ? void 0 : req.body
        );
        if (newUser) {
            return {
                user: newUser,
                message: 'new Branch registered Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 400,
                message: 'Error Registering Branch',
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
exports.addEmployer = addEmployer;
const getEmployers = async (req) => {
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
        const { employers, totalEmployers } = await (0,
        db_branch_1.findAllEmployers)(page, limit, startDate, endDate, search);
        if (
            !(employers === null || employers === void 0
                ? void 0
                : employers.length)
        ) {
            return {
                success: true,
                statusCode: 200,
                message: 'No Branches Found',
                employers: [],
                totalEmployers: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Branches retrieved successfully',
            employers,
            totalEmployers,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getEmployers = getEmployers;
const getEmployer = async (req) => {
    var _a;
    try {
        const EmployerId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        if (!EmployerId) {
            return {
                success: false,
                statusCode: 403,
                message: 'Please Provide EmployerId',
            };
        }
        const employer = await (0, db_branch_1.findEmployerById)(EmployerId);
        if (!employer) {
            return {
                success: false,
                statusCode: 403,
                message: "Employer with the given id doesn't exist",
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Employer retrieved successfully',
            employer: employer,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getEmployer = getEmployer;
const getEmployerOpenPosition = async (req) => {
    var _a, _b;
    try {
        const employerId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const candidateId =
            (_b = req === null || req === void 0 ? void 0 : req.user) ===
                null || _b === void 0
                ? void 0
                : _b.id;
        if (!employerId) {
            return {
                success: false,
                statusCode: 403,
                message: 'Please Provide EmployerId',
            };
        }
        const branch = await (0, db_branch_1.findBranchById)(employerId);
        if (!branch) {
            return {
                success: false,
                statusCode: 403,
                message: "Employer with the given id doesn't exist",
            };
        }
        const openPositions = await (0, db_branch_1.findEmployerOpenPositions)(
            employerId,
            candidateId
        );
        return {
            success: true,
            statusCode: 200,
            message: 'Positions retrieved successfully',
            openPositions: openPositions,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getEmployerOpenPosition = getEmployerOpenPosition;
const deleteBranch = async (req) => {
    var _a;
    try {
        const branchId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        if (!branchId) {
            return {
                success: false,
                statusCode: 404,
                message: 'Branch id is required',
            };
        }
        const branch = await (0, db_branch_1.removeBranch)(branchId);
        if (!branch) {
            return {
                success: false,
                statusCode: 403,
                message: 'No branch Found',
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Branch deleted successfully',
            branch,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.deleteBranch = deleteBranch;
const updateBranch = async (req) => {
    var _a;
    try {
        const branchId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const updateBranch = await (0, db_branch_1.findBranchByIdAndUpdate)(
            branchId,
            req.body
        );
        if (updateBranch) {
            return {
                updateBranch: updateBranch,
                message: 'Branch Updated Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 403,
                message: 'Error getting Branch',
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
exports.updateBranch = updateBranch;
const getEmployerDashboardCounts = async (req) => {
    var _a;
    try {
        const id =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const user = await (0, db_user_1.findUserById)(id);
        if (!user) {
            return {
                success: false,
                statusCode: 404,
                message: "User with the given id doesn't exist",
            };
        }
        const jobs = await (0, db_jobs_1.fetchDashboardsJobByUserId)(id);
        const swipeCounts = await (0,
        db_jobs_1.getEmployerDashobardSwipeCounts)(jobs);
        const applicationCounts = await (0,
        db_jobs_1.getEmployerDashobardApplicationCounts)(jobs);
        const chatCounts = await (0, db_chat_1.dashboardChatsCount)(user._id);
        return {
            success: true,
            statusCode: 200,
            message: 'Counts retrieved successfully',
            counts: {
                jobCounts:
                    jobs === null || jobs === void 0 ? void 0 : jobs.length,
                swipeCounts,
                applicationCounts,
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
exports.getEmployerDashboardCounts = getEmployerDashboardCounts;
const getEmployerByCompanyAndBranch = async (req) => {
    var _a, _b;
    try {
        const companyName =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.name;
        const branchLocation =
            (_b = req === null || req === void 0 ? void 0 : req.query) ===
                null || _b === void 0
                ? void 0
                : _b.branchLocation;
        if (!companyName || !branchLocation) {
            return {
                success: false,
                statusCode: 400,
                message: 'Please Provide company Name and branch Location',
            };
        }
        const branch = await (0, db_branch_1.findEmployerByCompanyAndBranch)(
            companyName,
            branchLocation
        );
        if (!branch) {
            return {
                success: false,
                statusCode: 200,
                message:
                    "Branch with the given name and branch location doesn't exist",
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Branch retrieved successfully',
            branch: branch,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getEmployerByCompanyAndBranch = getEmployerByCompanyAndBranch;
const getEmployerMainBranch = async (req) => {
    var _a;
    try {
        const companyName =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.name;
        if (!companyName) {
            return {
                success: false,
                statusCode: 400,
                message: 'Please Provide company Name',
            };
        }
        const branch = await (0, db_branch_1.findEmployerMainBranch)(
            companyName
        );
        if (!branch) {
            return {
                success: false,
                statusCode: 200,
                message: 'No Main branch found',
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Main Branch retrieved successfully',
            branch: branch,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getEmployerMainBranch = getEmployerMainBranch;
const getBranchById = async (req) => {
    var _a;
    try {
        const branchId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        if (!branchId) {
            return {
                success: false,
                statusCode: 400,
                message: 'Please Provide EmployerId',
            };
        }
        const branch = await (0, db_branch_1.findBranchById)(branchId);
        if (!branch) {
            return {
                success: true,
                statusCode: 200,
                message: "Branch with the given id doesn't exist",
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Branch retrieved successfully',
            branch: branch,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getBranchById = getBranchById;
const getBranchByUserId = async (req) => {
    var _a;
    try {
        const employerUserId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        if (!employerUserId) {
            return {
                success: false,
                statusCode: 403,
                message: 'Please Provide Employer UserId',
            };
        }
        const branch = await (0, db_branch_1.findBranchByUserId)(
            employerUserId
        );
        if (!branch) {
            return {
                success: false,
                statusCode: 403,
                message: "Branch with the given id doesn't exist",
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Branch retrieved successfully',
            branch: branch,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getBranchByUserId = getBranchByUserId;
const getBranches = async (req) => {
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
        const { branches, totalBranches } = await (0, db_branch_1.findBranches)(
            page,
            limit,
            startDate,
            endDate,
            search
        );
        if (
            !(branches === null || branches === void 0
                ? void 0
                : branches.length)
        ) {
            return {
                success: true,
                statusCode: 200,
                message: 'No Branches Found',
                branches: [],
                totalBranches: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Branches retrieved successfully',
            branches,
            totalBranches,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getBranches = getBranches;
const getBranchesOfEmployer = async (req) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
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
        const email =
            (_h = req === null || req === void 0 ? void 0 : req.query) ===
                null || _h === void 0
                ? void 0
                : _h.email;
        const { branches, totalBranches } = await (0,
        db_branch_1.findBranchesOfEmployer)(
            page,
            limit,
            startDate,
            endDate,
            search,
            email
        );
        if (
            !(branches === null || branches === void 0
                ? void 0
                : branches.length)
        ) {
            return {
                success: true,
                statusCode: 200,
                message: 'No Branches Found',
                branches: [],
                totalBranches: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Branches retrieved successfully',
            branches,
            totalBranches,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getBranchesOfEmployer = getBranchesOfEmployer;
const getJobApplicationsByEmployerEmail = async (req) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    try {
        const employerEmail =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.employerEmail;
        const page =
            parseInt(
                (_b = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _b === void 0
                    ? void 0
                    : _b.page
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10; // Pagination: number of records per page
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
            : undefined; // Optional start date
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
            : undefined; // Optional end date
        const search =
            (_h = req === null || req === void 0 ? void 0 : req.query) ===
                null || _h === void 0
                ? void 0
                : _h.search; // Optional search query for branch name
        const { applications, totalApplications } = await (0,
        db_branch_1.findJobApplicationsByEmployerEmail)(
            employerEmail,
            page,
            limit,
            startDate,
            endDate,
            search
        );
        if (
            !(applications === null || applications === void 0
                ? void 0
                : applications.length)
        ) {
            return {
                success: true,
                statusCode: 200,
                message: 'No Applications Found',
                applications: [],
                totalApplications: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Branches retrieved successfully',
            applications,
            totalApplications,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getJobApplicationsByEmployerEmail = getJobApplicationsByEmployerEmail;
const getAllJobApplications = async (req) => {
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
        const { applications, totalApplications } = await (0,
        db_branch_1.findAllJobApplications)(
            page,
            limit,
            startDate,
            endDate,
            search
        );
        if (
            !(applications === null || applications === void 0
                ? void 0
                : applications.length)
        ) {
            return {
                success: true,
                statusCode: 200,
                message: 'No Applications Found',
                applications: [],
                totalApplications: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Applications retrieved successfully',
            applications,
            totalApplications,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getAllJobApplications = getAllJobApplications;
//# sourceMappingURL=branch.services.js.map
