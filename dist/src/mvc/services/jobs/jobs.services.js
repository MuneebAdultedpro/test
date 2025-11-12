'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getAllApplications =
    exports.getByEmployerId =
    exports.getByEmployerEmail =
    exports.getApplicantAppliedJobs =
    exports.updateApplication =
    exports.getApplications =
    exports.applyJob =
    exports.getJobByUserIdService =
    exports.updateJobService =
    exports.postJob =
    exports.getAppliedJobs =
    exports.getSavedJobs =
    exports.deleteJob =
    exports.getJobs =
    exports.getJob =
        void 0;
const db_jobs_1 = require('../../database/db.jobs');
const scripts_1 = require('../../../scripts');
const db_user_1 = require('../../database/db.user');
const translateJobToMultiLanguages = async (job) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    const translatedJob = Object.assign(Object.assign({}, job), {
        job_description: {
            en:
                ((_a =
                    job === null || job === void 0
                        ? void 0
                        : job.job_description) === null || _a === void 0
                    ? void 0
                    : _a.en) ||
                (job === null || job === void 0 ? void 0 : job.job_description),
            es: await (0, scripts_1.translateJobDescription)(
                ((_b =
                    job === null || job === void 0
                        ? void 0
                        : job.job_description) === null || _b === void 0
                    ? void 0
                    : _b.en) ||
                    (job === null || job === void 0
                        ? void 0
                        : job.job_description),
                'spanish'
            ),
            tl: await (0, scripts_1.translateJobDescription)(
                ((_c =
                    job === null || job === void 0
                        ? void 0
                        : job.job_description) === null || _c === void 0
                    ? void 0
                    : _c.en) ||
                    (job === null || job === void 0
                        ? void 0
                        : job.job_description),
                'tagalog'
            ),
        },
        title: {
            en:
                ((_d = job === null || job === void 0 ? void 0 : job.title) ===
                    null || _d === void 0
                    ? void 0
                    : _d.en) ||
                (job === null || job === void 0 ? void 0 : job.title),
            es: await (0, scripts_1.translateJobDescription)(
                ((_e = job === null || job === void 0 ? void 0 : job.title) ===
                    null || _e === void 0
                    ? void 0
                    : _e.en) ||
                    (job === null || job === void 0 ? void 0 : job.title),
                'spanish'
            ),
            tl: await (0, scripts_1.translateJobDescription)(
                ((_f = job === null || job === void 0 ? void 0 : job.title) ===
                    null || _f === void 0
                    ? void 0
                    : _f.en) ||
                    (job === null || job === void 0 ? void 0 : job.title),
                'tagalog'
            ),
        },
        pay_description: {
            en:
                ((_g =
                    job === null || job === void 0
                        ? void 0
                        : job.pay_description) === null || _g === void 0
                    ? void 0
                    : _g.en) ||
                (job === null || job === void 0 ? void 0 : job.pay_description),
            es: await (0, scripts_1.translateJobDescription)(
                ((_h =
                    job === null || job === void 0
                        ? void 0
                        : job.pay_description) === null || _h === void 0
                    ? void 0
                    : _h.en) ||
                    (job === null || job === void 0
                        ? void 0
                        : job.pay_description),
                'spanish'
            ),
            tl: await (0, scripts_1.translateJobDescription)(
                ((_j =
                    job === null || job === void 0
                        ? void 0
                        : job.pay_description) === null || _j === void 0
                    ? void 0
                    : _j.en) ||
                    (job === null || job === void 0
                        ? void 0
                        : job.pay_description),
                'tagalog'
            ),
        },
        contact_bio: {
            en:
                ((_k =
                    job === null || job === void 0
                        ? void 0
                        : job.contact_bio) === null || _k === void 0
                    ? void 0
                    : _k.en) ||
                (job === null || job === void 0 ? void 0 : job.contact_bio),
            es: await (0, scripts_1.translateJobDescription)(
                ((_l =
                    job === null || job === void 0
                        ? void 0
                        : job.contact_bio) === null || _l === void 0
                    ? void 0
                    : _l.en) ||
                    (job === null || job === void 0 ? void 0 : job.contact_bio),
                'spanish'
            ),
            tl: await (0, scripts_1.translateJobDescription)(
                ((_m =
                    job === null || job === void 0
                        ? void 0
                        : job.contact_bio) === null || _m === void 0
                    ? void 0
                    : _m.en) ||
                    (job === null || job === void 0 ? void 0 : job.contact_bio),
                'tagalog'
            ),
        },
        branch_bio: {
            en:
                ((_o =
                    job === null || job === void 0
                        ? void 0
                        : job.branch_bio) === null || _o === void 0
                    ? void 0
                    : _o.en) ||
                (job === null || job === void 0 ? void 0 : job.branch_bio),
            es: await (0, scripts_1.translateJobDescription)(
                ((_p =
                    job === null || job === void 0
                        ? void 0
                        : job.branch_bio) === null || _p === void 0
                    ? void 0
                    : _p.en) ||
                    (job === null || job === void 0 ? void 0 : job.branch_bio),
                'spanish'
            ),
            tl: await (0, scripts_1.translateJobDescription)(
                ((_q =
                    job === null || job === void 0
                        ? void 0
                        : job.branch_bio) === null || _q === void 0
                    ? void 0
                    : _q.en) ||
                    (job === null || job === void 0 ? void 0 : job.branch_bio),
                'tagalog'
            ),
        },
    });
    return translatedJob;
};
const postJob = async (req) => {
    try {
        // const translatedJob = await translateJobToMultiLanguages(req?.body);
        const newJob = await (0, db_jobs_1.createJob)(
            req === null || req === void 0 ? void 0 : req.body
        );
        if (newJob) {
            return {
                job: newJob,
                message: 'New job created Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 403,
                message: 'Error Creating job',
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
exports.postJob = postJob;
const applyJob = async (req) => {
    var _a, _b;
    try {
        // @ts-ignore
        const userId =
            (_a = req === null || req === void 0 ? void 0 : req.user) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const studentInstitueId = await (0, db_user_1.findInstitudeIdByUserId)(
            userId
        );
        const pakInstituteId =
            (_b =
                process === null || process === void 0
                    ? void 0
                    : process.env) === null || _b === void 0
                ? void 0
                : _b.PAKISTAN_INSTITUE_ID;
        if (
            (studentInstitueId === null || studentInstitueId === void 0
                ? void 0
                : studentInstitueId.institueId) === pakInstituteId
        ) {
            return {
                message: 'Unable to apply to job',
                statusCode: 400,
                success: false,
            };
        }
        const newJobApplication = await (0, db_jobs_1.applyForJob)(
            req === null || req === void 0 ? void 0 : req.body
        );
        if (newJobApplication) {
            return {
                jobApplication: newJobApplication,
                message: 'New job application created Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 403,
                message: 'Error Creating job application',
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
exports.applyJob = applyJob;
const getJobs = async (req) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
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
                : _g.search;
        const status =
            (_h = req === null || req === void 0 ? void 0 : req.query) ===
                null || _h === void 0
                ? void 0
                : _h.status;
        const includeJobApplications =
            (_j = req === null || req === void 0 ? void 0 : req.query) ===
                null || _j === void 0
                ? void 0
                : _j.includeJobApplications;
        const { jobs, totalJobs, totalPages, currentPage } = await (0,
        db_jobs_1.fetchJobs)(
            page,
            limit,
            startDate,
            endDate,
            search,
            includeJobApplications
        );
        if (!(jobs === null || jobs === void 0 ? void 0 : jobs.length)) {
            return {
                success: true,
                statusCode: 200,
                message: 'No jobs Found',
                jobs: [],
                totalJobs: 0,
                totalPages: 0,
                currentPage: page,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'jobs retrieved successfully',
            jobs,
            totalJobs,
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
exports.getJobs = getJobs;
const getAllApplications = async (req) => {
    var _a, _b;
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
        const { applications, totalApplications, totalPages, currentPage } =
            await (0, db_jobs_1.fetchAllApplications)(page, limit);
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
                totalPages: 0,
                currentPage: page,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'applications retrieved successfully',
            applications,
            totalApplications,
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
exports.getAllApplications = getAllApplications;
const getSavedJobs = async (req) => {
    var _a, _b, _c;
    try {
        const applicantId =
            (_a = req === null || req === void 0 ? void 0 : req.user) ===
                null || _a === void 0
                ? void 0
                : _a.id;
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
        const { jobs, totalJobs } = await (0, db_jobs_1.fetchSavedJobs)(
            applicantId,
            page,
            limit
        );
        if (!(jobs === null || jobs === void 0 ? void 0 : jobs.length)) {
            return {
                success: true,
                statusCode: 200,
                message: 'No jobs Found',
                jobs: [],
                totalJobs: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Jobs retrieved successfully',
            jobs,
            totalJobs,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getSavedJobs = getSavedJobs;
const getAppliedJobs = async (req) => {
    var _a, _b, _c;
    try {
        const applicantId =
            (_a = req === null || req === void 0 ? void 0 : req.user) ===
                null || _a === void 0
                ? void 0
                : _a.id;
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
        const { jobs, totalJobs } = await (0, db_jobs_1.fetchAppliedJobs)(
            applicantId,
            page,
            limit
        );
        if (!(jobs === null || jobs === void 0 ? void 0 : jobs.length)) {
            return {
                success: true,
                statusCode: 200,
                message: 'No jobs Found',
                jobs: [],
                totalJobs: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Jobs retrieved successfully',
            jobs,
            totalJobs,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getAppliedJobs = getAppliedJobs;
const getApplicantAppliedJobs = async (req) => {
    var _a, _b, _c;
    try {
        const applicantId =
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
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10; // Pagination: number of records per page
        const { jobs, totalJobs } = await (0, db_jobs_1.fetchAppliedJobs)(
            applicantId,
            page,
            limit
        );
        if (!(jobs === null || jobs === void 0 ? void 0 : jobs.length)) {
            return {
                success: true,
                statusCode: 200,
                message: 'No jobs Found',
                jobs: [],
                totalJobs: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Jobs retrieved successfully',
            jobs,
            totalJobs,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getApplicantAppliedJobs = getApplicantAppliedJobs;
const getJob = async (req) => {
    var _a;
    try {
        const jobId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const job = await (0, db_jobs_1.fetchJobById)(jobId);
        if (!job) {
            return {
                success: true,
                statusCode: 200,
                message: 'No Job Found',
                job: {},
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Job retrieved successfully',
            job,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getJob = getJob;
const getJobByUserIdService = async (req) => {
    var _a, _b;
    try {
        const userId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const includeJobApplications =
            (_b = req === null || req === void 0 ? void 0 : req.query) ===
                null || _b === void 0
                ? void 0
                : _b.includeJobApplications;
        const jobs = await (0, db_jobs_1.fetchJobByUserId)(
            userId,
            includeJobApplications
        );
        if (!(jobs === null || jobs === void 0 ? void 0 : jobs.length)) {
            return {
                success: true,
                statusCode: 200,
                message: 'No jobs Found',
                jobs: [],
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Job retrieved successfully',
            jobs,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getJobByUserIdService = getJobByUserIdService;
const getByEmployerEmail = async (req) => {
    var _a, _b, _c, _d;
    try {
        const email =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.email;
        const includeJobApplications =
            (_b = req === null || req === void 0 ? void 0 : req.query) ===
                null || _b === void 0
                ? void 0
                : _b.includeJobApplications;
        const page =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.page
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_d = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _d === void 0
                    ? void 0
                    : _d.limit
            ) || 10; // Pagination: number of records per page
        const { jobs, totalPages, currentPage } = await (0,
        db_jobs_1.fetchJobsByEmployerEmail)(
            email,
            includeJobApplications,
            page,
            limit
        );
        if (!(jobs === null || jobs === void 0 ? void 0 : jobs.length)) {
            return {
                success: true,
                statusCode: 200,
                message: 'No jobs Found',
                jobs: [],
                totalPages: 0,
                currentPage: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Jobs retrieved successfully',
            jobs,
            totalPages: totalPages,
            currentPage: currentPage,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getByEmployerEmail = getByEmployerEmail;
const getByEmployerId = async (req) => {
    var _a, _b, _c, _d;
    try {
        const id =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const includeJobApplications =
            (_b = req === null || req === void 0 ? void 0 : req.query) ===
                null || _b === void 0
                ? void 0
                : _b.includeJobApplications;
        const page =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.page
            ) || 1; // Pagination: current page
        const limit =
            parseInt(
                (_d = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _d === void 0
                    ? void 0
                    : _d.limit
            ) || 10; // Pagination: number of records per page
        const { jobs, totalPages, currentPage } = await (0,
        db_jobs_1.fetchJobsByEmployerId)(
            id,
            includeJobApplications,
            page,
            limit
        );
        if (!(jobs === null || jobs === void 0 ? void 0 : jobs.length)) {
            return {
                success: true,
                statusCode: 200,
                message: 'No jobs Found',
                jobs: [],
                totalPages: 0,
                currentPage: 0,
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Jobs retrieved successfully',
            jobs,
            totalPages: totalPages,
            currentPage: currentPage,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getByEmployerId = getByEmployerId;
const updateJobService = async (req) => {
    var _a;
    try {
        const jobId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        if (!jobId) {
            return {
                success: false,
                statusCode: 404,
                message: 'Job id is required',
            };
        }
        // const translatedJob = await translateJobToMultiLanguages(req?.body);
        const updatedJob = await (0, db_jobs_1.updateJob)(
            jobId,
            req === null || req === void 0 ? void 0 : req.body
        );
        if (!updatedJob) {
            return {
                success: true,
                statusCode: 200,
                message: 'No Job Found',
                updatedJob: {},
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Job retrieved successfully',
            updatedJob,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.updateJobService = updateJobService;
const deleteJob = async (req) => {
    var _a;
    try {
        const jobId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        if (!jobId) {
            return {
                success: false,
                statusCode: 404,
                message: 'Job id is required',
            };
        }
        const job = await (0, db_jobs_1.removeJob)(jobId);
        if (!job) {
            return {
                success: true,
                statusCode: 200,
                message: 'No Job Found',
                job: {},
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Job deleted successfully',
            job,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.deleteJob = deleteJob;
const getApplications = async (req) => {
    var _a;
    try {
        const userId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const applications = await (0, db_jobs_1.fetchApplicationsById)(userId);
        if (!applications) {
            return {
                success: true,
                statusCode: 200,
                message: 'No applications Found',
                applications: {},
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Applications retrieved successfully',
            applications,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message, // Use error.message for a clearer message
        };
    }
};
exports.getApplications = getApplications;
const updateApplication = async (req) => {
    var _a, _b;
    try {
        const applicationId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const status =
            (_b = req === null || req === void 0 ? void 0 : req.body) ===
                null || _b === void 0
                ? void 0
                : _b.status; // Expecting the status field
        const application = await (0, db_jobs_1.updateApplicationById)(
            applicationId,
            status
        );
        if (!application) {
            return {
                success: true,
                statusCode: 200,
                message: 'No applications Found',
                application: {},
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Application updated successfully',
            application,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message,
        };
    }
};
exports.updateApplication = updateApplication;
//# sourceMappingURL=jobs.services.js.map
