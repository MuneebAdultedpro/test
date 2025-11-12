'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.findJobsByInstitute =
    exports.findProgramsWithStudents =
    exports.findUser =
    exports.findUsersByRole =
    exports.findInstituteEmployers =
    exports.findInstituteByIdAndUpdate =
    exports.registerProgram =
    exports.registerInstitute =
    exports.findInstituteTeachers =
    exports.findInstitutesOfConsortiumByInstituteId =
    exports.findInstitutes =
    exports.findInstituteUsersByProgramId =
    exports.findPrograms =
    exports.findProgramById =
    exports.findProgramByName =
    exports.createProgram =
    exports.findInstituteById =
    exports.findNearestInstitues =
    exports.findInstituteByEmail =
        void 0;
const tslib_1 = require('tslib');
const models_1 = require('../models');
const moment_1 = tslib_1.__importDefault(require('moment'));
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const globals_1 = require('../../globals');
const findInstituteByEmail = async (email) => {
    try {
        return await models_1.Institute.findOne({ email });
    } catch (error) {
        throw new Error(
            `Error fetching Institute: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findInstituteByEmail = findInstituteByEmail;
const findNearestInstitues = async (longitude, latitude) => {
    try {
        const institutes = await models_1.Institute.aggregate([
            {
                $geoNear: {
                    near: { type: 'Point', coordinates: [longitude, latitude] },
                    distanceField: 'distance',
                    spherical: true,
                    maxDistance: 50 * globals_1.Constants.MILES_TO_METERS, // 50 miles in meters
                },
            },
            {
                $sort: { distance: 1 }, // nearest first
            },
        ]);
        return institutes;
    } catch (error) {
        throw new Error(
            `Error fetching Institute: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findNearestInstitues = findNearestInstitues;
const findInstituteById = async (id) => {
    try {
        return await models_1.Institute.findById(id).populate('program');
    } catch (error) {
        throw new Error(
            `Error fetching Institute: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findInstituteById = findInstituteById;
const createProgram = async (data) => {
    try {
        const program = await new models_1.Program(data);
        return program.save();
    } catch (error) {
        throw new Error(
            `Error Creating Institute: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.createProgram = createProgram;
const findProgramByName = async (name) => {
    try {
        return await models_1.Program.findOne({ name: name });
    } catch (error) {
        throw new Error(
            `Error fetching Program: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findProgramByName = findProgramByName;
const findProgramById = async (id) => {
    try {
        return await models_1.Program.findById(id);
    } catch (error) {
        throw new Error(
            `Error fetching Program: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findProgramById = findProgramById;
const findPrograms = async (approved, search, limit, page) => {
    try {
        const query = {};
        if (approved) {
            query.approved = approved === 'true';
        }
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        const totalPrograms = await models_1.Program.countDocuments(query);
        const totalPages = Math.ceil(totalPrograms / limit);
        // Removed exec() here
        const programs = await models_1.Program.find(query)
            .sort({
                name: 1,
                createdAt: -1,
            })
            .skip((page - 1) * limit)
            .limit(limit); // Sort alphabetically by name, then by most recent if names are the same
        return { programs, totalPrograms, totalPages, currentPage: page };
    } catch (error) {
        throw new Error(`Error retrieving programs: ${error.message}`);
    }
};
exports.findPrograms = findPrograms;
const findInstituteUsersByProgramId = async (
    programId,
    instituteId,
    page,
    limit,
    startDate,
    endDate,
    search
) => {
    try {
        const query = {
            program_id: programId,
            institute_id: instituteId,
        };
        // Filter by date range if both start and end dates are provided
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
        if (search) {
            query.name = { $regex: search, $options: 'i' }; // Case-insensitive search on 'name'
        }
        const totalUsers = await models_1.User.countDocuments(query);
        const users = await models_1.User.find(query)
            .sort({ createdAt: -1 }) // Sort by most recent
            .skip((page - 1) * limit)
            .limit(limit);
        return { users, totalUsers };
    } catch (error) {
        throw new Error(
            `Error retrieving users for program ID ${programId}: ${error.message}`
        );
    }
};
exports.findInstituteUsersByProgramId = findInstituteUsersByProgramId;
const findInstitutes = async (
    page = 1,
    limit = 10,
    approved,
    startDate,
    endDate,
    search
) => {
    try {
        const query = {};
        if (approved) {
            query.approved = approved === 'true'; // Convert query string to boolean
        }
        // Filter by date range if both start and end dates are provided
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
        if (search) {
            query.name = { $regex: search, $options: 'i' }; // Case-insensitive search on 'name'
        }
        const totalInstitutes = await models_1.Institute.countDocuments(query);
        const totalPages = Math.ceil(totalInstitutes / limit);
        const institutes = await models_1.Institute.find(query)
            .sort({ name: 1, createdAt: -1 }) // Sort alphabetically by name, then by most recent if names are the same
            .skip((page - 1) * limit)
            .limit(limit);
        return { institutes, totalInstitutes, totalPages, currentPage: page };
    } catch (error) {
        throw new Error(`Error retrieving institutes: ${error.message}`);
    }
};
exports.findInstitutes = findInstitutes;
const findInstitutesOfConsortiumByInstituteId = async (
    page = 1,
    limit = 10,
    instituteId,
    approved,
    startDate,
    endDate,
    search
) => {
    try {
        const institute = await models_1.Institute.findById(instituteId).select(
            'consortiom_id'
        );
        if (!institute) {
            throw new Error('Institute not found');
        }
        const consortiumId = institute.consortiom_id;
        const consortiumInstitutes = await models_1.Institute.find({
            consortiom_id: consortiumId,
        }).select('_id');
        const consortiumInstituteIds = consortiumInstitutes.map(
            (inst) => inst._id
        );
        const query = { _id: { $in: consortiumInstituteIds } };
        if (approved) {
            query.approved = approved === 'true';
        }
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
        // Step 4: Paginate the results
        const totalInstitutes = await models_1.Institute.countDocuments(query);
        const totalPages = Math.ceil(totalInstitutes / limit);
        const institutes = await models_1.Institute.find(query)
            .sort({ name: 1, createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        return {
            institutes,
            totalInstitutes,
            totalPages,
            currentPage: page,
        };
    } catch (error) {
        throw new Error(`Error retrieving institutes: ${error.message}`);
    }
};
exports.findInstitutesOfConsortiumByInstituteId =
    findInstitutesOfConsortiumByInstituteId;
const findInstituteTeachers = async (
    instituteId,
    page = 1,
    limit = 10,
    startDate,
    endDate,
    search,
    role
) => {
    try {
        const query = {
            institute_id: instituteId,
            role: {
                $in: [role !== null && role !== void 0 ? role : 'Teacher'],
            },
            rejected_by_admin: { $ne: true },
        };
        // Filter by date range if both start and end dates are provided
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
        if (search) {
            query.name = { $regex: search, $options: 'i' }; // Case-insensitive search on 'name'
        }
        const totalTeachers = await models_1.User.countDocuments(query);
        const teachers = await models_1.User.find(query)
            .sort({ name: 1, createdAt: -1 }) // Sort alphabetically by name, then by most recent if names are the same
            .skip((page - 1) * limit)
            .limit(limit);
        return { teachers, totalTeachers };
    } catch (error) {
        throw new Error(`Error retrieving teachers: ${error.message}`);
    }
};
exports.findInstituteTeachers = findInstituteTeachers;
const registerInstitute = async (data) => {
    try {
        const institute = await new models_1.Institute(data);
        return institute.save();
    } catch (error) {
        throw new Error(
            `Error Creating Institute: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.registerInstitute = registerInstitute;
const registerProgram = async (data) => {
    try {
        const program = await new models_1.Program(data);
        return program.save();
    } catch (error) {
        throw new Error(
            `Error Creating Program: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.registerProgram = registerProgram;
const findInstituteByIdAndUpdate = async (id, data) => {
    try {
        // First, update the document and retrieve the ID of the updated document
        await models_1.Institute.findByIdAndUpdate(id, data, {
            new: true,
        });
        // Then, retrieve the updated document with population
        const updatedDocument = await models_1.Institute.findById(id).populate(
            'program'
        );
        if (!updatedDocument) {
            throw new Error('Institute not found');
        }
        return updatedDocument;
    } catch (error) {
        throw new Error(`Error updating Institute: ${error.message}`);
    }
};
exports.findInstituteByIdAndUpdate = findInstituteByIdAndUpdate;
const findInstituteEmployers = async (
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
        // Use aggregation to fetch employers with the required counts
        const employersData = await models_1.Branch.aggregate([
            { $match: query },
            { $sort: { createdAt: -1 } },
            // Lookup jobs for each employer
            {
                $lookup: {
                    from: 'jobs',
                    localField: '_id',
                    foreignField: 'branch_id',
                    as: 'jobs',
                },
            },
            // Filter out applications for jobs that actually exist
            {
                $lookup: {
                    from: 'job_applications',
                    let: { jobIds: '$jobs._id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ['$job_id', '$$jobIds'] },
                            },
                        },
                        {
                            $project: {
                                _id: 1,
                                status: 1,
                            },
                        },
                    ],
                    as: 'applications',
                },
            },
            // Add fields for the counts we need
            {
                $addFields: {
                    jobCount: { $size: '$jobs' },
                    totalSwipes: { $size: '$applications' },
                    applicationsCount: {
                        $size: {
                            $filter: {
                                input: '$applications',
                                as: 'application',
                                cond: {
                                    $eq: ['$$application.status', 'APPLIED'],
                                },
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    jobs: 0,
                    applications: 0, // Exclude `applications` array
                },
            },
            { $skip: (page - 1) * limit },
            { $limit: limit },
        ]);
        // Count the total documents matching the query for pagination purposes
        const totalEmployers = await models_1.Branch.countDocuments(query);
        const totalPages = Math.ceil(totalEmployers / limit);
        return {
            employers: employersData,
            totalEmployers,
            totalPages,
            currentPage: page,
        };
    } catch (error) {
        throw new Error(`Error retrieving Employers: ${error.message}`);
    }
};
exports.findInstituteEmployers = findInstituteEmployers;
const findUsersByRole = async (role, page, limit) => {
    try {
        const query = { role: role };
        const totalUsers = await models_1.User.countDocuments(query);
        const totalPages = Math.ceil(totalUsers / limit);
        const users = await models_1.User.find(query)
            .sort({ createdAt: -1 }) // Sort by most recent
            .skip((page - 1) * limit)
            .limit(limit);
        return { users, totalUsers, totalPages, currentPage: page };
    } catch (error) {
        throw new Error(`Error retrieving users: ${error.message}`);
    }
};
exports.findUsersByRole = findUsersByRole;
const findUser = async (userId) => {
    try {
        const userExist = await models_1.User.findById(userId);
        return userExist;
    } catch (error) {
        return false;
    }
};
exports.findUser = findUser;
const findProgramsWithStudents = async (institutionId, page, limit) => {
    var _a, _b, _c;
    try {
        const pipeline = [
            // Retrieve all programs
            // Paginate programs
            {
                $skip: (page - 1) * limit,
            },
            {
                $limit: limit,
            },
            {
                $sort: {
                    name: 1, // Sort programs alphabetically (or any preferred field)
                },
            },
            // Lookup to find students for each program
            {
                $lookup: {
                    from: 'users',
                    let: { programId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$program_id', '$$programId'] },
                                        {
                                            $eq: [
                                                '$institute_id',
                                                new mongoose_1.default.Types.ObjectId(
                                                    institutionId
                                                ),
                                            ],
                                        },
                                        { $in: ['Student', '$role'] }, // Match students only
                                    ],
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                email: 1,
                            },
                        },
                    ],
                    as: 'students',
                },
            },
            // Optionally, count total programs for pagination metadata
            {
                $facet: {
                    programsWithStudents: [],
                    totalPrograms: [{ $count: 'total' }],
                },
            },
        ];
        const result = await models_1.Program.aggregate(pipeline);
        return {
            programsWithStudents:
                ((_a = result[0]) === null || _a === void 0
                    ? void 0
                    : _a.programsWithStudents) || [],
            totalPrograms:
                ((_c =
                    (_b = result[0]) === null || _b === void 0
                        ? void 0
                        : _b.totalPrograms[0]) === null || _c === void 0
                    ? void 0
                    : _c.total) || 0,
        };
    } catch (error) {
        throw new Error(
            `Error retrieving programs and students: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findProgramsWithStudents = findProgramsWithStudents;
const findJobsByInstitute = async (instituteId, page, limit) => {
    try {
        if (!instituteId) {
            throw new Error('Invalid institute ID format.');
        }
        // Pagination parameters
        const skip = (page - 1) * limit;
        const results = await models_1.User.aggregate([
            // Match users belonging to the institute
            {
                $match: {
                    institute_id: new mongoose_1.default.Types.ObjectId(
                        instituteId
                    ),
                },
            },
            // Project only the `_id` (candidate IDs) to optimize performance
            {
                $project: {
                    _id: 1,
                },
            },
            // Lookup job applications based on candidate IDs
            {
                $lookup: {
                    from: 'job_applications',
                    localField: '_id',
                    foreignField: 'candidate_id',
                    as: 'applications',
                },
            },
            {
                $unwind: '$applications', // Flatten applications array
            },
            // Project only the job application fields
            {
                $project: {
                    _id: '$applications._id',
                    candidate_id: '$applications.candidate_id',
                    job_id: '$applications.job_id',
                    status: '$applications.status',
                    is_test: '$applications.is_test',
                },
            },
            // Pagination
            {
                $skip: skip,
            },
            {
                $limit: limit,
            },
        ]);
        return results; // Return the job applications
    } catch (error) {
        throw new Error(`Error retrieving job applications: ${error.message}`);
    }
};
exports.findJobsByInstitute = findJobsByInstitute;
//# sourceMappingURL=db.institute.js.map
