'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.findAnnouncementByIdAndUpdate =
    exports.createNewAnnouncement =
    exports.fetchAnnouncementById =
    exports.fetchStudentAnnouncements =
    exports.fetchInstitueAnnouncements =
    exports.fetchAllAnnouncements =
        void 0;
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const types_1 = require('../../interfaces/types');
const models_1 = require('../models');
const fetchAllAnnouncements = async (search, limit, page) => {
    try {
        const query = {};
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        const totalAnnouncements = await models_1.Announcement.countDocuments(
            query
        );
        const totalPages = Math.ceil(totalAnnouncements / limit);
        const announcements = await models_1.Announcement.find(query)
            .sort({
                title: 1,
                createdAt: -1,
            })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('institute_id')
            .populate('toIds');
        return {
            announcements,
            totalAnnouncements,
            totalPages,
            currentPage: page,
        };
    } catch (error) {
        throw new Error(`Error retrieving announcements: ${error.message}`);
    }
};
exports.fetchAllAnnouncements = fetchAllAnnouncements;
const fetchInstitueAnnouncements = async (instituteId) => {
    try {
        return await models_1.Announcement.find({ institute_id: instituteId })
            .populate({
                path: 'toIds',
                select: 'name role email',
            })
            .sort({ createdAt: -1 });
    } catch (error) {
        throw new Error(
            `Error fetching Announcement: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.fetchInstitueAnnouncements = fetchInstitueAnnouncements;
const fetchStudentAnnouncements = async (instituteId, userId) => {
    try {
        return await models_1.Announcement.find({
            institute_id: new mongoose_1.default.Types.ObjectId(instituteId),
            type: types_1.AnnouncementTypes.Notification,
            toIds: {
                $in: [new mongoose_1.default.Types.ObjectId(userId)],
            },
        }).sort({
            title: 1,
            createdAt: -1,
        });
    } catch (error) {
        throw new Error(
            `Error fetching Announcement: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.fetchStudentAnnouncements = fetchStudentAnnouncements;
const fetchAnnouncementById = async (announcementId) => {
    try {
        return await models_1.Announcement.findById(announcementId);
    } catch (error) {
        throw new Error(
            `Error fetching Announcement: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.fetchAnnouncementById = fetchAnnouncementById;
const createNewAnnouncement = async (data) => {
    try {
        const announcement = await new models_1.Announcement(data);
        return announcement.save();
    } catch (error) {
        throw new Error(
            `Error Creating Announcement: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.createNewAnnouncement = createNewAnnouncement;
const findAnnouncementByIdAndUpdate = async (id, data) => {
    try {
        const updatedDocument = await models_1.Announcement.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
            }
        );
        if (!updatedDocument) {
            throw new Error('Announcement not found');
        }
        return updatedDocument;
    } catch (error) {
        throw new Error(`Error updating Announcement: ${error.message}`);
    }
};
exports.findAnnouncementByIdAndUpdate = findAnnouncementByIdAndUpdate;
//# sourceMappingURL=db.announcement.js.map
