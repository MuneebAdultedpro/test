'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.addEmployerController =
    exports.getAllJobApplicationsController =
    exports.getEmployerMainBranchController =
    exports.getEmployerByCompanyAndBranchController =
    exports.getEmployerDashboardCountsController =
    exports.updateBranchController =
    exports.getJobApplicationsByEmployerEmailController =
    exports.getBranchByUserIdController =
    exports.getBranchesOfEmployerConrtoller =
    exports.getEmployersOpenPositionsController =
    exports.deleteBranchController =
    exports.getEmployersController =
    exports.getEmployerController =
    exports.getBranchByIdController =
    exports.getBranchesController =
    exports.createBranchController =
        void 0;
const branch_1 = require('../../services/branch');
const branch_services_1 = require('../../services/branch/branch.services');
const createBranchController = async (req, res) => {
    try {
        const result = await (0, branch_1.createBranch)(req);
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
exports.createBranchController = createBranchController;
const addEmployerController = async (req, res) => {
    try {
        const result = await (0, branch_services_1.addEmployer)(req);
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
exports.addEmployerController = addEmployerController;
const getEmployerController = async (req, res) => {
    try {
        const result = await (0, branch_1.getEmployer)(req);
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
                    employer:
                        result === null || result === void 0
                            ? void 0
                            : result.employer,
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
exports.getEmployerController = getEmployerController;
const getEmployersController = async (req, res) => {
    try {
        const result = await (0, branch_1.getEmployers)(req);
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
exports.getEmployersController = getEmployersController;
const getEmployersOpenPositionsController = async (req, res) => {
    try {
        const result = await (0, branch_services_1.getEmployerOpenPosition)(
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
                    openPositions:
                        result === null || result === void 0
                            ? void 0
                            : result.openPositions,
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
exports.getEmployersOpenPositionsController =
    getEmployersOpenPositionsController;
const getBranchByIdController = async (req, res) => {
    try {
        const result = await (0, branch_services_1.getBranchById)(req);
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
                    branch:
                        result === null || result === void 0
                            ? void 0
                            : result.branch,
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
exports.getBranchByIdController = getBranchByIdController;
const getBranchByUserIdController = async (req, res) => {
    try {
        const result = await (0, branch_services_1.getBranchByUserId)(req);
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
                    branch:
                        result === null || result === void 0
                            ? void 0
                            : result.branch,
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
exports.getBranchByUserIdController = getBranchByUserIdController;
const getBranchesController = async (req, res) => {
    try {
        const result = await (0, branch_1.getBranches)(req);
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
                    branches:
                        result === null || result === void 0
                            ? void 0
                            : result.branches,
                    totalBranches:
                        result === null || result === void 0
                            ? void 0
                            : result.totalBranches,
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
exports.getBranchesController = getBranchesController;
const getBranchesOfEmployerConrtoller = async (req, res) => {
    try {
        const result = await (0, branch_1.getBranchesOfEmployer)(req);
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
                    branches:
                        result === null || result === void 0
                            ? void 0
                            : result.branches,
                    totalBranches:
                        result === null || result === void 0
                            ? void 0
                            : result.totalBranches,
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
exports.getBranchesOfEmployerConrtoller = getBranchesOfEmployerConrtoller;
const getJobApplicationsByEmployerEmailController = async (req, res) => {
    try {
        const result = await (0,
        branch_services_1.getJobApplicationsByEmployerEmail)(req);
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
                    applications:
                        result === null || result === void 0
                            ? void 0
                            : result.applications,
                    totalApplications:
                        result === null || result === void 0
                            ? void 0
                            : result.totalApplications,
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
exports.getJobApplicationsByEmployerEmailController =
    getJobApplicationsByEmployerEmailController;
const getAllJobApplicationsController = async (req, res) => {
    try {
        const result = await (0, branch_1.getAllJobApplications)(req);
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
                    applications:
                        result === null || result === void 0
                            ? void 0
                            : result.applications,
                    totalApplications:
                        result === null || result === void 0
                            ? void 0
                            : result.totalApplications,
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
exports.getAllJobApplicationsController = getAllJobApplicationsController;
const deleteBranchController = async (req, res) => {
    try {
        const result = await (0, branch_1.deleteBranch)(req);
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
                    branch:
                        result === null || result === void 0
                            ? void 0
                            : result.branch,
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
exports.deleteBranchController = deleteBranchController;
const updateBranchController = async (req, res) => {
    try {
        const result = await (0, branch_services_1.updateBranch)(req);
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
                    branch:
                        result === null || result === void 0
                            ? void 0
                            : result.updateBranch,
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
exports.updateBranchController = updateBranchController;
const getEmployerDashboardCountsController = async (req, res) => {
    try {
        const result = await (0, branch_1.getEmployerDashboardCounts)(req);
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
exports.getEmployerDashboardCountsController =
    getEmployerDashboardCountsController;
const getEmployerByCompanyAndBranchController = async (req, res) => {
    try {
        const result = await (0, branch_1.getEmployerByCompanyAndBranch)(req);
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
                    Branch:
                        result === null || result === void 0
                            ? void 0
                            : result.branch,
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
exports.getEmployerByCompanyAndBranchController =
    getEmployerByCompanyAndBranchController;
const getEmployerMainBranchController = async (req, res) => {
    try {
        const result = await (0, branch_1.getEmployerMainBranch)(req);
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
                    Branch:
                        result === null || result === void 0
                            ? void 0
                            : result.branch,
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
exports.getEmployerMainBranchController = getEmployerMainBranchController;
//# sourceMappingURL=branch.controller.js.map
