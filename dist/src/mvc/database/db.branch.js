'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.removeBranch =
    exports.findBranchByIdAndUpdate =
    exports.registerBranchAndUser =
    exports.registerBranch =
    exports.findBranchesOfEmployer =
    exports.findAllJobApplications =
    exports.findJobApplicationsByEmployerEmail =
    exports.findBranches =
    exports.findAllEmployersIds =
    exports.findAllEmployers =
    exports.findEmployerOpenPositions =
    exports.findEmployerById =
    exports.findBranchByUserId =
    exports.findEmployerMainBranch =
    exports.findEmployerByCompanyAndBranch =
    exports.findBranchById =
    exports.findBranchByEmail =
        void 0;
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const models_1 = require('../models');
const moment_1 = tslib_1.__importDefault(require('moment'));
const types_1 = require('../../interfaces/types');
const findBranchByEmail = async (email) => {
    try {
        return await models_1.Branch.findOne({ email });
    } catch (error) {
        throw new Error(
            `Error fetching Branch: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findBranchByEmail = findBranchByEmail;
const findBranchById = async (id) => {
    try {
        return await models_1.Branch.findById(id);
    } catch (error) {
        throw new Error(
            `Error fetching Branch: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findBranchById = findBranchById;
const findEmployerByCompanyAndBranch = async (name, branchLocation) => {
    try {
        return await models_1.Branch.findOne({
            name: name,
            branch_location: branchLocation,
        });
    } catch (error) {
        throw new Error(
            `Error fetching Branch: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findEmployerByCompanyAndBranch = findEmployerByCompanyAndBranch;
const findEmployerMainBranch = async (name) => {
    try {
        return await models_1.Branch.findOne({
            name: name,
            is_head_quarter: true,
            photo_url: { $ne: '' },
        });
    } catch (error) {
        throw new Error(
            `Error fetching Branch: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findEmployerMainBranch = findEmployerMainBranch;
const findBranchByUserId = async (id) => {
    try {
        return await models_1.Branch.find({ userId: id });
    } catch (error) {
        throw new Error(
            `Error fetching Branch: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findBranchByUserId = findBranchByUserId;
const findEmployerById = async (id) => {
    try {
        const employer = await models_1.User.findById(id).populate({
            path: 'branches',
            match: { userId: id },
        });
        return employer;
    } catch (error) {}
};
exports.findEmployerById = findEmployerById;
const findEmployerOpenPositions = async (branchId, candidateId) => {
    try {
        const positions = await models_1.Job.aggregate([
            // Match active jobs for the specific branch
            {
                $match: {
                    branch_id: new mongoose_1.default.Types.ObjectId(branchId),
                    is_active: true,
                },
            },
            // Lookup job applications to check if the user has applied
            {
                $lookup: {
                    from: 'job_applications',
                    let: { jobId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$job_id', '$$jobId'] },
                                        {
                                            $eq: [
                                                '$candidate_id',
                                                new mongoose_1.default.Types.ObjectId(
                                                    candidateId
                                                ),
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                    as: 'applications',
                },
            },
            // Add fields based on the lookup results
            {
                $addFields: {
                    isApplied: {
                        $gt: [
                            {
                                $size: {
                                    $filter: {
                                        input: '$applications',
                                        as: 'application',
                                        cond: {
                                            $eq: [
                                                '$$application.status',
                                                'Applied',
                                            ],
                                        },
                                    },
                                },
                            },
                            0,
                        ],
                    },
                    isBookmarked: {
                        $gt: [
                            {
                                $size: {
                                    $filter: {
                                        input: '$applications',
                                        as: 'application',
                                        cond: {
                                            $eq: [
                                                '$$application.status',
                                                'Bookmarked',
                                            ],
                                        },
                                    },
                                },
                            },
                            0,
                        ],
                    },
                },
            },
            // Remove the lookup fields to clean up the response
            {
                $project: {
                    applications: 0,
                },
            },
        ]);
        return positions;
    } catch (error) {
        console.error('Error retrieving open positions:', error);
        throw error;
    }
};
exports.findEmployerOpenPositions = findEmployerOpenPositions;
const findAllEmployers = async (
    page,
    limit,
    startDate,
    endDate,
    search // Add search parameter
) => {
    try {
        const query = {};
        // Filter by date range if both start and end date are provided
        if (startDate && endDate) {
            // Use moment to adjust date if needed, like setting time to start of the day
            const formattedStartDate = (0, moment_1.default)(startDate)
                .startOf('day')
                .toDate();
            const formattedEndDate = (0, moment_1.default)(endDate)
                .endOf('day')
                .toDate();
            query.createdAt = {
                $gte: formattedStartDate,
                $lte: formattedEndDate,
            };
        }
        // Filter by search term if provided
        if (search) {
            query.name = { $regex: search, $options: 'i' }; // Case-insensitive search on 'name'
        }
        const totalEmployers = await models_1.Branch.countDocuments(query);
        const employers = await models_1.Branch.find(query)
            .sort({ createdAt: -1 }) // Sort by most recent
            .skip((page - 1) * limit)
            .limit(limit);
        return { employers, totalEmployers };
    } catch (error) {
        throw new Error(`Error retrieving Employers: ${error.message}`);
    }
};
exports.findAllEmployers = findAllEmployers;
const findAllEmployersIds = async () => {
    try {
        const query = {};
        const totalEmployers = await models_1.Branch.countDocuments(query);
        const employers = await models_1.Branch.find(query).select('_id');
        return { employers: employers.map((emp) => emp._id), totalEmployers };
    } catch (error) {
        throw new Error(`Error retrieving Employers: ${error.message}`);
    }
};
exports.findAllEmployersIds = findAllEmployersIds;
const findBranches = async (page, limit, startDate, endDate, search) => {
    try {
        const query = {};
        // if (approved) {
        //     query.approved = approved === 'true';
        // }
        if (startDate && endDate) {
            const formattedStartDate = (0, moment_1.default)(startDate)
                .startOf('day')
                .toDate();
            const formattedEndDate = (0, moment_1.default)(endDate)
                .endOf('day')
                .toDate();
            query.createdAt = {
                $gte: formattedStartDate,
                $lte: formattedEndDate,
            };
        }
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        const totalBranches = await models_1.Branch.countDocuments(query);
        const branches = await models_1.Branch.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        return { branches, totalBranches };
    } catch (error) {
        throw new Error(`Error retrieving branches: ${error.message}`);
    }
};
exports.findBranches = findBranches;
const findJobApplicationsByEmployerEmail = async (
    employerEmail,
    page,
    limit,
    startDate,
    endDate,
    search
) => {
    // if the current query is not very performant then try to use this query instead
    // try {
    // Step 1: Fetch all jobs related to the employer
    //     const jobsPipeline = [
    //         {
    //             $lookup: {
    //                 from: 'branches',
    //                 localField: 'branch_id',
    //                 foreignField: '_id',
    //                 as: 'branchDetails',
    //             },
    //         },
    //         {
    //             $match: {
    //                 'branchDetails.email': employerEmail,
    //             },
    //         },
    //         {
    //             $project: { _id: 1 }, // Only fetch the job IDs
    //         },
    //     ];
    var _a, _b, _c, _d;
    //     const jobsResult = await Job.aggregate(jobsPipeline);
    //     const jobIds = jobsResult.map((job) => job._id);
    //     if (jobIds.length === 0) {
    //         return { applications: [], totalApplications: 0 };
    //     }
    //     // Step 2: Fetch applications for the retrieved jobs
    //     const query: any = {
    //         job_id: { $in: jobIds },
    //         status: { $in: ['Applied', 'Chatting'] },
    //     };
    //     // Add date range filter if provided
    //     if (startDate && endDate) {
    //         const formattedStartDate = moment(startDate)
    //             .startOf('day')
    //             .toDate();
    //         const formattedEndDate = moment(endDate).endOf('day').toDate();
    //         query.createdAt = {
    //             $gte: formattedStartDate,
    //             $lte: formattedEndDate,
    //         };
    //     }
    //     // Add search filter if provided
    //     if (search) {
    //         query['job_snapshot.title'] = { $regex: search, $options: 'i' };
    //     }
    //     const totalApplications = await JobApplication.countDocuments(query);
    //     const applications = await JobApplication.find(query)
    //         .sort({ createdAt: -1 })
    //         .skip((page - 1) * limit)
    //         .limit(limit);
    //     return { applications, totalApplications };
    // } catch (error) {
    //     throw new Error(`Error retrieving applications: ${error.message}`);
    // }
    try {
        const query = {};
        const applicationStatusFilter = [
            types_1.JobApplicationStatus.APPLIED,
            types_1.JobApplicationStatus.chatting,
        ];
        // Add a condition for date range filtering
        if (startDate && endDate) {
            const formattedStartDate = (0, moment_1.default)(startDate)
                .startOf('day')
                .toDate();
            const formattedEndDate = (0, moment_1.default)(endDate)
                .endOf('day')
                .toDate();
            query.createdAt = {
                $gte: formattedStartDate,
                $lte: formattedEndDate,
            };
        }
        // Add a condition for searching by name
        if (search) {
            query['job_snapshot.title'] = { $regex: search, $options: 'i' };
        }
        // Adjust the query for the pipeline
        const pipeline = [
            // Step 1: Match job applications with specified statuses
            {
                $match: {
                    status: { $in: applicationStatusFilter },
                },
            },
            // Step 2: Lookup to join with the `job` collection
            {
                $lookup: {
                    from: 'jobs',
                    localField: 'job_id',
                    foreignField: '_id',
                    as: 'jobDetails',
                },
            },
            {
                $unwind: '$jobDetails', // Unwind job details to a single object
            },
            // Step 3: Lookup to join with the `candidate` collection
            {
                $lookup: {
                    from: 'users',
                    localField: 'candidate_id',
                    foreignField: '_id',
                    as: 'candidateDetails',
                },
            },
            {
                $unwind: '$candidateDetails', // Unwind candidate details to a single object
            },
            // Step 4: Lookup to join with the `program` collection for candidate details
            {
                $lookup: {
                    from: 'programs',
                    localField: 'candidateDetails.program_id',
                    foreignField: '_id',
                    as: 'candidateDetails.programDetails',
                },
            },
            {
                $unwind: {
                    path: '$candidateDetails.programDetails',
                    preserveNullAndEmptyArrays: true, // Optional: Include candidates without a program
                },
            },
            // Step 5: Lookup to join with the `branch` collection
            {
                $lookup: {
                    from: 'branches',
                    localField: 'jobDetails.branch_id',
                    foreignField: '_id',
                    as: 'branchDetails',
                },
            },
            {
                $unwind: '$branchDetails',
            },
            // Step 6: Match jobs posted by the specific employer email
            {
                $match: {
                    'branchDetails.email': employerEmail,
                },
            },
            // Step 7: Add filtering and sorting based on query conditions
            {
                $match: query,
            },
            {
                $project: {
                    _id: 1,
                    status: 1,
                    createdAt: 1,
                    jobDetails: {
                        _id: 1,
                        title: 1,
                        branch_id: 1,
                        photo_url: 1,
                        job_description: 1,
                    },
                    candidateDetails: {
                        name: 1,
                        _id: 1,
                        email: 1,
                        employerNotes: 1,
                        institute_id: 1,
                        programDetails: {
                            // Include program details
                            _id: 1,
                            name: 1,
                            description: 1,
                        },
                    },
                    branchDetails: {
                        name: 1,
                        email: 1,
                        _id: 1,
                    },
                },
            },
            // Step 8: Pagination (skip and limit)
            {
                $facet: {
                    metadata: [
                        { $count: 'totalApplications' },
                        {
                            $addFields: { page, limit },
                        },
                    ],
                    applications: [
                        { $sort: { createdAt: -1 } },
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                    ],
                },
            },
        ];
        const result = await models_1.JobApplication.aggregate(pipeline);
        const totalApplications =
            ((_c =
                (_b =
                    (_a =
                        result === null || result === void 0
                            ? void 0
                            : result[0]) === null || _a === void 0
                        ? void 0
                        : _a.metadata) === null || _b === void 0
                    ? void 0
                    : _b[0]) === null || _c === void 0
                ? void 0
                : _c.totalApplications) || 0;
        const applications =
            ((_d =
                result === null || result === void 0 ? void 0 : result[0]) ===
                null || _d === void 0
                ? void 0
                : _d.applications) || [];
        return { applications, totalApplications };
    } catch (error) {
        throw new Error(`Error retrieving applications: ${error.message}`);
    }
};
exports.findJobApplicationsByEmployerEmail = findJobApplicationsByEmployerEmail;
const findAllJobApplications = async (
    page,
    limit,
    startDate,
    endDate,
    search
) => {
    var _a, _b, _c, _d;
    try {
        const query = {};
        const applicationStatusFilter = [
            types_1.JobApplicationStatus.APPLIED,
            types_1.JobApplicationStatus.chatting,
        ];
        // Add a condition for date range filtering
        if (startDate && endDate) {
            const formattedStartDate = (0, moment_1.default)(startDate)
                .startOf('day')
                .toDate();
            const formattedEndDate = (0, moment_1.default)(endDate)
                .endOf('day')
                .toDate();
            query.createdAt = {
                $gte: formattedStartDate,
                $lte: formattedEndDate,
            };
        }
        // Add a condition for searching by name
        if (search) {
            query['job_snapshot.title'] = { $regex: search, $options: 'i' };
        }
        // Adjust the query for the pipeline
        const pipeline = [
            // Step 1: Match job applications with specified statuses
            {
                $match: {
                    status: { $in: applicationStatusFilter },
                },
            },
            // Step 2: Lookup to join with the `job` collection
            {
                $lookup: {
                    from: 'jobs',
                    localField: 'job_id',
                    foreignField: '_id',
                    as: 'jobDetails',
                },
            },
            {
                $unwind: '$jobDetails', // Unwind job details to a single object
            },
            // Step 3: Lookup to join with the `candidate` collection
            {
                $lookup: {
                    from: 'users',
                    localField: 'candidate_id',
                    foreignField: '_id',
                    as: 'candidateDetails',
                },
            },
            {
                $unwind: '$candidateDetails', // Unwind candidate details to a single object
            },
            // Step 4: Lookup to join with the `program` collection for candidate details
            {
                $lookup: {
                    from: 'programs',
                    localField: 'candidateDetails.program_id',
                    foreignField: '_id',
                    as: 'candidateDetails.programDetails',
                },
            },
            {
                $unwind: {
                    path: '$candidateDetails.programDetails',
                    preserveNullAndEmptyArrays: true, // Optional: Include candidates without a program
                },
            },
            // Step 5: Lookup to join with the `branch` collection
            {
                $lookup: {
                    from: 'branches',
                    localField: 'jobDetails.branch_id',
                    foreignField: '_id',
                    as: 'branchDetails',
                },
            },
            {
                $unwind: '$branchDetails',
            },
            // Step 6: Add filtering and sorting based on query conditions
            {
                $match: query,
            },
            {
                $project: {
                    _id: 1,
                    status: 1,
                    createdAt: 1,
                    jobDetails: {
                        _id: 1,
                        title: 1,
                        branch_id: 1,
                    },
                    candidateDetails: {
                        name: 1,
                        _id: 1,
                        email: 1,
                        employerNotes: 1,
                        institute_id: 1,
                        programDetails: {
                            // Include program details
                            _id: 1,
                            name: 1,
                            description: 1,
                        },
                    },
                    branchDetails: {
                        name: 1,
                        email: 1,
                        _id: 1,
                    },
                },
            },
            // Step 8: Pagination (skip and limit)
            {
                $facet: {
                    metadata: [
                        { $count: 'totalApplications' },
                        {
                            $addFields: { page, limit },
                        },
                    ],
                    applications: [
                        { $sort: { createdAt: -1 } },
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                    ],
                },
            },
        ];
        const result = await models_1.JobApplication.aggregate(pipeline);
        const totalApplications =
            ((_c =
                (_b =
                    (_a =
                        result === null || result === void 0
                            ? void 0
                            : result[0]) === null || _a === void 0
                        ? void 0
                        : _a.metadata) === null || _b === void 0
                    ? void 0
                    : _b[0]) === null || _c === void 0
                ? void 0
                : _c.totalApplications) || 0;
        const applications =
            ((_d =
                result === null || result === void 0 ? void 0 : result[0]) ===
                null || _d === void 0
                ? void 0
                : _d.applications) || [];
        return { applications, totalApplications };
    } catch (error) {
        throw new Error(`Error retrieving applications: ${error.message}`);
    }
};
exports.findAllJobApplications = findAllJobApplications;
const findBranchesOfEmployer = async (
    page,
    limit,
    startDate,
    endDate,
    search,
    employerEmail
) => {
    try {
        const query = { email: employerEmail };
        if (startDate && endDate) {
            const formattedStartDate = (0, moment_1.default)(startDate)
                .startOf('day')
                .toDate();
            const formattedEndDate = (0, moment_1.default)(endDate)
                .endOf('day')
                .toDate();
            query.createdAt = {
                $gte: formattedStartDate,
                $lte: formattedEndDate,
            };
        }
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        const totalBranches = await models_1.Branch.countDocuments(query);
        const branches = await models_1.Branch.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        return { branches, totalBranches };
    } catch (error) {
        throw new Error(`Error retrieving branches: ${error.message}`);
    }
};
exports.findBranchesOfEmployer = findBranchesOfEmployer;
const registerBranch = async (data) => {
    try {
        const branch = await new models_1.Branch(data);
        return branch.save();
    } catch (error) {
        throw new Error(`Error Creating Branch: ${error.message}`);
    }
};
exports.registerBranch = registerBranch;
const registerBranchAndUser = async (data) => {
    try {
        const user = await new models_1.User(data);
        user.save();
        const branch = await new models_1.Branch(data);
        return branch.save();
    } catch (error) {
        throw new Error(`Error Creating Branch: ${error.message}`);
    }
};
exports.registerBranchAndUser = registerBranchAndUser;
const findBranchByIdAndUpdate = async (id, data) => {
    try {
        const updatedDocument = await models_1.Branch.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
            }
        );
        if (!updatedDocument) {
            throw new Error('Branch not found');
        }
        return updatedDocument;
    } catch (error) {
        throw new Error(`Error updating branch: ${error.message}`);
    }
};
exports.findBranchByIdAndUpdate = findBranchByIdAndUpdate;
const removeBranch = async (id) => {
    try {
        const deletedBranch = await models_1.Branch.findByIdAndDelete(id);
        return deletedBranch;
    } catch (error) {
        throw new Error(`Error Deleting Branch: ${error.message}`);
    }
};
exports.removeBranch = removeBranch;
//# sourceMappingURL=db.branch.js.map
