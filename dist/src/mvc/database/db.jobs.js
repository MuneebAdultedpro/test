'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.updateApplicationById =
    exports.fetchApplicationsById =
    exports.updateJob =
    exports.getEmployerDashobardApplicationCounts =
    exports.getEmployerDashobardSwipeCounts =
    exports.fetchDashboardsJobByUserId =
    exports.fetchJobsByEmployerEmail =
    exports.fetchJobByUserId =
    exports.removeJob =
    exports.fetchAppliedJobs =
    exports.fetchSavedJobs =
    exports.fetchAllApplications =
    exports.fetchJobs =
    exports.fetchJobById =
    exports.applyForJob =
    exports.createJob =
        void 0;
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const models_1 = require('../models');
const moment_1 = tslib_1.__importDefault(require('moment'));
const types_1 = require('../../interfaces/types');
const methods_1 = require('../../methods');
const createJob = async (data) => {
    try {
        const job = await new models_1.Job(data);
        return job.save();
    } catch (error) {
        throw new Error(
            `Error Creating Job: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.createJob = createJob;
const applyForJob = async (data) => {
    try {
        // check if user has already same application available then update that instead of creating new each time
        const applicationAlreadyAvailable =
            await models_1.JobApplication.findOne({
                candidate_id:
                    data === null || data === void 0
                        ? void 0
                        : data.candidate_id,
                job_id: data === null || data === void 0 ? void 0 : data.job_id,
            });
        let application;
        if (applicationAlreadyAvailable) {
            // First, update the document and retrieve the ID of the updated document
            await models_1.JobApplication.findByIdAndUpdate(
                (applicationAlreadyAvailable === null ||
                applicationAlreadyAvailable === void 0
                    ? void 0
                    : applicationAlreadyAvailable._id) ||
                    (data === null || data === void 0 ? void 0 : data._id),
                {
                    status:
                        (data === null || data === void 0
                            ? void 0
                            : data.status) ||
                        types_1.JobApplicationStatus.APPLIED,
                },
                {
                    new: true,
                }
            );
            // Then, retrieve the updated document with population
            application = await models_1.JobApplication.findById(
                (applicationAlreadyAvailable === null ||
                applicationAlreadyAvailable === void 0
                    ? void 0
                    : applicationAlreadyAvailable._id) ||
                    (data === null || data === void 0 ? void 0 : data._id)
            );
        } else {
            // delete frontend id as the backend will generate it's own new id
            data === null || data === void 0 ? true : delete data._id;
            const jobSnapshot = await models_1.Job.findOne({
                _id: data === null || data === void 0 ? void 0 : data.job_id,
            });
            const payload = Object.assign(Object.assign({}, data), {
                job_snapshot: jobSnapshot,
            });
            // Step1 : Store new application
            const jobApplication = new models_1.JobApplication(payload);
            application = await jobApplication.save();
        }
        // Step2 : Add applicant email to job based on the status user is applying
        const { applicantEmail, status, job_id } = data;
        let updateField;
        // Determine which field to update based on application status
        if (status === types_1.JobApplicationStatus.APPLIED) {
            updateField = 'applicantEmails';
        } else if (status === types_1.JobApplicationStatus.BOOKMARKED) {
            updateField = 'savedJobEmails';
        } else if (status === types_1.JobApplicationStatus.REJECTED) {
            updateField = 'skippedJobEmails';
        }
        if (updateField) {
            await models_1.Job.findByIdAndUpdate(
                job_id,
                { $addToSet: { [updateField]: applicantEmail } }, // Add to specified field only if email is not already present
                { new: true, upsert: true } // Return updated document
            );
        }
        // Step3: Trigger chat initiation if the application is for an applied job
        if (status === types_1.JobApplicationStatus.APPLIED) {
            const job = await models_1.Job.findById(job_id).populate(
                'branch_id'
            );
            const applicant = await models_1.User.findById(
                data === null || data === void 0 ? void 0 : data.candidate_id
            );
            const chatData = {
                applicant: applicant,
                employer:
                    job === null || job === void 0 ? void 0 : job.branch_id,
                job: job,
                status,
            };
            // send message only if job is valid and it is linked with a employer
            if (job === null || job === void 0 ? void 0 : job.branch_id) {
                await (0, methods_1.sendJobApplicationToCandidateOnJobApply)(
                    chatData
                );
            }
        }
        return application;
    } catch (error) {
        throw new Error(
            `Error Applying for Job: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.applyForJob = applyForJob;
const fetchJobById = async (id) => {
    try {
        return await models_1.Job.findById(id);
    } catch (error) {
        throw new Error(
            `Error Fetching Job: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.fetchJobById = fetchJobById;
const fetchJobs = async (
    page = 1,
    limit = 10,
    startDate,
    endDate,
    search,
    includeJobApplications
) => {
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
        // if (search) {
        //     query.title = { $regex: search, $options: 'i' };
        // }
        if (search) {
            const regex = { $regex: search, $options: 'i' };
            query.$or = [
                { 'title.en': regex },
                { title: regex },
                { branch_name: regex },
            ];
        }
        const totalJobs = await models_1.Job.countDocuments(query); // Total number of matching jobs
        const totalPages = Math.ceil(totalJobs / limit); // Total pages
        let jobs;
        if (includeJobApplications === 'true') {
            jobs = await models_1.Job.aggregate([
                { $match: query },
                {
                    $lookup: {
                        from: 'job_applications',
                        localField: '_id',
                        foreignField: 'job_id',
                        as: 'jobApplications',
                    },
                },
                {
                    $addFields: {
                        jobApplications: {
                            $filter: {
                                input: '$jobApplications',
                                as: 'application',
                                cond: {
                                    $eq: [
                                        '$$application.status',
                                        types_1.JobApplicationStatus.APPLIED,
                                    ],
                                },
                            },
                        },
                    },
                },
                { $sort: { createdAt: -1 } },
                { $skip: (page - 1) * limit },
                { $limit: limit },
            ]);
        } else {
            jobs = await models_1.Job.find(query)
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit);
        }
        return { jobs, totalJobs, totalPages, currentPage: page };
    } catch (error) {
        throw new Error(`Error retrieving jobs: ${error.message}`);
    }
};
exports.fetchJobs = fetchJobs;
const fetchAllApplications = async (page = 1, limit = 10) => {
    try {
        const query = {};
        const totalApplications = await models_1.JobApplication.countDocuments(
            query
        );
        const totalPages = Math.ceil(totalApplications / limit);
        const applications = await models_1.JobApplication.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate({
                path: 'candidate_id',
                select: '_id name email',
                populate: {
                    path: 'program_id',
                    select: '_id name',
                },
            })
            .populate({
                path: 'job_id',
                select: '_id title branch_id city',
                populate: {
                    path: 'branch_id',
                    select: '_id name email',
                },
            });
        return {
            applications,
            totalApplications,
            totalPages,
            currentPage: page,
        };
    } catch (error) {
        throw new Error(`Error retrieving applications: ${error.message}`);
    }
};
exports.fetchAllApplications = fetchAllApplications;
const fetchSavedJobs = async (applicantId, page = 1, limit = 10) => {
    try {
        const query = {};
        query.candidate_id = { $eq: applicantId };
        query.status = { $eq: types_1.JobApplicationStatus.BOOKMARKED };
        const totalJobs = await models_1.JobApplication.countDocuments(query);
        const jobs = await models_1.JobApplication.find(query)
            .populate('candidate_id')
            .populate({
                path: 'job_id',
                populate: { path: 'branch_id' }, // Populate branch_id within job_id
            })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        return { jobs, totalJobs };
    } catch (error) {
        throw new Error(`Error retrieving jobs: ${error.message}`);
    }
};
exports.fetchSavedJobs = fetchSavedJobs;
const fetchAppliedJobs = async (applicantId, page = 1, limit = 10) => {
    try {
        const query = {};
        query.candidate_id = { $eq: applicantId };
        query.status = { $eq: types_1.JobApplicationStatus.APPLIED };
        const totalJobs = await models_1.JobApplication.countDocuments(query);
        const jobs = await models_1.JobApplication.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('candidate_id')
            .populate({
                path: 'job_id',
                populate: { path: 'branch_id' }, // Populate branch_id within job_id
            });
        return { jobs, totalJobs };
    } catch (error) {
        throw new Error(`Error retrieving jobs: ${error.message}`);
    }
};
exports.fetchAppliedJobs = fetchAppliedJobs;
const removeJob = async (id) => {
    try {
        const deletedJob = await models_1.Job.findByIdAndDelete(id);
        return deletedJob;
    } catch (error) {
        throw new Error(
            `Error Deleting Job: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.removeJob = removeJob;
const fetchJobByUserId = async (id, includeJobApplications) => {
    try {
        const branch = await models_1.Branch.findOne({
            userId: new mongoose_1.default.Types.ObjectId(id),
        });
        if (!branch) {
            return [];
        }
        const query = {
            branch_email:
                branch === null || branch === void 0 ? void 0 : branch.email,
        };
        let jobs;
        if (includeJobApplications || includeJobApplications === 'true') {
            jobs = await models_1.Job.aggregate([
                { $match: query },
                {
                    $lookup: {
                        from: 'job_applications',
                        localField: '_id',
                        foreignField: 'job_id',
                        as: 'jobApplications',
                    },
                },
                {
                    $addFields: {
                        jobApplications: {
                            $filter: {
                                input: '$jobApplications',
                                as: 'application',
                                cond: {
                                    $eq: [
                                        '$$application.status',
                                        types_1.JobApplicationStatus.APPLIED,
                                    ],
                                },
                            },
                        },
                    },
                },
                { $sort: { createdAt: -1 } },
            ]);
        } else {
            jobs = await models_1.Job.find({ branch_email: branch.email });
        }
        return jobs;
    } catch (error) {
        console.error('Error fetching jobs by user ID:', error);
        throw error;
    }
};
exports.fetchJobByUserId = fetchJobByUserId;
const fetchJobsByEmployerEmail = async (
    email,
    includeJobApplications,
    page,
    limit
) => {
    try {
        const query = { branch_email: email };
        let jobs;
        if (includeJobApplications === 'true') {
            jobs = await models_1.Job.aggregate([
                { $match: query },
                {
                    $lookup: {
                        from: 'job_applications',
                        localField: '_id',
                        foreignField: 'job_id',
                        as: 'jobApplications',
                    },
                },
                {
                    $addFields: {
                        jobApplications: {
                            $filter: {
                                input: '$jobApplications',
                                as: 'application',
                                cond: {
                                    $eq: [
                                        '$$application.status',
                                        types_1.JobApplicationStatus.APPLIED,
                                    ],
                                },
                            },
                        },
                    },
                },
                { $sort: { createdAt: -1 } },
                { $skip: (page - 1) * limit },
                { $limit: limit },
            ]);
        } else {
            jobs = await models_1.Job.find({ branch_email: email });
        }
        const totalJobs = await models_1.Job.countDocuments(query);
        const totalPages = Math.ceil(totalJobs / limit); // Total pages
        return { jobs, totalPages, currentPage: page };
    } catch (error) {
        throw new Error(
            `Error fetching Jobs: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.fetchJobsByEmployerEmail = fetchJobsByEmployerEmail;
const fetchDashboardsJobByUserId = async (id) => {
    try {
        const user = await models_1.User.findOne({
            _id: new mongoose_1.default.Types.ObjectId(id),
        });
        if (!user) {
            return [];
        }
        const query = {
            branch_email:
                user === null || user === void 0 ? void 0 : user.email,
        };
        let jobs = await models_1.Job.find(query, { _id: 1 });
        return jobs;
    } catch (error) {
        console.error('Error fetching jobs by user ID:', error);
        throw error;
    }
};
exports.fetchDashboardsJobByUserId = fetchDashboardsJobByUserId;
const getEmployerDashobardSwipeCounts = async (jobs) => {
    try {
        const jobIds =
            jobs === null || jobs === void 0
                ? void 0
                : jobs.map((item) =>
                      item === null || item === void 0 ? void 0 : item._id
                  );
        const count = await models_1.JobApplication.countDocuments({
            job_id: { $in: jobIds },
        });
        return count !== null && count !== void 0 ? count : 0;
    } catch (error) {
        console.error('error retriving swipe counts', error.message);
    }
};
exports.getEmployerDashobardSwipeCounts = getEmployerDashobardSwipeCounts;
const getEmployerDashobardApplicationCounts = async (jobIds) => {
    try {
        const count = await models_1.JobApplication.countDocuments({
            job_id: { $in: jobIds },
            status: types_1.JobApplicationStatus.APPLIED,
        });
        return count !== null && count !== void 0 ? count : 0;
    } catch (error) {
        console.error('error retriving swipe counts', error.message);
    }
};
exports.getEmployerDashobardApplicationCounts =
    getEmployerDashobardApplicationCounts;
const updateJob = async (id, data) => {
    try {
        const updatedDocument = await models_1.Job.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!updatedDocument) {
            throw new Error('Job not found');
        }
        return updatedDocument;
    } catch (error) {
        throw new Error(`Error updating Job: ${error.message}`);
    }
};
exports.updateJob = updateJob;
const fetchApplicationsById = async (id) => {
    try {
        return await models_1.Job.aggregate([
            { $match: { branch_id: id } },
            {
                $lookup: {
                    from: 'job_applications',
                    localField: '_id',
                    foreignField: 'job_id',
                    as: 'jobApplications',
                },
            },
            { $sort: { createdAt: -1 } },
        ]);
    } catch (error) {
        throw new Error(
            `Error Fetching JobApplications: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.fetchApplicationsById = fetchApplicationsById;
const updateApplicationById = async (applicationId, status) => {
    try {
        // Validate required fields
        if (!applicationId || !status) {
            throw new Error('Application ID and status are required.');
        }
        // Update the application status
        const updatedApplication =
            await models_1.JobApplication.findByIdAndUpdate(
                applicationId,
                { status }, // Only update the status field
                { new: true } // Return the updated document
            );
        if (!updatedApplication) {
            throw new Error('Job application not found.');
        }
        return updatedApplication;
    } catch (error) {
        throw new Error(
            `Error updating application status: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.updateApplicationById = updateApplicationById;
//# sourceMappingURL=db.jobs.js.map
