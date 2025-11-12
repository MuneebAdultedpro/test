'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.findUserByIdAndUpdate =
    exports.findInstitudeIdByUserId =
    exports.createUser =
    exports.findAllUsers =
    exports.registerUser =
    exports.registerStudent =
    exports.findUsers =
    exports.removeUser =
    exports.findUserById =
    exports.findUnClaimedByStudentIdAndInstitueId =
    exports.findUserByEmail =
        void 0;
const tslib_1 = require('tslib');
const models_1 = require('../models');
const moment_1 = tslib_1.__importDefault(require('moment'));
const findUserByEmail = async (email) => {
    try {
        return await models_1.User.findOne({ email }).populate({
            path: 'institute_id',
            select: 'name', // Only include the 'name' field
        });
    } catch (error) {
        throw new Error(
            `Error Fetching User: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findUserByEmail = findUserByEmail;
const findUnClaimedByStudentIdAndInstitueId = async (
    student_id,
    instituteId
) => {
    try {
        return await models_1.User.findOne({
            student_id,
            institute_id: instituteId,
            is_account_claimed: false,
        });
    } catch (error) {
        throw new Error(
            `Error Fetching User: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findUnClaimedByStudentIdAndInstitueId =
    findUnClaimedByStudentIdAndInstitueId;
const findUserById = async (id) => {
    try {
        return await models_1.User.findById(id)
            .populate({
                path: 'program_id',
            })
            .populate({
                path: 'institute_id',
                populate: {
                    path: 'program',
                    model: 'program',
                },
            });
    } catch (error) {
        throw new Error(
            `Error Fetching User: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findUserById = findUserById;
const removeUser = async (id) => {
    try {
        const deletedUser = await models_1.User.findByIdAndDelete(id);
        return deletedUser;
    } catch (error) {
        throw new Error(
            `Error Deleting User: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.removeUser = removeUser;
const findUsers = async (
    page,
    limit,
    startDate,
    endDate,
    search // Add search parameter
) => {
    try {
        // Construct the base query for users
        const query = {
            approved_by_admin: true,
            expiry_date: { $in: ['', null] }, // Adjusted check
        };
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
        // Use aggregate to fetch users with application count
        const usersWithApplicationCount = await models_1.User.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: 'institutions',
                    localField: 'institute_id',
                    foreignField: '_id',
                    as: 'instituteDetails',
                },
            },
            {
                $lookup: {
                    from: 'job_applications',
                    localField: '_id',
                    foreignField: 'candidate_id',
                    as: 'jobApplications',
                },
            },
            {
                $lookup: {
                    from: 'programs',
                    localField: 'program_id',
                    foreignField: '_id',
                    as: 'programDetails', // Field name for populated data
                },
            },
            {
                $addFields: {
                    applicationsCount: { $size: '$jobApplications' },
                    program: { $arrayElemAt: ['$programDetails', 0] }, // Extract first program object
                },
            },
            {
                $project: {
                    programDetails: 0, // Exclude the programDetails field
                },
            },
            { $sort: { createdAt: -1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit },
        ]);
        // Get the total count of users that match the query
        const totalUsers = await models_1.User.countDocuments(query);
        const totalPages = Math.ceil(totalUsers / limit);
        return {
            users: usersWithApplicationCount,
            totalUsers,
            totalPages,
            currentPage: page,
        };
    } catch (error) {
        throw new Error(`Error retrieving users`);
    }
};
exports.findUsers = findUsers;
const registerStudent = async (data) => {
    try {
        const student = await new models_1.User(data);
        return student.save();
    } catch (error) {
        throw new Error(
            `Error Creating User: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.registerStudent = registerStudent;
const registerUser = async (data) => {
    try {
        const newUser = await new models_1.User(data);
        return newUser.save();
    } catch (error) {
        throw new Error(
            `Error Creating User: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.registerUser = registerUser;
const findAllUsers = async (
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
exports.findAllUsers = findAllUsers;
const createUser = async (data) => {
    // const user = await new User(data);
    // return user.save();
    const user = new models_1.User(data);
    const savedUser = await user.save();
    return savedUser.toObject();
};
exports.createUser = createUser;
const findInstitudeIdByUserId = async (userId) => {
    var _a, _b;
    try {
        const user = await models_1.User.findById(userId).select(
            'institute_id'
        );
        return {
            institueId:
                (_b =
                    (_a =
                        user === null || user === void 0
                            ? void 0
                            : user.institute_id) === null || _a === void 0
                        ? void 0
                        : _a.toString) === null || _b === void 0
                    ? void 0
                    : _b.call(_a),
        };
    } catch (error) {
        throw new Error(`Error retrieving users: ${error.message}`);
    }
};
exports.findInstitudeIdByUserId = findInstitudeIdByUserId;
const findUserByIdAndUpdate = async (id, data) => {
    try {
        // First, update the document and retrieve the ID of the updated document
        await models_1.User.findByIdAndUpdate(id, data, {
            new: true,
        });
        // Then, retrieve the updated document with population
        const updatedDocument = await models_1.User.findById(id)
            .populate('program_id')
            .populate('institute_id');
        if (!updatedDocument) {
            throw new Error('user not found');
        }
        return updatedDocument;
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
};
exports.findUserByIdAndUpdate = findUserByIdAndUpdate;
//# sourceMappingURL=db.user.js.map
