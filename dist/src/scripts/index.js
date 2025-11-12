'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.findEmployersWithMaxBranchSize =
    exports.transformStudentEducationAndExperienceToNewFormate =
    exports.addNameToBranches =
    exports.findDuplicatInstituitons =
    exports.deleteInstitutesWithFewerUsers =
    exports.migrateConsortiumMembersToMongoDB =
    exports.convertConsortiomWithMembersXlsxToJson =
    exports.convertConsortiomXlsxToJson =
    exports.migrateConsortiomToMongoDB =
    exports.analyzeBranchMetrics =
    exports.getObjectSize =
    exports.findAndDeleteEmployersBranches =
    exports.getStudentsCreatedFromSpecificDate =
    exports.translateOldJobsInDatabase =
    exports.translateJobDescription =
    exports.migrateFireStorePartnersToMongodb =
    exports.migrateFireStoreLabourMarketeToMongodb =
    exports.migrateFireStoreAvatarsToMongodb =
    exports.migrateFireStoreAnnouncementsToMongodb =
    exports.migrateFireStoreTodosToMongodb =
    exports.migrateFireStoreProgramsToMongodb =
    exports.migrateFireStoreUsersToMongodb =
    exports.uploadEventToMongoDbFromJsonFile =
    exports.uploadUserApplicationToMongoDbFromJsonFile =
    exports.migrateFireStoreBranchToMongodb =
    exports.migrateFireStoreJobsToMongodb =
        void 0;
const tslib_1 = require('tslib');
const axios_1 = tslib_1.__importDefault(require('axios'));
const models_1 = require('../mvc/models');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const xlsx_1 = tslib_1.__importDefault(require('xlsx'));
const { ObjectId } = mongoose_1.default.Types;
const fs = require('fs');
const path = require('path');
// Helper to convert Firestore timestamps to ISO format
function convertToISO(timestamp) {
    var _a, _b;
    if (
        timestamp &&
        (timestamp === null || timestamp === void 0
            ? void 0
            : timestamp._seconds)
    ) {
        return (_b =
            (_a = new Date(
                (timestamp === null || timestamp === void 0
                    ? void 0
                    : timestamp._seconds) * 1000
            )) === null || _a === void 0
                ? void 0
                : _a.toISOString) === null || _b === void 0
            ? void 0
            : _b.call(_a);
    }
    return '';
}
const findProgramById = async (firebaseId) => {
    return await models_1.Program.findOne({ firebaseId }).select('_id');
};
const findProgramByName = async (name) => {
    return await models_1.Program.findOne({
        name: { $regex: name, $options: 'i' },
    }).select('_id');
};
const findInstituteById = async (firebaseId) => {
    return await models_1.Institute.findOne({ firebaseId }).select('_id');
};
const findInstituteByName = async (name) => {
    return await models_1.Institute.findOne({
        name: { $regex: name, $options: 'i' },
    }).select('_id');
};
// Transform firestroe jobs to mongodb jobs
const migrateFireStoreJobsToMongodb = async () => {
    try {
        // Read jobs from jobs.json
        const jobsFilePath = path.join(__dirname, '../../jobs.json');
        const jobsData = fs.readFileSync(jobsFilePath, 'utf8');
        const jobs = JSON.parse(jobsData);
        // Map over jobs to update dates and find branch ID
        const updatedJobs = await Promise.all(
            jobs.map(async (job, index) => {
                var _a;
                // Find the branch in MongoDB
                let branchFound;
                if (
                    job === null || job === void 0 ? void 0 : job.employerEmail
                ) {
                    branchFound = await models_1.Branch.findOne({
                        email:
                            job === null || job === void 0
                                ? void 0
                                : job.employerEmail,
                    });
                } else {
                    branchFound = await models_1.Branch.findOne({
                        firebaseId:
                            job === null || job === void 0
                                ? void 0
                                : job.employerId,
                    });
                }
                if (branchFound) {
                    const newJobFormate = {
                        firebaseId:
                            job === null || job === void 0 ? void 0 : job.id,
                        country:
                            job === null || job === void 0
                                ? void 0
                                : job.country,
                        rank_index:
                            job === null || job === void 0
                                ? void 0
                                : job.rankIndex,
                        zip_code:
                            job === null || job === void 0
                                ? void 0
                                : job.zipCode,
                        city:
                            job === null || job === void 0 ? void 0 : job.city,
                        branch_location:
                            typeof (job === null || job === void 0
                                ? void 0
                                : job.branchLocation) === 'string'
                                ? job === null || job === void 0
                                    ? void 0
                                    : job.branchLocation
                                : (_a =
                                      job === null || job === void 0
                                          ? void 0
                                          : job.branchLocation) === null ||
                                  _a === void 0
                                ? void 0
                                : _a.branchLocation,
                        search_keywords:
                            job === null || job === void 0
                                ? void 0
                                : job.searchKeywords,
                        job_description: {
                            en:
                                job === null || job === void 0
                                    ? void 0
                                    : job.description,
                        },
                        shift:
                            job === null || job === void 0 ? void 0 : job.shift,
                        branch_name:
                            job === null || job === void 0
                                ? void 0
                                : job.employerName,
                        branch_id:
                            branchFound === null || branchFound === void 0
                                ? void 0
                                : branchFound._id,
                        language:
                            job === null || job === void 0
                                ? void 0
                                : job.language,
                        program:
                            job === null || job === void 0
                                ? void 0
                                : job.program,
                        savedJobEmails:
                            job === null || job === void 0
                                ? void 0
                                : job.savedJobEmails,
                        applicantEmails:
                            job === null || job === void 0
                                ? void 0
                                : job.applicantEmails,
                        skippedJobEmails:
                            job === null || job === void 0
                                ? void 0
                                : job.skippedJobEmails,
                        branch_bio:
                            job === null || job === void 0
                                ? void 0
                                : job.employerBio,
                        title: {
                            en:
                                job === null || job === void 0
                                    ? void 0
                                    : job.title,
                        },
                        jobLink:
                            job === null || job === void 0
                                ? void 0
                                : job.jobLink,
                        no_of_positions:
                            job === null || job === void 0
                                ? void 0
                                : job.noOfPositions,
                        photo_url:
                            job === null || job === void 0
                                ? void 0
                                : job.photoUrl,
                        is_active:
                            job === null || job === void 0
                                ? void 0
                                : job.isActive,
                        payPeriod:
                            job === null || job === void 0
                                ? void 0
                                : job.payPeriod,
                        _geoloc:
                            job === null || job === void 0
                                ? void 0
                                : job._geoloc,
                        is_test:
                            job === null || job === void 0
                                ? void 0
                                : job.isTest,
                        address_line1:
                            job === null || job === void 0
                                ? void 0
                                : job.addressLine1,
                        address_line2:
                            job === null || job === void 0
                                ? void 0
                                : job.addressLine2,
                        contact_no:
                            job === null || job === void 0
                                ? void 0
                                : job.contactNumber,
                        hours:
                            job === null || job === void 0 ? void 0 : job.hours,
                        state:
                            job === null || job === void 0 ? void 0 : job.state,
                        contact_bio:
                            job === null || job === void 0
                                ? void 0
                                : job.contactBio,
                        contact_email:
                            job === null || job === void 0
                                ? void 0
                                : job.contactEmail,
                        contact_name:
                            job === null || job === void 0
                                ? void 0
                                : job.contactName,
                        is_remote:
                            job === null || job === void 0
                                ? void 0
                                : job.isRemote,
                        pay: job === null || job === void 0 ? void 0 : job.pay,
                        hours_description:
                            job === null || job === void 0
                                ? void 0
                                : job.hoursDescription,
                        branch_no:
                            job === null || job === void 0
                                ? void 0
                                : job.employerNumber,
                        shift_description:
                            job === null || job === void 0
                                ? void 0
                                : job.shiftDescription,
                        branch_email:
                            job === null || job === void 0
                                ? void 0
                                : job.employerEmail,
                        days:
                            job === null || job === void 0 ? void 0 : job.days,
                        days_description:
                            job === null || job === void 0 ? void 0 : job.days,
                        pay_description: {
                            en:
                                job === null || job === void 0
                                    ? void 0
                                    : job.payDescription,
                        },
                        expire_date:
                            (job === null || job === void 0
                                ? void 0
                                : job.expireDate) == undefined
                                ? undefined
                                : (job === null || job === void 0
                                      ? void 0
                                      : job.expire_date) == ''
                                ? ''
                                : convertToISO(
                                      job === null || job === void 0
                                          ? void 0
                                          : job.expireDate
                                  ),
                        date_posted: convertToISO(
                            job === null || job === void 0
                                ? void 0
                                : job.datePosted
                        ),
                        date_updated: convertToISO(
                            job === null || job === void 0
                                ? void 0
                                : job.dateUpdated
                        ),
                        date_created: convertToISO(
                            job === null || job === void 0
                                ? void 0
                                : job.dateCreated
                        ),
                        apply_date: convertToISO(
                            job === null || job === void 0
                                ? void 0
                                : job.applyDate
                        ),
                    };
                    // Insert the Programs into the MongoDB collection
                    await models_1.Job.create(newJobFormate);
                    return newJobFormate;
                }
            })
        );
    } catch (error) {
        console.error('Error updating jobs:', error);
    }
};
exports.migrateFireStoreJobsToMongodb = migrateFireStoreJobsToMongodb;
// Transform firestroe employer to mongodb branch
const migrateFireStoreBranchToMongodb = async () => {
    try {
        // Read jobs from jobs.json
        const usersFilePath = path.join(__dirname, '../../employers.json');
        const usersData = fs.readFileSync(usersFilePath, 'utf8');
        const users = JSON.parse(usersData);
        // Map over jobs to update dates and find branch ID
        const updatedUsers = await Promise.all(
            users.map(async (branch) => {
                var _a, _b;
                let foundUser;
                if (
                    branch === null || branch === void 0
                        ? void 0
                        : branch.userId
                ) {
                    foundUser = await models_1.User.findOne({
                        firebaseId:
                            branch === null || branch === void 0
                                ? void 0
                                : branch.userId,
                    });
                } else {
                    foundUser = await models_1.User.findOne({
                        email:
                            branch === null || branch === void 0
                                ? void 0
                                : branch.email,
                    });
                }
                let linkedInstitue;
                if (
                    (branch === null || branch === void 0
                        ? void 0
                        : branch.partnerId) ||
                    ((_a =
                        branch === null || branch === void 0
                            ? void 0
                            : branch.partner) === null || _a === void 0
                        ? void 0
                        : _a.id)
                ) {
                    linkedInstitue = await models_1.Institute.findOne({
                        firebaseId:
                            (branch === null || branch === void 0
                                ? void 0
                                : branch.partnerId) ||
                            ((_b =
                                branch === null || branch === void 0
                                    ? void 0
                                    : branch.partner) === null || _b === void 0
                                ? void 0
                                : _b.id),
                    });
                }
                const newBranchFormate = {
                    firebaseId:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.id,
                    firebaseUserId:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.userId,
                    userId:
                        foundUser === null || foundUser === void 0
                            ? void 0
                            : foundUser._id,
                    institute_id:
                        linkedInstitue === null || linkedInstitue === void 0
                            ? void 0
                            : linkedInstitue._id,
                    name:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.name,
                    address:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.address,
                    address_line1:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.addressLine1,
                    address_line2:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.addressLine2,
                    email:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.email,
                    bio:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.bio,
                    city:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.city,
                    country:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.country,
                    branch_location:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.branchLocation,
                    state:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.state,
                    photo_url:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.photoUrl,
                    zip_code:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.zipCode,
                    contact_email:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.contactEmail,
                    contact_name:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.contactName,
                    contact_bio:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.contactBio,
                    contact_number:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.contactNumber,
                    phone_no:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.contactNumber,
                    social_media_links:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.socialMediaLinks,
                    benefits_and_perks:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.benefitsAndPerks,
                    book_mark_students:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.bookmarkedStudents,
                    book_mark_user_applications:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.bookmarkedUserApplications,
                    comany_size:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.companySize,
                    culture_and_environment:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.cultureAndEnvironment,
                    culture_media:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.cultureMedia,
                    description:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.description,
                    is_head_quarter:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.isHeadquarter,
                    is_test:
                        typeof (branch === null || branch === void 0
                            ? void 0
                            : branch.isTest) == 'string'
                            ? false
                            : branch === null || branch === void 0
                            ? void 0
                            : branch.isTest,
                    media:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.media,
                    banner_image:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.bannerImage,
                    mission:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.mission,
                    reviewed_user:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.reviewedStudents,
                    reviewed_user_application:
                        branch === null || branch === void 0
                            ? void 0
                            : branch.reviewedUserApplications,
                    dateUpdated: convertToISO(
                        branch === null || branch === void 0
                            ? void 0
                            : branch.dateUpdated
                    ),
                    dateCreated: convertToISO(
                        branch === null || branch === void 0
                            ? void 0
                            : branch.dateCreated
                    ),
                    // requirments: branch?.name,
                };
                // Insert the Employer into the MongoDB collection
                await models_1.Branch.create(newBranchFormate);
                return newBranchFormate;
            })
        );
    } catch (error) {
        console.error('Error updating jobs:', error);
    }
};
exports.migrateFireStoreBranchToMongodb = migrateFireStoreBranchToMongodb;
// Transform firestroe UserApplications to mongodb UserApplications
const uploadUserApplicationToMongoDbFromJsonFile = async () => {
    var _a, _b;
    try {
        // Read the jobs from the JSON file
        const jobsFilePath = path.join(
            __dirname,
            '../../user-applications.json'
        );
        const userApplicationsData = fs.readFileSync(jobsFilePath, 'utf8');
        const userApplications = JSON.parse(userApplicationsData);
        let tempUserApplications = [];
        // Upload userApplications one by one
        for (const userApplication of userApplications) {
            // Convert dates to ISO format if necessary
            userApplication.dateCreated = userApplication.dateCreated
                ? new Date(userApplication.dateCreated._seconds * 1000)
                : null;
            userApplication.dateUpdated = userApplication.dateUpdated
                ? new Date(userApplication.dateUpdated._seconds * 1000)
                : null;
            // Find the Job in MongoDB
            const job = await models_1.Job.findOne({
                firebaseId:
                    (userApplication === null || userApplication === void 0
                        ? void 0
                        : userApplication.jobId) ||
                    ((_a =
                        userApplication === null || userApplication === void 0
                            ? void 0
                            : userApplication.job) === null || _a === void 0
                        ? void 0
                        : _a.id),
            });
            const applicant = await models_1.User.findOne({
                firebaseId:
                    (userApplication === null || userApplication === void 0
                        ? void 0
                        : userApplication.applicantId) ||
                    ((_b =
                        userApplication === null || userApplication === void 0
                            ? void 0
                            : userApplication.applicant) === null ||
                    _b === void 0
                        ? void 0
                        : _b.id),
            });
            const newJobFormate = {
                candidate_id:
                    applicant === null || applicant === void 0
                        ? void 0
                        : applicant._id,
                job_id: job === null || job === void 0 ? void 0 : job._id,
                firebaseId:
                    userApplication === null || userApplication === void 0
                        ? void 0
                        : userApplication.id,
                job_snapshot:
                    userApplication === null || userApplication === void 0
                        ? void 0
                        : userApplication.job,
                status:
                    userApplication === null || userApplication === void 0
                        ? void 0
                        : userApplication.status,
                is_test:
                    userApplication === null || userApplication === void 0
                        ? void 0
                        : userApplication.isTest,
            };
            // Insert the job into the MongoDB collection
            await models_1.JobApplication.create(newJobFormate);
        }
    } catch (error) {
        console.error('Error uploading user-applications:', error);
    }
};
exports.uploadUserApplicationToMongoDbFromJsonFile =
    uploadUserApplicationToMongoDbFromJsonFile;
// Transform firestroe Events to mongodb Evetns
// export const uploadEventToMongoDbFromJsonFile = async () => {
//     try {
//         // Read the events from the JSON file
//         const jobsFilePath = path.join(__dirname, '../../events.json');
//         const eventsData = fs.readFileSync(jobsFilePath, 'utf8');
//         const events = JSON.parse(eventsData);
//         // Upload events one by one
//         for (const event of events) {
//             // Convert dates to ISO format if necessary
//             event?.dateCreated = event.dateCreated
//                 ? new Date(event.dateCreated._seconds * 1000)
//                 : null;
//             event.dateUpdated = event.dateUpdated
//                 ? new Date(event.dateUpdated._seconds * 1000)
//                 : null;
//             event.eventFrom = event.eventFrom
//                 ? new Date(event.eventFrom._seconds * 1000)
//                 : null;
//             event.eventDate = event.eventDate
//                 ? new Date(event.eventDate._seconds * 1000)
//                 : null;
//             event.eventTo = event.eventTo
//                 ? new Date(event.eventTo._seconds * 1000)
//                 : null;
//             let organizer;
//             let organizerType;
//             if (
//                 event?.employerId &&
//                 event?.employerId !== '' &&
//                 event?.employerId !== undefined
//             ) {
//                 // event created by employer
//                 organizer = await Branch.findOne({
//                     firebaseId: event?.employerId,
//                 });
//                 organizerType = 'employer';
//             } else if (
//                 event?.partnerId &&
//                 event?.partnerId !== '' &&
//                 event?.partnerId !== undefined
//             ) {
//                 // event created by institution
//                 organizer = await Institute.findOne({
//                     firebaseId: event?.partnerId,
//                 });
//                 organizerType = 'institution';
//             }
//             const newEventFormate = {
//                 firebaseId: event?.id,
//                 name: event?.name,
//                 address_line1: event?.addressLine1 ?? '',
//                 address_line2: event?.addressLine2 ?? '',
//                 approved_by_admin: event?.approvedByAdmin ?? false,
//                 creater_email: event?.createrEmail ?? '',
//                 creater_name: event?.contactName
//                     ? event?.contactName
//                     : event?.hostName
//                     ? event?.hostName
//                     : '',
//                 creater_role: event?.createrRole ?? '',
//                 description: event?.description ?? '',
//                 requested_program: event?.requestedProgram ?? '',
//                 dress_code: event?.dressCode ?? '',
//                 expected_attendees: event?.expectedAttendees ?? '',
//                 setup_requirments: event?.setupRequirements ?? '',
//                 organized_by: {
//                     type: organizerType,
//                     ref_id: organizer?._id, // This will store the reference id of respective member employer, institution
//                 },
//                 type: event?.type ?? '',
//                 zipCode: event?.zipCode ?? '',
//                 av_equipment_needs: event?.AVEquipmentNeeds ?? '',
//                 rsvp: event?.RSVP ?? '',
//                 additional_comments: event?.additionalComments ?? '',
//                 agenda: event?.agenda ?? '',
//                 carousel_images: event?.carouselImages ?? '',
//                 catering_preferences: event?.cateringPreferences ?? '',
//                 emergency_contact_no: event?.emergencyContactPhone ?? '',
//                 note_from_institution: event?.noteFromInstitution ?? '', //is it note from note from organizer ?
//                 parking_arrangments: event?.parkingArrangements ?? '',
//                 purpose: event?.purpose ?? '',
//                 setup_requiremnets: event?.setupRequirements ?? '',
//                 status: event?.status ?? '',
//                 transportation_details: event?.transportationDetails ?? '',
//                 url: event?.url ?? '',
//                 state: event?.state ?? '',
//                 city: event?.city ?? '',
//                 isTest: event?.isTest ?? false,
//                 event_from: event?.eventFrom ?? null,
//                 event_to: event?.eventTo ?? null,
//                 eventDate: event?.eventDate ?? null,
//                 proposed_dates: event?.proposedDates?.length ?? [],
//                 prefered_location_in_school:
//                   event?.preferredLocationInSchool ?? '',
//             };
//             // Insert the job into the MongoDB collection
//             // await Event.create(newEventFormate);
//         }
//         console.log('All Events uploaded successfully');
//     } catch (error) {
//         console.error('Error uploading Events:', error);
//     }
// };
const uploadEventToMongoDbFromJsonFile = async () => {
    var _a,
        _b,
        _c,
        _d,
        _e,
        _f,
        _g,
        _h,
        _j,
        _k,
        _l,
        _m,
        _o,
        _p,
        _q,
        _r,
        _s,
        _t,
        _u,
        _v,
        _w,
        _x,
        _y,
        _z,
        _0,
        _1,
        _2,
        _3,
        _4,
        _5,
        _6,
        _7,
        _8,
        _9,
        _10,
        _11,
        _12,
        _13,
        _14,
        _15,
        _16,
        _17;
    try {
        const jobsFilePath = path.join(__dirname, '../../events.json');
        const eventsData = fs.readFileSync(jobsFilePath, 'utf8');
        const events = JSON.parse(eventsData);
        for (const event of events) {
            // Convert date fields to ISO format
            event.dateCreated = (
                (_a =
                    event === null || event === void 0
                        ? void 0
                        : event.dateCreated) === null || _a === void 0
                    ? void 0
                    : _a._seconds
            )
                ? new Date(event.dateCreated._seconds * 1000)
                : null;
            event.dateUpdated = (
                (_b =
                    event === null || event === void 0
                        ? void 0
                        : event.dateUpdated) === null || _b === void 0
                    ? void 0
                    : _b._seconds
            )
                ? new Date(event.dateUpdated._seconds * 1000)
                : null;
            event.eventFrom = (
                (_c =
                    event === null || event === void 0
                        ? void 0
                        : event.eventFrom) === null || _c === void 0
                    ? void 0
                    : _c._seconds
            )
                ? new Date(event.eventFrom._seconds * 1000)
                : null;
            event.eventDate = (
                (_d =
                    event === null || event === void 0
                        ? void 0
                        : event.eventDate) === null || _d === void 0
                    ? void 0
                    : _d._seconds
            )
                ? new Date(event.eventDate._seconds * 1000)
                : null;
            event.eventTo = (
                (_e =
                    event === null || event === void 0
                        ? void 0
                        : event.eventTo) === null || _e === void 0
                    ? void 0
                    : _e._seconds
            )
                ? new Date(event.eventTo._seconds * 1000)
                : null;
            let organizer;
            let organizerType;
            // console.log('i to test', event?.employerId)
            if (
                (event === null || event === void 0
                    ? void 0
                    : event.createrRole) &&
                (event === null || event === void 0
                    ? void 0
                    : event.createrEmail)
            ) {
                organizer = await models_1.User.findOne({
                    //need to add the userid not the branchid
                    email:
                        event === null || event === void 0
                            ? void 0
                            : event.createrEmail,
                });
                if (
                    (event === null || event === void 0
                        ? void 0
                        : event.createrRole) == 'Admin' ||
                    (event === null || event === void 0
                        ? void 0
                        : event.createrRole) == 'SuperAdmin' ||
                    (event === null || event === void 0
                        ? void 0
                        : event.createrRole) == 'Employer'
                ) {
                    organizerType = 'branch';
                } else {
                    organizerType = 'institution';
                }
            }
            const requestedPartner = await models_1.Institute.findOne({
                firebaseId:
                    (_f =
                        event === null || event === void 0
                            ? void 0
                            : event.requestedPartner) === null || _f === void 0
                        ? void 0
                        : _f.id,
            });
            // console.log('brother here ', event?.employerId, event?.partnerId)
            // return
            // Prepare the event data for MongoDB
            const newEventFormate = {
                firebaseId:
                    event === null || event === void 0 ? void 0 : event.id,
                title:
                    (_g =
                        event === null || event === void 0
                            ? void 0
                            : event.title) !== null && _g !== void 0
                        ? _g
                        : '',
                address_line1:
                    (_h =
                        event === null || event === void 0
                            ? void 0
                            : event.addressLine1) !== null && _h !== void 0
                        ? _h
                        : '',
                address_line2:
                    (_j =
                        event === null || event === void 0
                            ? void 0
                            : event.addressLine2) !== null && _j !== void 0
                        ? _j
                        : '',
                approved_by_admin:
                    (_k =
                        event === null || event === void 0
                            ? void 0
                            : event.approvedByAdmin) !== null && _k !== void 0
                        ? _k
                        : false,
                creater_email:
                    (_l =
                        event === null || event === void 0
                            ? void 0
                            : event.createrEmail) !== null && _l !== void 0
                        ? _l
                        : '',
                creater_name: (
                    event === null || event === void 0
                        ? void 0
                        : event.contactName
                )
                    ? event === null || event === void 0
                        ? void 0
                        : event.contactName
                    : (
                          event === null || event === void 0
                              ? void 0
                              : event.hostName
                      )
                    ? event === null || event === void 0
                        ? void 0
                        : event.hostName
                    : '',
                creater_role:
                    (_m =
                        event === null || event === void 0
                            ? void 0
                            : event.createrRole) !== null && _m !== void 0
                        ? _m
                        : '',
                description:
                    (_o =
                        event === null || event === void 0
                            ? void 0
                            : event.description) !== null && _o !== void 0
                        ? _o
                        : '',
                requested_program:
                    (_p =
                        event === null || event === void 0
                            ? void 0
                            : event.requestedProgram) !== null && _p !== void 0
                        ? _p
                        : '',
                requested_partner:
                    (requestedPartner === null || requestedPartner === void 0
                        ? void 0
                        : requestedPartner.id) || null,
                dress_code:
                    (_q =
                        event === null || event === void 0
                            ? void 0
                            : event.dressCode) !== null && _q !== void 0
                        ? _q
                        : '',
                expected_attendees:
                    (_r =
                        event === null || event === void 0
                            ? void 0
                            : event.expectedAttendees) !== null && _r !== void 0
                        ? _r
                        : '',
                setup_requirments:
                    (_s =
                        event === null || event === void 0
                            ? void 0
                            : event.setupRequirements) !== null && _s !== void 0
                        ? _s
                        : '',
                organized_by: {
                    type: organizerType,
                    ref_id:
                        organizer === null || organizer === void 0
                            ? void 0
                            : organizer._id, // This will store the reference id of respective member employer, institution
                },
                type:
                    (_t =
                        event === null || event === void 0
                            ? void 0
                            : event.type) !== null && _t !== void 0
                        ? _t
                        : '',
                zipCode:
                    (_u =
                        event === null || event === void 0
                            ? void 0
                            : event.zipCode) !== null && _u !== void 0
                        ? _u
                        : '',
                av_equipment_needs:
                    (_v =
                        event === null || event === void 0
                            ? void 0
                            : event.AVEquipmentNeeds) !== null && _v !== void 0
                        ? _v
                        : '',
                rsvp:
                    (_w =
                        event === null || event === void 0
                            ? void 0
                            : event.RSVP) !== null && _w !== void 0
                        ? _w
                        : '',
                additional_comments:
                    (_x =
                        event === null || event === void 0
                            ? void 0
                            : event.additionalComments) !== null &&
                    _x !== void 0
                        ? _x
                        : '',
                agenda:
                    (_y =
                        event === null || event === void 0
                            ? void 0
                            : event.agenda) !== null && _y !== void 0
                        ? _y
                        : '',
                carousel_images:
                    (_z =
                        event === null || event === void 0
                            ? void 0
                            : event.carouselImages) !== null && _z !== void 0
                        ? _z
                        : '',
                catering_preferences:
                    (_0 =
                        event === null || event === void 0
                            ? void 0
                            : event.cateringPreferences) !== null &&
                    _0 !== void 0
                        ? _0
                        : '',
                emergency_contact_no:
                    (_1 =
                        event === null || event === void 0
                            ? void 0
                            : event.emergencyContactPhone) !== null &&
                    _1 !== void 0
                        ? _1
                        : '',
                note_from_institution:
                    (_2 =
                        event === null || event === void 0
                            ? void 0
                            : event.noteFromInstitution) !== null &&
                    _2 !== void 0
                        ? _2
                        : '',
                parking_arrangments:
                    (_3 =
                        event === null || event === void 0
                            ? void 0
                            : event.parkingArrangements) !== null &&
                    _3 !== void 0
                        ? _3
                        : '',
                purpose:
                    (_4 =
                        event === null || event === void 0
                            ? void 0
                            : event.purpose) !== null && _4 !== void 0
                        ? _4
                        : '',
                setup_requiremnets:
                    (_5 =
                        event === null || event === void 0
                            ? void 0
                            : event.setupRequirements) !== null && _5 !== void 0
                        ? _5
                        : '',
                status:
                    (_6 =
                        event === null || event === void 0
                            ? void 0
                            : event.status) !== null && _6 !== void 0
                        ? _6
                        : '',
                contact_email:
                    (_7 =
                        event === null || event === void 0
                            ? void 0
                            : event.contactEmail) !== null && _7 !== void 0
                        ? _7
                        : '',
                transportation_details:
                    (_8 =
                        event === null || event === void 0
                            ? void 0
                            : event.transportationDetails) !== null &&
                    _8 !== void 0
                        ? _8
                        : '',
                url:
                    (_9 =
                        event === null || event === void 0
                            ? void 0
                            : event.url) !== null && _9 !== void 0
                        ? _9
                        : '',
                state:
                    (_10 =
                        event === null || event === void 0
                            ? void 0
                            : event.state) !== null && _10 !== void 0
                        ? _10
                        : '',
                city:
                    (_11 =
                        event === null || event === void 0
                            ? void 0
                            : event.city) !== null && _11 !== void 0
                        ? _11
                        : '',
                isTest:
                    event === null || event === void 0 ? void 0 : event.isTest,
                event_from:
                    (_12 =
                        event === null || event === void 0
                            ? void 0
                            : event.eventFrom) !== null && _12 !== void 0
                        ? _12
                        : null,
                event_to:
                    (_13 =
                        event === null || event === void 0
                            ? void 0
                            : event.eventTo) !== null && _13 !== void 0
                        ? _13
                        : null,
                event_date:
                    (_14 =
                        event === null || event === void 0
                            ? void 0
                            : event.eventDate) !== null && _14 !== void 0
                        ? _14
                        : null,
                proposed_dates:
                    (_16 =
                        (_15 =
                            event === null || event === void 0
                                ? void 0
                                : event.proposedDates) === null ||
                        _15 === void 0
                            ? void 0
                            : _15.length) !== null && _16 !== void 0
                        ? _16
                        : [],
                prefered_location_in_school:
                    (_17 =
                        event === null || event === void 0
                            ? void 0
                            : event.preferredLocationInSchool) !== null &&
                    _17 !== void 0
                        ? _17
                        : '',
            };
            // Upload event and get the created event ID
            const createdEvent = await models_1.Event.create(newEventFormate);
            // console.log('event created in here', createdEvent?._id);
            // Handle participants
            // handle all participents and add them to the eventRegisteration
            if (
                (event === null || event === void 0
                    ? void 0
                    : event.eventParticipants) &&
                Array.isArray(
                    event === null || event === void 0
                        ? void 0
                        : event.eventParticipants
                ) &&
                (event === null || event === void 0
                    ? void 0
                    : event.eventParticipants.length) > 0
            ) {
                for (const participant of event === null || event === void 0
                    ? void 0
                    : event.eventParticipants) {
                    let user;
                    if (
                        participant === null || participant === void 0
                            ? void 0
                            : participant.id
                    ) {
                        user = await models_1.User.findOne({
                            firebaseId: participant.id,
                        });
                    } else if (
                        participant === null || participant === void 0
                            ? void 0
                            : participant.email
                    ) {
                        user = await models_1.User.findOne({
                            email:
                                participant === null || participant === void 0
                                    ? void 0
                                    : participant.email,
                        });
                    }
                    if (user) {
                        let eventRegistration = {
                            event_id:
                                createdEvent === null || createdEvent === void 0
                                    ? void 0
                                    : createdEvent._id,
                            candidate_id: null,
                            institute_id: null,
                            branch_id: null,
                        };
                        // Assign based on the role
                        if (
                            user.role.includes('Student') ||
                            user.role.includes('JobSeeker')
                        ) {
                            eventRegistration.candidate_id = user._id;
                        } else if (user.role.includes('Employer')) {
                            eventRegistration.branch_id = user._id;
                        } else if (
                            ['Admin', 'Counsellor', 'Teacher'].some((role) =>
                                user.role.includes(role)
                            )
                        ) {
                            eventRegistration.institute_id = user._id;
                        }
                        // Save the event registration
                        await models_1.EventRegistration.create(
                            eventRegistration
                        );
                    }
                }
            }
            // handle all employers and add them to the eventRegisteration
            if (
                (event === null || event === void 0
                    ? void 0
                    : event.employerIds) &&
                Array.isArray(
                    event === null || event === void 0
                        ? void 0
                        : event.employerIds
                ) &&
                (event === null || event === void 0
                    ? void 0
                    : event.employerIds.length) > 0
            ) {
                for (const employerId of event === null || event === void 0
                    ? void 0
                    : event.employerIds) {
                    const branch = await models_1.Branch.findOne({
                        firebaseId: employerId,
                    });
                    if (branch) {
                        let eventRegistration = {
                            event_id:
                                createdEvent === null || createdEvent === void 0
                                    ? void 0
                                    : createdEvent._id,
                            candidate_id: null,
                            institute_id: null,
                            branch_id: branch._id,
                        };
                        // Save the event registration
                        await models_1.EventRegistration.create(
                            eventRegistration
                        );
                    }
                }
            }
        }
        console.log('All events and participants uploaded successfully');
    } catch (error) {
        console.error('Error uploading events:', error);
    }
};
exports.uploadEventToMongoDbFromJsonFile = uploadEventToMongoDbFromJsonFile;
const createNewUserInMongoDb = async (user) => {
    var _a, _b, _c, _d, _e;
    try {
        const fcmTokensfilePath = path.join(__dirname, '../../fcmToken.json');
        const fcmTokensData = fs.readFileSync(fcmTokensfilePath, 'utf8');
        const fcmTokens = JSON.parse(fcmTokensData);
        let programId;
        let instituteId;
        if (
            typeof (user === null || user === void 0
                ? void 0
                : user.program) === 'object' &&
            ((_a = user === null || user === void 0 ? void 0 : user.program) ===
                null || _a === void 0
                ? void 0
                : _a.id)
        ) {
            programId = await findProgramById(
                (_b =
                    user === null || user === void 0
                        ? void 0
                        : user.program) === null || _b === void 0
                    ? void 0
                    : _b.id
            );
        } else if (typeof user.program === 'string') {
            programId = await findProgramByName(
                user === null || user === void 0 ? void 0 : user.program
            );
        }
        if (
            typeof (user === null || user === void 0 ? void 0 : user.school) ===
                'object' &&
            ((_c = user === null || user === void 0 ? void 0 : user.school) ===
                null || _c === void 0
                ? void 0
                : _c.id)
        ) {
            instituteId = await findInstituteById(
                (_d =
                    user === null || user === void 0 ? void 0 : user.school) ===
                    null || _d === void 0
                    ? void 0
                    : _d.id
            );
        } else if (typeof user.school === 'string') {
            instituteId = await findInstituteByName(
                user === null || user === void 0 ? void 0 : user.school
            );
        }
        const fcmTokenForUser =
            (_e =
                fcmTokens === null || fcmTokens === void 0
                    ? void 0
                    : fcmTokens.find(
                          (item) =>
                              (item === null || item === void 0
                                  ? void 0
                                  : item.userId) ===
                              (user === null || user === void 0
                                  ? void 0
                                  : user.id)
                      )) === null || _e === void 0
                ? void 0
                : _e.fcmToken;
        const updatedUser = {
            firebaseId: user === null || user === void 0 ? void 0 : user.id,
            name: user === null || user === void 0 ? void 0 : user.name,
            address: user === null || user === void 0 ? void 0 : user.address,
            address_line1:
                user === null || user === void 0 ? void 0 : user.addressLine1,
            address_line2:
                user === null || user === void 0 ? void 0 : user.addressLine2,
            email: user === null || user === void 0 ? void 0 : user.email,
            tag_line: user === null || user === void 0 ? void 0 : user.tagLine,
            program_id: programId,
            institute_id:
                instituteId !== null && instituteId !== void 0
                    ? instituteId
                    : user === null || user === void 0
                    ? void 0
                    : user.institute_id,
            bio: user === null || user === void 0 ? void 0 : user.bio,
            phone_no: user === null || user === void 0 ? void 0 : user.phoneNo,
            photo_url:
                user === null || user === void 0 ? void 0 : user.photoUrl,
            is_legal_terms_accepted:
                user === null || user === void 0
                    ? void 0
                    : user.isLegalTermsAccepted,
            is_test:
                typeof (user === null || user === void 0
                    ? void 0
                    : user.isTest) == 'string'
                    ? false
                    : user === null || user === void 0
                    ? void 0
                    : user.isTest,
            approved_by_admin:
                user === null || user === void 0
                    ? void 0
                    : user.approvedByAdmin,
            gender: user === null || user === void 0 ? void 0 : user.gender,
            role: user === null || user === void 0 ? void 0 : user.role,
            // employerNotes: user?.employerNotes,
            fcm_token: fcmTokenForUser,
            aiProfile:
                user === null || user === void 0 ? void 0 : user.aiProfile,
            giftCardChoice:
                user === null || user === void 0 ? void 0 : user.giftCardChoice,
            pdfUrl: user === null || user === void 0 ? void 0 : user.pdfUrl,
            last_activity: convertToISO(
                user === null || user === void 0 ? void 0 : user.lastActivity
            ),
            dateUpdated: convertToISO(
                user === null || user === void 0 ? void 0 : user.dateUpdated
            ),
            dateCreated: convertToISO(
                user === null || user === void 0 ? void 0 : user.dateCreated
            ),
        };
        const userCreated = await models_1.User.create(updatedUser);
        return userCreated;
    } catch (error) {
        console.log('error at the time of user creation', error);
    }
};
const migrateFireStoreUsersToMongodb = async () => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    try {
        const userfilePath = path.join(__dirname, '../../users.json');
        const userData = fs.readFileSync(userfilePath, 'utf8');
        const users = JSON.parse(userData);
        for (let user of users) {
            if (
                ((_a =
                    user === null || user === void 0 ? void 0 : user.role) ===
                    null || _a === void 0
                    ? void 0
                    : _a.includes('Admin')) ||
                ((_b =
                    user === null || user === void 0 ? void 0 : user.role) ===
                    null || _b === void 0
                    ? void 0
                    : _b.includes('Counsellor')) ||
                ((_c =
                    user === null || user === void 0 ? void 0 : user.role) ===
                    null || _c === void 0
                    ? void 0
                    : _c.includes('Teacher'))
            ) {
                const partnerId =
                    user === null || user === void 0 ? void 0 : user.partnerId;
                const foundPartner = await models_1.Institute.findOne({
                    firebaseId: partnerId,
                });
                if (
                    foundPartner === null || foundPartner === void 0
                        ? void 0
                        : foundPartner._id
                ) {
                    user.institute_id =
                        foundPartner === null || foundPartner === void 0
                            ? void 0
                            : foundPartner._id;
                }
                await createNewUserInMongoDb(user);
            } else if (
                (_d = user === null || user === void 0 ? void 0 : user.role) ===
                    null || _d === void 0
                    ? void 0
                    : _d.includes('Employer')
            ) {
                let foundedPartner;
                const userId =
                    user === null || user === void 0 ? void 0 : user.id;
                if (
                    (_e =
                        user === null || user === void 0
                            ? void 0
                            : user.partner) === null || _e === void 0
                        ? void 0
                        : _e.id
                ) {
                    foundedPartner = await models_1.Institute.findOne({
                        firebaseId:
                            (_f =
                                user === null || user === void 0
                                    ? void 0
                                    : user.partner) === null || _f === void 0
                                ? void 0
                                : _f.id,
                    });
                    user.institute_id =
                        (_g =
                            foundedPartner === null || foundedPartner === void 0
                                ? void 0
                                : foundedPartner._id) !== null && _g !== void 0
                            ? _g
                            : null;
                    console.log(
                        'user in here',
                        user,
                        ' ===',
                        foundedPartner,
                        (_h =
                            user === null || user === void 0
                                ? void 0
                                : user.partner) === null || _h === void 0
                            ? void 0
                            : _h.id
                    );
                }
                let foundBranch = await models_1.Branch.findOne({
                    firebaseUserId: userId,
                });
                if (
                    foundBranch === null || foundBranch === void 0
                        ? void 0
                        : foundBranch._id
                ) {
                    const newUserCreated = await createNewUserInMongoDb(user);
                    // foundEmployer.userId = newUserCreated?._id;
                    // now updated the branch
                    await models_1.Branch.updateOne(
                        {
                            _id:
                                foundBranch === null || foundBranch === void 0
                                    ? void 0
                                    : foundBranch._id,
                        },
                        {
                            $set: {
                                userId:
                                    newUserCreated === null ||
                                    newUserCreated === void 0
                                        ? void 0
                                        : newUserCreated._id,
                            },
                        },
                        { upsert: true }
                    );
                } else {
                    const newUserCreated = await createNewUserInMongoDb(user);
                }
            } else {
                const partnerId =
                    user === null || user === void 0 ? void 0 : user.partnerId;
                const foundPartner = await models_1.Institute.findOne({
                    firebaseId: partnerId,
                });
                if (
                    foundPartner === null || foundPartner === void 0
                        ? void 0
                        : foundPartner._id
                ) {
                    user.institute_id =
                        foundPartner === null || foundPartner === void 0
                            ? void 0
                            : foundPartner._id;
                }
                await createNewUserInMongoDb(user);
            }
        }
    } catch (error) {
        console.error('Error processing users:', error);
    }
};
exports.migrateFireStoreUsersToMongodb = migrateFireStoreUsersToMongodb;
// Transform firestroe programs to mongodb programs
const migrateFireStoreProgramsToMongodb = async () => {
    try {
        // Read jobs from jobs.json
        const programsFilePath = path.join(__dirname, '../../programs.json');
        const programsData = fs.readFileSync(programsFilePath, 'utf8');
        const programs = JSON.parse(programsData);
        // Map over jobs to update dates and find branch ID
        const updatedPrograms = await Promise.all(
            programs.map(async (program) => {
                // Convert dates to ISO format
                const newProgramsFormate = {
                    firebaseId:
                        program === null || program === void 0
                            ? void 0
                            : program.id,
                    name:
                        program === null || program === void 0
                            ? void 0
                            : program.name,
                    approved:
                        program === null || program === void 0
                            ? void 0
                            : program.approved,
                    question_type:
                        program === null || program === void 0
                            ? void 0
                            : program.questionType,
                };
                // Insert the Programs into the MongoDB collection
                await models_1.Program.create(newProgramsFormate);
                return newProgramsFormate;
            })
        );
    } catch (error) {
        console.error('Error updating jobs:', error);
    }
};
exports.migrateFireStoreProgramsToMongodb = migrateFireStoreProgramsToMongodb;
// Transform firestroe programs to mongodb programs
const migrateFireStoreTodosToMongodb = async () => {
    try {
        // Read jobs from jobs.json
        const todosFilePath = path.join(__dirname, '../../todos.json');
        const todosData = fs.readFileSync(todosFilePath, 'utf8');
        const todos = JSON.parse(todosData);
        // Map over jobs to update dates and find branch ID
        const updatedTodos = await Promise.all(
            todos.map(async (todo) => {
                const foundedUser = await models_1.User.findOne({
                    firebaseId:
                        todo === null || todo === void 0 ? void 0 : todo.userId,
                });
                const foundedPendingUser = await models_1.User.findOne({
                    firebaseId:
                        todo === null || todo === void 0
                            ? void 0
                            : todo.pendingUserId,
                });
                const foundedInstitute = await models_1.Institute.findOne({
                    firebaseId:
                        todo === null || todo === void 0
                            ? void 0
                            : todo.partnerId,
                });
                const newTodosFormate = {
                    firebaseId:
                        todo === null || todo === void 0 ? void 0 : todo.id,
                    completed:
                        todo === null || todo === void 0
                            ? void 0
                            : todo.completed,
                    description:
                        todo === null || todo === void 0
                            ? void 0
                            : todo.description,
                    dueDateTime: convertToISO(
                        todo === null || todo === void 0
                            ? void 0
                            : todo.dueDateTime
                    ),
                    isTest:
                        todo === null || todo === void 0 ? void 0 : todo.isTest,
                    title:
                        todo === null || todo === void 0 ? void 0 : todo.title,
                    type: todo === null || todo === void 0 ? void 0 : todo.type,
                    userId:
                        foundedUser === null || foundedUser === void 0
                            ? void 0
                            : foundedUser._id,
                    pendingUserId:
                        foundedPendingUser === null ||
                        foundedPendingUser === void 0
                            ? void 0
                            : foundedPendingUser._id,
                    institute_id:
                        foundedInstitute === null || foundedInstitute === void 0
                            ? void 0
                            : foundedInstitute._id,
                };
                // Insert the Programs into the MongoDB collection
                await models_1.Todo.create(newTodosFormate);
                return newTodosFormate;
            })
        );
    } catch (error) {
        console.error('Error updating todos:', error);
    }
};
exports.migrateFireStoreTodosToMongodb = migrateFireStoreTodosToMongodb;
// Transform Firestore announcements to MongoDB announcements
const migrateFireStoreAnnouncementsToMongodb = async () => {
    var _a;
    try {
        // Read announcements from announcements.json
        const announcementsFilePath = path.join(
            __dirname,
            '../../board-messages.json'
        );
        const announcementsData = fs.readFileSync(
            announcementsFilePath,
            'utf8'
        );
        const announcements = JSON.parse(announcementsData);
        // Map over announcements to update dates and find institute ID
        const updatedAnnouncements = await Promise.all(
            (_a =
                announcements === null || announcements === void 0
                    ? void 0
                    : announcements.map) === null || _a === void 0
                ? void 0
                : _a.call(announcements, async (announcement) => {
                      const foundedInstitute = await models_1.Institute.findOne(
                          {
                              firebaseId:
                                  announcement === null ||
                                  announcement === void 0
                                      ? void 0
                                      : announcement.partnerId,
                          }
                      );
                      const mongoStudentIds = [];
                      for (const toId of announcement === null ||
                      announcement === void 0
                          ? void 0
                          : announcement.toIds) {
                          const student = await models_1.User.findOne({
                              firebaseId: toId,
                          });
                          mongoStudentIds.push(
                              student === null || student === void 0
                                  ? void 0
                                  : student._id
                          );
                      }
                      const newAnnouncementFormat = {
                          firebaseId:
                              announcement === null || announcement === void 0
                                  ? void 0
                                  : announcement.id,
                          isTest:
                              (announcement === null || announcement === void 0
                                  ? void 0
                                  : announcement.isTest) || false,
                          description:
                              announcement === null || announcement === void 0
                                  ? void 0
                                  : announcement.description,
                          to:
                              announcement === null || announcement === void 0
                                  ? void 0
                                  : announcement.to,
                          toIds: mongoStudentIds || [],
                          title:
                              announcement === null || announcement === void 0
                                  ? void 0
                                  : announcement.title,
                          type:
                              announcement === null || announcement === void 0
                                  ? void 0
                                  : announcement.type,
                          toEmails:
                              (announcement === null || announcement === void 0
                                  ? void 0
                                  : announcement.toEmails) || [],
                          institute_id:
                              foundedInstitute === null ||
                              foundedInstitute === void 0
                                  ? void 0
                                  : foundedInstitute._id,
                      };
                      // Insert the announcement into the MongoDB collection
                      await models_1.Announcement.create(newAnnouncementFormat);
                      return newAnnouncementFormat;
                  })
        );
    } catch (error) {
        console.error('Error migrating announcements:', error);
    }
};
exports.migrateFireStoreAnnouncementsToMongodb =
    migrateFireStoreAnnouncementsToMongodb;
// Transform firestroe avatars to mongodb avatars
const migrateFireStoreAvatarsToMongodb = async () => {
    try {
        // Read jobs from jobs.json
        const avatarsFilePath = path.join(__dirname, '../../avatars.json');
        const avatarsData = fs.readFileSync(avatarsFilePath, 'utf8');
        const avatars = JSON.parse(avatarsData);
        // Map over jobs to update dates and find branch ID
        const updatedAvatars = await Promise.all(
            avatars.map(async (avatar) => {
                // Convert dates to ISO format
                const newAvatarsFormate = {
                    firebaseId:
                        avatar === null || avatar === void 0
                            ? void 0
                            : avatar.id,
                    fileName:
                        avatar === null || avatar === void 0
                            ? void 0
                            : avatar.fileName,
                    image:
                        avatar === null || avatar === void 0
                            ? void 0
                            : avatar.image,
                    type:
                        avatar === null || avatar === void 0
                            ? void 0
                            : avatar.type,
                };
                // Insert the Avatars into the MongoDB collection
                await models_1.Avatar.create(newAvatarsFormate);
                return newAvatarsFormate;
            })
        );
    } catch (error) {
        console.error('Error updating jobs:', error);
    }
};
exports.migrateFireStoreAvatarsToMongodb = migrateFireStoreAvatarsToMongodb;
// Transform firestroe labour markete stats to mongodb avatars
const migrateFireStoreLabourMarketeToMongodb = async () => {
    try {
        // Read stats from labour-market.json
        const labourMarketFilePath = path.join(
            __dirname,
            '../../labour-market.json'
        );
        const labourMarketData = fs.readFileSync(labourMarketFilePath, 'utf8');
        const labourMarketStats = JSON.parse(labourMarketData);
        // Map over jobs to update dates and find branch ID
        const updatedStats = await Promise.all(
            labourMarketStats.map(async (record) => {
                var _a;
                const foundedProgram = await models_1.Program.findOne({
                    firebaseId:
                        (_a =
                            record === null || record === void 0
                                ? void 0
                                : record.program) === null || _a === void 0
                            ? void 0
                            : _a.id,
                });
                const newRecordFormat = {
                    firebaseId:
                        record === null || record === void 0
                            ? void 0
                            : record.id,
                    stats:
                        record === null || record === void 0
                            ? void 0
                            : record.stats,
                    program:
                        foundedProgram === null || foundedProgram === void 0
                            ? void 0
                            : foundedProgram._id,
                };
                // Insert the transformed record into the MongoDB collection
                await models_1.LabourMarket.create(newRecordFormat);
                return newRecordFormat;
            })
        );
        console.log('All Labour market stats imported');
    } catch (error) {
        console.error('Error updating Labour market stats:', error);
    }
};
exports.migrateFireStoreLabourMarketeToMongodb =
    migrateFireStoreLabourMarketeToMongodb;
// Transform firestroe partners to mongodb partners
const migrateFireStorePartnersToMongodb = async () => {
    try {
        // Read jobs from jobs.json
        const partnersFilePath = path.join(__dirname, '../../partners.json');
        const partnersData = fs.readFileSync(partnersFilePath, 'utf8');
        const partners = JSON.parse(partnersData);
        // Map over jobs to update dates and find branch ID
        const updatedPartners = await Promise.all(
            partners.map(async (partner) => {
                // Convert dates to ISO format
                const newPartnerFormate = {
                    firebaseId:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.id,
                    name:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.name,
                    country:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.country,
                    city:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.city,
                    address:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.address,
                    address_line1:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.addressLine1,
                    address_line2:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.addressLine2,
                    zip:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.zip,
                    state:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.state,
                    website:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.website,
                    tag_line:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.tagLine,
                    logo_url:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.logoUrl,
                    banner_color:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.bannerColor,
                    mission:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.mission,
                    carousel_images:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.carouselImages,
                    email:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.email,
                    admin_email:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.adminEmail,
                    phone_no:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.telephone,
                    photo_url:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.photoUrl,
                    approved:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.approved,
                    // program: partner?.program,  need to get the programs ids for all the programs that he is in and then appedn then here
                    latitute:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.latitude,
                    longitude:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.longitude,
                    ipedsid:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.ipedsid,
                    is_test:
                        partner === null || partner === void 0
                            ? void 0
                            : partner.isTest,
                };
                // Insert the Programs into the MongoDB collection
                await models_1.Institute.create(newPartnerFormate);
                return newPartnerFormate;
            })
        );
        console.log('All partners imported');
    } catch (error) {
        console.error('Error updating jobs:', error);
    }
};
exports.migrateFireStorePartnersToMongodb = migrateFireStorePartnersToMongodb;
const translateJobDescription = async (text, targetLanguage) => {
    var _a, _b, _c, _d, _e;
    try {
        const prompt = `
Translate the following text into ${targetLanguage}. Ensure that the meaning remains consistent:
"${text}"
      `;
        const response = await axios_1.default.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: [{ role: 'user', content: prompt }],
            },
            {
                headers: {
                    Authorization: `Bearer ${
                        (_a =
                            process === null || process === void 0
                                ? void 0
                                : process.env) === null || _a === void 0
                            ? void 0
                            : _a.OPENAI_API_KEY
                    }`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return (_e =
            (_d =
                (_c =
                    (_b =
                        response === null || response === void 0
                            ? void 0
                            : response.data) === null || _b === void 0
                        ? void 0
                        : _b.choices) === null || _c === void 0
                    ? void 0
                    : _c[0]) === null || _d === void 0
                ? void 0
                : _d.message) === null || _e === void 0
            ? void 0
            : _e.content;
    } catch (error) {
        console.error('Error during translation:', error.message);
        throw error;
    }
};
exports.translateJobDescription = translateJobDescription;
/**
 * Updates job records with translations.
 */
const translateOldJobsInDatabase = async () => {
    var _a,
        _b,
        _c,
        _d,
        _e,
        _f,
        _g,
        _h,
        _j,
        _k,
        _l,
        _m,
        _o,
        _p,
        _q,
        _r,
        _s,
        _t,
        _u,
        _v;
    try {
        // Fetch all jobs
        const jobs = await models_1.Job.find({});
        console.log(`Found ${jobs.length} jobs.`);
        for (const job of jobs) {
            const updatedFields = {};
            // mean job is already translated so ignore this
            if (
                ((_a =
                    job === null || job === void 0
                        ? void 0
                        : job.job_description) === null || _a === void 0
                    ? void 0
                    : _a.en) ||
                ((_b = job === null || job === void 0 ? void 0 : job.title) ===
                    null || _b === void 0
                    ? void 0
                    : _b.en) ||
                ((_c =
                    job === null || job === void 0
                        ? void 0
                        : job.pay_description) === null || _c === void 0
                    ? void 0
                    : _c.en) ||
                ((_d =
                    job === null || job === void 0
                        ? void 0
                        : job.contact_bio) === null || _d === void 0
                    ? void 0
                    : _d.en) ||
                ((_e =
                    job === null || job === void 0
                        ? void 0
                        : job.branch_bio) === null || _e === void 0
                    ? void 0
                    : _e.en)
            ) {
                // do nothing
            } else {
                console.time(`Translation Time for Job ${job._id}`); // Start the timer for the job
                console.log(`Translating job: ${job._id}`);
                // Translate job_description
                if (
                    job === null || job === void 0
                        ? void 0
                        : job.job_description
                ) {
                    updatedFields.job_description = {
                        en:
                            ((_f =
                                job === null || job === void 0
                                    ? void 0
                                    : job.job_description) === null ||
                            _f === void 0
                                ? void 0
                                : _f.en) ||
                            (job === null || job === void 0
                                ? void 0
                                : job.job_description),
                        es: await (0, exports.translateJobDescription)(
                            ((_g =
                                job === null || job === void 0
                                    ? void 0
                                    : job.job_description) === null ||
                            _g === void 0
                                ? void 0
                                : _g.en) ||
                                (job === null || job === void 0
                                    ? void 0
                                    : job.job_description),
                            'spanish'
                        ),
                        tl: await (0, exports.translateJobDescription)(
                            ((_h =
                                job === null || job === void 0
                                    ? void 0
                                    : job.job_description) === null ||
                            _h === void 0
                                ? void 0
                                : _h.en) ||
                                (job === null || job === void 0
                                    ? void 0
                                    : job.job_description),
                            'tagalog'
                        ),
                    };
                }
                // Translate title
                if (job === null || job === void 0 ? void 0 : job.title) {
                    updatedFields.title = {
                        en:
                            ((_j =
                                job === null || job === void 0
                                    ? void 0
                                    : job.title) === null || _j === void 0
                                ? void 0
                                : _j.en) ||
                            (job === null || job === void 0
                                ? void 0
                                : job.title),
                        es: await (0, exports.translateJobDescription)(
                            ((_k =
                                job === null || job === void 0
                                    ? void 0
                                    : job.title) === null || _k === void 0
                                ? void 0
                                : _k.en) ||
                                (job === null || job === void 0
                                    ? void 0
                                    : job.title),
                            'spanish'
                        ),
                        tl: await (0, exports.translateJobDescription)(
                            ((_l =
                                job === null || job === void 0
                                    ? void 0
                                    : job.title) === null || _l === void 0
                                ? void 0
                                : _l.en) ||
                                (job === null || job === void 0
                                    ? void 0
                                    : job.title),
                            'tagalog'
                        ),
                    };
                }
                // Translate pay_description
                if (
                    job === null || job === void 0
                        ? void 0
                        : job.pay_description
                ) {
                    updatedFields.pay_description = {
                        en:
                            ((_m =
                                job === null || job === void 0
                                    ? void 0
                                    : job.pay_description) === null ||
                            _m === void 0
                                ? void 0
                                : _m.en) ||
                            (job === null || job === void 0
                                ? void 0
                                : job.pay_description),
                        es: await (0, exports.translateJobDescription)(
                            ((_o =
                                job === null || job === void 0
                                    ? void 0
                                    : job.pay_description) === null ||
                            _o === void 0
                                ? void 0
                                : _o.en) ||
                                (job === null || job === void 0
                                    ? void 0
                                    : job.pay_description),
                            'spanish'
                        ),
                        tl: await (0, exports.translateJobDescription)(
                            ((_p =
                                job === null || job === void 0
                                    ? void 0
                                    : job.pay_description) === null ||
                            _p === void 0
                                ? void 0
                                : _p.en) ||
                                (job === null || job === void 0
                                    ? void 0
                                    : job.pay_description),
                            'tagalog'
                        ),
                    };
                }
                // Translate contact_bio
                if (job === null || job === void 0 ? void 0 : job.contact_bio) {
                    updatedFields.contact_bio = {
                        en:
                            ((_q =
                                job === null || job === void 0
                                    ? void 0
                                    : job.contact_bio) === null || _q === void 0
                                ? void 0
                                : _q.en) ||
                            (job === null || job === void 0
                                ? void 0
                                : job.contact_bio),
                        es: await (0, exports.translateJobDescription)(
                            ((_r =
                                job === null || job === void 0
                                    ? void 0
                                    : job.contact_bio) === null || _r === void 0
                                ? void 0
                                : _r.en) ||
                                (job === null || job === void 0
                                    ? void 0
                                    : job.contact_bio),
                            'spanish'
                        ),
                        tl: await (0, exports.translateJobDescription)(
                            ((_s =
                                job === null || job === void 0
                                    ? void 0
                                    : job.contact_bio) === null || _s === void 0
                                ? void 0
                                : _s.en) ||
                                (job === null || job === void 0
                                    ? void 0
                                    : job.contact_bio),
                            'tagalog'
                        ),
                    };
                }
                // Translate branch_bio
                if (job === null || job === void 0 ? void 0 : job.branch_bio) {
                    updatedFields.branch_bio = {
                        en:
                            ((_t =
                                job === null || job === void 0
                                    ? void 0
                                    : job.branch_bio) === null || _t === void 0
                                ? void 0
                                : _t.en) ||
                            (job === null || job === void 0
                                ? void 0
                                : job.branch_bio),
                        es: await (0, exports.translateJobDescription)(
                            ((_u =
                                job === null || job === void 0
                                    ? void 0
                                    : job.branch_bio) === null || _u === void 0
                                ? void 0
                                : _u.en) ||
                                (job === null || job === void 0
                                    ? void 0
                                    : job.branch_bio),
                            'spanish'
                        ),
                        tl: await (0, exports.translateJobDescription)(
                            ((_v =
                                job === null || job === void 0
                                    ? void 0
                                    : job.branch_bio) === null || _v === void 0
                                ? void 0
                                : _v.en) ||
                                (job === null || job === void 0
                                    ? void 0
                                    : job.branch_bio),
                            'tagalog'
                        ),
                    };
                }
                // Update job in the database
                await models_1.Job.findByIdAndUpdate(
                    job === null || job === void 0 ? void 0 : job._id,
                    updatedFields,
                    {
                        new: true,
                    }
                );
                console.timeEnd(`Translation Time for Job ${job._id}`); // End the timer and log the time
                console.log(`Job ${job._id} updated with translations.`);
            }
        }
        console.log('All jobs processed successfully.');
    } catch (error) {
        console.error('Error during translation process:', error.message);
    }
};
exports.translateOldJobsInDatabase = translateOldJobsInDatabase;
// This function will get the users from specific date so when ali bhai ask to give me the list of users that are created in last 10 days
const getStudentsCreatedFromSpecificDate = () => {
    // Read announcements from announcements.json
    const usersFilePath = path.join(__dirname, '../../users.json');
    const usersData = fs.readFileSync(usersFilePath, 'utf8');
    const records = JSON.parse(usersData);
    // get students created from 1st december 2024
    const targetDate = new Date('2024-12-01T00:00:00Z').getTime();
    // Filter records by date
    const filteredByDate = records.filter((record) => {
        let recordDate;
        // Handle Firestore timestamp format
        if (record.dateCreated && record.dateCreated._seconds) {
            recordDate = record.dateCreated._seconds * 1000; // Convert seconds to milliseconds
        }
        // Handle ISO date string format
        else if (record.dateCreated && typeof record.dateCreated === 'string') {
            recordDate = new Date(record.dateCreated).getTime();
        }
        // Return only records created on or after the target date
        return recordDate >= targetDate;
    });
    // Further filter records by role (must include "Student")
    const filteredByRole = filteredByDate.filter(
        (record) => record.role && record.role.includes('Student')
    );
    return filteredByRole === null || filteredByRole === void 0
        ? void 0
        : filteredByRole.map((item) => ({
              id: item === null || item === void 0 ? void 0 : item.id,
              dateCreated:
                  item === null || item === void 0 ? void 0 : item.dateCreated,
              name: item === null || item === void 0 ? void 0 : item.name,
              email: item === null || item === void 0 ? void 0 : item.email,
          }));
};
exports.getStudentsCreatedFromSpecificDate = getStudentsCreatedFromSpecificDate;
const findAndDeleteEmployersBranches = async () => {
    try {
        // Fetch all employers
        const employers = await models_1.User.find({ role: 'Employer' });
        // Construct the data
        const employersWithFilteredBranches = await Promise.all(
            employers.map(async (employer) => {
                // Fetch branches associated with the employer
                const branches = await models_1.Branch.find({
                    email: employer.email,
                });
                // Filter branches based on the criteria
                const filteredBranches = await Promise.all(
                    branches.map(async (branch) => {
                        const hasJob = await models_1.Job.exists({
                            branch_id: branch._id,
                        });
                        const hasEventRegistration =
                            await models_1.EventRegistration.exists({
                                branch_id: branch._id,
                            });
                        // Include the branch only if it is NOT in Job or EventRegistration
                        if (!hasJob && !hasEventRegistration) {
                            return branch; // Include the branch
                        }
                        return null; // Exclude the branch
                    })
                );
                // Filter out null values (excluded branches)
                const validBranches = filteredBranches.filter(
                    (branch) => branch !== null
                );
                // Include the employer only if they have valid branches
                if (validBranches.length > 0) {
                    console.log(
                        `Employer Email: ${employer.email}, Valid Branches Count: ${validBranches.length}`
                    );
                    return Object.assign(
                        Object.assign({}, employer.toObject()),
                        { branches: validBranches }
                    );
                }
                return null; // Exclude the employer if no valid branches
            })
        );
        // Filter out null values (excluded employers)
        const filteredEmployers = employersWithFilteredBranches.filter(
            (employer) => employer !== null
        );
        // Collect branch IDs to delete
        // const branchIdsToDelete = filteredEmployers.flatMap((employer) =>
        //     employer.branches.map((branch, index) => index !== 0 && branch._id)
        // );
        const branchIdsToDelete = filteredEmployers.flatMap(
            (employer) => employer.branches.map((branch) => branch._id) // Collect all branch IDs
        );
        // Delete the branches from the database
        const deletionResult = await models_1.Branch.deleteMany({
            _id: { $in: branchIdsToDelete },
        });
        console.log(
            `Deleted ${deletionResult.deletedCount} branches from the database.`
        );
        // Define the path for the JSON file
        const filePath = path.join(
            __dirname,
            '../../filtered_employers_branches_deleted.json'
        );
        // Write the data to the JSON file
        fs.writeFileSync(
            filePath,
            JSON.stringify(filteredEmployers, null, 4),
            'utf8'
        );
        console.log(`Filtered employers saved successfully to ${filePath}`);
    } catch (error) {
        console.error(
            `Error filtering or deleting employers' branches: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findAndDeleteEmployersBranches = findAndDeleteEmployersBranches;
// Helper function to calculate the size of an object
const getObjectSize = (obj) => {
    // Convert the object to a JSON string
    const jsonString = JSON.stringify(obj);
    // Calculate the size in bytes (1 character = 1 byte)
    const sizeInBytes = new Blob([jsonString]).size;
    // Convert bytes to kilobytes (1 KB = 1024 bytes)
    const sizeInKB = sizeInBytes / 1024;
    // Convert bytes to megabytes (1 MB = 1024 KB)
    const sizeInMB = sizeInKB / 1024;
    return {
        bytes: sizeInBytes,
        kilobytes: sizeInKB.toFixed(2),
        megabytes: sizeInMB.toFixed(2), // Rounded to 2 decimal places
    };
};
exports.getObjectSize = getObjectSize;
const prepareBranchForComparison = (branch) => {
    const trimmedBranch = Object.assign({}, branch.toObject());
    // Trim specific fields
    const fieldsToTrim = [
        'contact_bio',
        'bio',
        'photo_url',
        'address_line1',
        'banner_image',
    ];
    fieldsToTrim.forEach((field) => {
        if (trimmedBranch[field]) {
            trimmedBranch[field] = trimmedBranch[field].substring(0, 60);
        }
    });
    // Include only the specified fields
    const fieldsForComparison = [
        'name',
        'address_line1',
        'email',
        'contact_name',
        'contact_bio',
        'bio',
        'city',
        'country',
        'branch_location',
        'phone_no',
        'photo_url',
        'state',
        'banner_image',
        'zip_code',
        'tag_line',
        'social_media_links',
        'book_mark_students',
        'culture_and_environment',
        'is_head_quarter',
        'media',
        'mission',
    ];
    return fieldsForComparison.reduce((filtered, field) => {
        if (trimmedBranch[field] !== undefined) {
            filtered[field] = trimmedBranch[field];
        }
        return filtered;
    }, {});
};
const analyzeBranchMetrics = async () => {
    try {
        // Fetch all employers
        const employers = await models_1.User.find({ role: 'Employer' });
        // Iterate through each employer to calculate branch metrics
        const branchMetrics = await Promise.all(
            employers.map(async (employer) => {
                // Fetch branches associated with the employer
                const branches = await models_1.Branch.find({
                    email: employer.email,
                });
                if (!branches || branches.length === 0) {
                    return null; // Skip employers without branches
                }
                // Find branch with maximum jobs
                const branchWithMaxJobs = await branches.reduce(
                    async (maxBranchPromise, currentBranch) => {
                        const maxBranch = await maxBranchPromise;
                        const currentJobCount =
                            await models_1.Job.countDocuments({
                                branch_id: currentBranch._id,
                            });
                        const maxJobCount = await models_1.Job.countDocuments({
                            branch_id:
                                maxBranch === null || maxBranch === void 0
                                    ? void 0
                                    : maxBranch._id,
                        });
                        return currentJobCount > maxJobCount
                            ? currentBranch
                            : maxBranch;
                    },
                    Promise.resolve(null)
                );
                // Find branch with maximum event registrations
                const branchWithMaxEventRegistrations = await branches.reduce(
                    async (maxBranchPromise, currentBranch) => {
                        const maxBranch = await maxBranchPromise;
                        const currentEventCount =
                            await models_1.EventRegistration.countDocuments({
                                branch_id: currentBranch._id,
                            });
                        const maxEventCount =
                            await models_1.EventRegistration.countDocuments({
                                branch_id:
                                    maxBranch === null || maxBranch === void 0
                                        ? void 0
                                        : maxBranch._id,
                            });
                        return currentEventCount > maxEventCount
                            ? currentBranch
                            : maxBranch;
                    },
                    Promise.resolve(null)
                );
                // Prepare branches for comparison
                const preparedBranches = branches.map((branch) =>
                    prepareBranchForComparison(branch)
                );
                // Find branch with maximum size
                const branchWithMaxSize = preparedBranches.reduce(
                    (maxBranch, currentPreparedBranch) => {
                        const currentSize = (0, exports.getObjectSize)(
                            currentPreparedBranch
                        );
                        const maxSize = (0, exports.getObjectSize)(maxBranch);
                        return currentSize > maxSize
                            ? currentPreparedBranch
                            : maxBranch;
                    }
                );
                // Determine the primary branch
                let primaryBranch;
                if (branchWithMaxJobs && branchWithMaxEventRegistrations) {
                    const sizeJobs = (0, exports.getObjectSize)(
                        branchWithMaxJobs
                    );
                    const sizeEvents = (0, exports.getObjectSize)(
                        branchWithMaxEventRegistrations
                    );
                    primaryBranch =
                        sizeJobs >= sizeEvents
                            ? branchWithMaxJobs
                            : branchWithMaxEventRegistrations;
                } else {
                    primaryBranch =
                        branchWithMaxJobs || branchWithMaxEventRegistrations;
                }
                // Handle branch comparison and updates
                let finalBranch;
                if (
                    primaryBranch &&
                    branchWithMaxSize &&
                    primaryBranch._id.equals(branchWithMaxSize._id)
                ) {
                    finalBranch = primaryBranch;
                } else {
                    finalBranch = primaryBranch || branchWithMaxSize;
                }
                // Update jobs and events of other branches to use the final branch
                const otherBranches = branches.filter(
                    (branch) => !branch._id.equals(finalBranch._id)
                );
                await Promise.all(
                    otherBranches.map(async (branch) => {
                        await models_1.Job.updateMany(
                            { branch_id: branch._id },
                            { branch_id: finalBranch._id }
                        );
                        await models_1.EventRegistration.updateMany(
                            { branch_id: branch._id },
                            { branch_id: finalBranch._id }
                        );
                    })
                );
                // Delete all other branches that are not the final branch
                const branchIdsToDelete = otherBranches.map(
                    (branch) => branch._id
                );
                await models_1.Branch.deleteMany({
                    _id: { $in: branchIdsToDelete },
                });
                // Return metrics for the employer
                return {
                    employer: employer.toObject(),
                    branchWithMaxJobs:
                        (branchWithMaxJobs === null ||
                        branchWithMaxJobs === void 0
                            ? void 0
                            : branchWithMaxJobs.toObject()) || null,
                    branchWithMaxEventRegistrations:
                        (branchWithMaxEventRegistrations === null ||
                        branchWithMaxEventRegistrations === void 0
                            ? void 0
                            : branchWithMaxEventRegistrations.toObject()) ||
                        null,
                    branchWithMaxSize:
                        (branchWithMaxSize === null ||
                        branchWithMaxSize === void 0
                            ? void 0
                            : branchWithMaxSize.toObject()) || null,
                    finalBranch:
                        (finalBranch === null || finalBranch === void 0
                            ? void 0
                            : finalBranch.toObject()) || null,
                };
            })
        );
        console.log(`Branch metrics analysis done successfully`);
    } catch (error) {
        console.error(
            `Error analyzing branch metrics: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.analyzeBranchMetrics = analyzeBranchMetrics;
const migrateConsortiomToMongoDB = async () => {
    try {
        // Read the JSON file
        const jsonFilePath = path.join(__dirname, '../../consortioms.json');
        const consortiumsData = fs.readFileSync(jsonFilePath, 'utf8');
        const consortiums = JSON.parse(consortiumsData);
        // Insert consortiums into the MongoDB collection
        await models_1.Consortiom.insertMany(consortiums);
        console.log('Consortiums imported into MongoDB');
    } catch (error) {
        console.error('Error importing consortiums:', error);
    }
};
exports.migrateConsortiomToMongoDB = migrateConsortiomToMongoDB;
const convertConsortiomXlsxToJson = async () => {
    try {
        const filePath = path.resolve(__dirname, '../../consortiom.xlsx');
        const workbook = xlsx_1.default.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rawData = xlsx_1.default.utils.sheet_to_json(sheet, {
            header: 1,
        });
        const headers = [
            'Consortium Name',
            'Consortium Address',
            'Consortium Link',
            'Contact Name',
            'Contact Phone',
            'Contact Email',
        ];
        const consortiums = rawData.reduce((acc, row, index) => {
            // Skip the first two rows containing the headers
            if (index === 0) return acc;
            if (index === 1) return acc;
            // Extract only the fields corresponding to the headers
            const [
                name,
                address,
                link,
                contactName,
                contactPhone,
                contactEmail,
            ] = row;
            // Check if all the required fields are empty
            const isRowEmpty =
                !(name === null || name === void 0 ? void 0 : name.trim()) &&
                !(address === null || address === void 0
                    ? void 0
                    : address.trim()) &&
                !(link === null || link === void 0 ? void 0 : link.trim()) &&
                !(contactName === null || contactName === void 0
                    ? void 0
                    : contactName.trim()) &&
                !(contactPhone === null || contactPhone === void 0
                    ? void 0
                    : contactPhone.trim()) &&
                !(contactEmail === null || contactEmail === void 0
                    ? void 0
                    : contactEmail.trim());
            if (!isRowEmpty) {
                const consortium = {
                    name: name || '',
                    address: address || '',
                    link: link || '',
                    contactName: contactName || '',
                    contactPhone:
                        (contactPhone === null || contactPhone === void 0
                            ? void 0
                            : contactPhone.toString()) || '',
                    contactEmail: contactEmail || '',
                };
                acc.push(consortium);
            }
            return acc;
        }, []);
        // Write JSON data to a file
        const outputFilePath = path.resolve(
            __dirname,
            '../../consortioms.json'
        );
        fs.writeFileSync(
            outputFilePath,
            JSON.stringify(consortiums, null, 2),
            'utf-8'
        );
        console.log(`Consortium data has been saved to ${outputFilePath}`);
    } catch (error) {
        console.error('Error converting xlsx to json:', error);
    }
};
exports.convertConsortiomXlsxToJson = convertConsortiomXlsxToJson;
const convertConsortiomWithMembersXlsxToJson = async () => {
    try {
        const filePath = path.resolve(
            __dirname,
            '../../ConsortiomsWithMembers.xlsx'
        );
        const workbook = xlsx_1.default.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rawData = xlsx_1.default.utils.sheet_to_json(sheet, {
            header: 1,
        });
        const headers = [
            'Consortium Name',
            'Consortium Address',
            'Consortium Link',
            'Contact Name',
            'Contact Phone',
            'Contact Email',
            'Members',
        ];
        const consortiums = rawData.reduce((acc, row, index) => {
            // Skip the first two rows containing the headers
            if (index === 0) return acc;
            if (index === 1) return acc;
            // Extract only the fields corresponding to the headers
            const [
                name,
                address,
                link,
                contactName,
                contactPhone,
                contactEmail,
                members,
            ] = row;
            // Check if all the required fields are empty
            const isRowEmpty =
                !(name === null || name === void 0 ? void 0 : name.trim()) &&
                !(address === null || address === void 0
                    ? void 0
                    : address.trim()) &&
                !(link === null || link === void 0 ? void 0 : link.trim()) &&
                !(contactName === null || contactName === void 0
                    ? void 0
                    : contactName.trim()) &&
                !(contactPhone === null || contactPhone === void 0
                    ? void 0
                    : contactPhone.trim()) &&
                !(contactEmail === null || contactEmail === void 0
                    ? void 0
                    : contactEmail.trim()) &&
                !(members === null || members === void 0
                    ? void 0
                    : members.trim());
            if (!isRowEmpty) {
                const consortium = {
                    name: name || '',
                    address: address || '',
                    link: link || '',
                    contactName: contactName || '',
                    contactPhone:
                        (contactPhone === null || contactPhone === void 0
                            ? void 0
                            : contactPhone.toString()) || '',
                    contactEmail: contactEmail || '',
                    members: members || '',
                };
                acc.push(consortium);
            }
            return acc;
        }, []);
        // Write JSON data to a file
        const outputFilePath = path.resolve(
            __dirname,
            '../../consortiomsWithMembers.json'
        );
        fs.writeFileSync(
            outputFilePath,
            JSON.stringify(consortiums, null, 2),
            'utf-8'
        );
        console.log(
            `Consortium With Members data has been saved to ${outputFilePath}`
        );
    } catch (error) {
        console.error('Error converting xlsx to json:', error);
    }
};
exports.convertConsortiomWithMembersXlsxToJson =
    convertConsortiomWithMembersXlsxToJson;
const migrateConsortiumMembersToMongoDB = async () => {
    try {
        // Read the JSON file
        const jsonFilePath = path.join(
            __dirname,
            '../../consortiomsWithMembers.json'
        );
        const consortiumData = fs.readFileSync(jsonFilePath, 'utf8');
        const consortiums = JSON.parse(consortiumData);
        // Iterate through the consortiums and insert member institutions
        for (const consortium of consortiums) {
            const consortiumName = consortium.name.trim();
            // Find the consortium ID by name
            const foundConsortium = await models_1.Consortiom.findOne({
                name: consortiumName,
            });
            if (!foundConsortium) {
                console.warn(`Consortium not found: ${consortiumName}`);
                continue;
            }
            const consortiomId = foundConsortium._id;
            // Create a new institution with the consortium's ID and member name
            const newInstitution = new models_1.Institute({
                consortiom_id: consortiomId,
                name:
                    consortium === null || consortium === void 0
                        ? void 0
                        : consortium.members,
                approved: true,
            });
            // Save the institution to the database
            await newInstitution.save();
            console.log(
                `Institution added: ${consortium.members} under consortium ${consortiumName}`
            );
        }
        console.log('All consortium members migrated successfully.');
    } catch (error) {
        console.error('Error migrating consortium members:', error);
    }
};
exports.migrateConsortiumMembersToMongoDB = migrateConsortiumMembersToMongoDB;
const deleteInstitutesWithFewerUsers = async () => {
    try {
        // Step 1: Aggregate to find institutes with more than 10 users
        const result = await models_1.User.aggregate([
            {
                $match: {
                    institute_id: { $ne: null },
                },
            },
            {
                $group: {
                    _id: '$institute_id',
                    userCount: { $sum: 1 },
                },
            },
            {
                $match: {
                    userCount: { $gt: 1 }, // Only institutes with more than 10 users
                },
            },
            {
                $lookup: {
                    from: 'institutions',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'instituteDetails',
                },
            },
            {
                $unwind: {
                    path: '$instituteDetails',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    institute_id: '$_id',
                    userCount: 1,
                    instituteName: {
                        $ifNull: ['$instituteDetails.name', 'Unknown'],
                    },
                    _id: 0,
                },
            },
        ]);
        console.log('Institutes with more than 10 users:', result);
        // Step 2: Extract the IDs of institutes to retain
        const retainedInstituteIds = result.map((doc) => doc.institute_id);
        // Step 3: Delete all institutes other than the retained ones
        const deleteResult = await models_1.Institute.deleteMany({
            _id: { $nin: retainedInstituteIds },
        });
        console.log(
            `Deleted ${deleteResult.deletedCount} institutes that do not have more than 10 users.`
        );
    } catch (error) {
        console.error('Error fetching and deleting institutes:', error);
    }
};
exports.deleteInstitutesWithFewerUsers = deleteInstitutesWithFewerUsers;
const findDuplicatInstituitons = async () => {
    const aggregation = [
        {
            $group: {
                _id: '$name',
                count: { $sum: 1 },
                docs: { $push: '$$ROOT' },
            },
        },
        {
            $match: {
                count: { $gt: 1 },
            },
        },
    ];
    const res = await models_1.Institute.aggregate(aggregation);
};
exports.findDuplicatInstituitons = findDuplicatInstituitons;
const addNameToBranches = async () => {
    try {
        const allBranches = await models_1.Branch.find({ name: '' });
        let updatedCount = 0;
        let users = [];
        for (const branch of allBranches) {
            const localUser = await models_1.User.findOne({
                _id:
                    branch === null || branch === void 0
                        ? void 0
                        : branch.userId,
            });
            console.log('running the loop', localUser);
            if (localUser) {
                users.push(localUser);
                // branch.name = localUser?.name;
                // branch.save();
                // updatedCount++;
                // console.log(
                //     `Updated branch: ${branch._id} with name: ${localUser.name}`
                // );
            }
            console.log(`Total branches updated with empty names: ${users}`);
        }
        console.log(
            'all branches in here',
            allBranches === null || allBranches === void 0
                ? void 0
                : allBranches.length
        );
    } catch (error) {}
};
exports.addNameToBranches = addNameToBranches;
const transformStudentEducationAndExperienceToNewFormate = async () => {
    var _a;
    const users = await models_1.User.find({
        role: { $in: ['Student', 'JobSeeker'] },
    });
    for (let user of users) {
        if (!user.aiProfile) continue;
        const updatedAiProfile = Object.assign(
            Object.assign({}, user.aiProfile),
            {
                educations:
                    ((_a = user.aiProfile.educationsList) === null ||
                    _a === void 0
                        ? void 0
                        : _a.map((edu) => ({
                              levelOfEducation: edu.label,
                              fieldOfStudy: '',
                              school: '',
                              country: '',
                              cityState: '',
                              currentlyEnrolled: false,
                              from: null,
                              to: null,
                              description: '',
                          }))) || [],
                experiences:
                    user.aiProfile.wouldYouLikeToAddAnyExtraExperience &&
                    user.aiProfile.experienceNotes
                        ? [
                              {
                                  jobTitle: '',
                                  company: '',
                                  country: '',
                                  cityState: '',
                                  currentlyEnrolled: false,
                                  from: null,
                                  to: null,
                                  description:
                                      user.aiProfile.experienceNotes || '',
                              },
                          ]
                        : [],
            }
        );
        delete updatedAiProfile.experienceNotes;
        delete updatedAiProfile.educationsList;
        delete updatedAiProfile.wouldYouLikeToAddAnyExtraExperience;
        await models_1.User.updateOne(
            { _id: user._id },
            { $set: { aiProfile: updatedAiProfile } }
        );
        console.log(
            'done for ',
            (user === null || user === void 0 ? void 0 : user.name) ||
                (user === null || user === void 0 ? void 0 : user.email)
        );
    }
};
exports.transformStudentEducationAndExperienceToNewFormate =
    transformStudentEducationAndExperienceToNewFormate;
const findEmployersWithMaxBranchSize = async () => {
    const employers = await models_1.User.find({ role: 'Employer' });
    let duplicatebranchesofEmployer = [];
    const duplicateBranches = await Promise.all(
        employers.map(async (employer) => {
            const branches = await models_1.Branch.find({
                email: employer.email,
            });
            if (branches.length > 1) {
                duplicatebranchesofEmployer.push({
                    employerEmail:
                        employer === null || employer === void 0
                            ? void 0
                            : employer.email,
                    employerId:
                        employer === null || employer === void 0
                            ? void 0
                            : employer.id,
                    branches,
                });
            }
        })
    );
    console.log(
        'all employers with duplicate branches',
        duplicatebranchesofEmployer,
        duplicatebranchesofEmployer === null ||
            duplicatebranchesofEmployer === void 0
            ? void 0
            : duplicatebranchesofEmployer.length
    );
};
exports.findEmployersWithMaxBranchSize = findEmployersWithMaxBranchSize;
//# sourceMappingURL=index.js.map
