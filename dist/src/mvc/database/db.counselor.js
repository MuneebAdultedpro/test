'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.findDocByIdAndDelete =
    exports.findDocByIdAndUpdate =
    exports.findInstitutionDocs =
    exports.findAllDocs =
        void 0;
const models_1 = require('../models');
const findAllDocs = async (search, limit, page) => {
    try {
        const query = {};
        if (typeof search === 'string' && search.trim() !== '') {
            query['metadata.title'] = { $regex: search, $options: 'i' };
        }
        const totalDocuments = await models_1.CounselorDocuments.countDocuments(
            query
        );
        const totalPages = Math.ceil(totalDocuments / limit);
        const documents = await models_1.CounselorDocuments.find(query)
            .sort({
                createdAt: -1,
            })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('institute_id', 'name')
            .populate('user_id', 'name');
        return {
            documents,
            totalDocuments,
            totalPages,
            currentPage: page,
        };
    } catch (error) {
        throw new Error(`Error retrieving douncements: ${error.message}`);
    }
};
exports.findAllDocs = findAllDocs;
const findInstitutionDocs = async (institutionId, search, limit, page) => {
    try {
        const query = { institute_id: institutionId };
        if (typeof search === 'string' && search.trim() !== '') {
            query['metadata.title'] = { $regex: search, $options: 'i' };
        }
        const totalDocuments = await models_1.CounselorDocuments.countDocuments(
            query
        );
        const totalPages = Math.ceil(totalDocuments / limit);
        const documents = await models_1.CounselorDocuments.find(query)
            .sort({
                createdAt: -1,
            })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('institute_id', 'name')
            .populate('user_id', 'name');
        return {
            documents,
            totalDocuments,
            totalPages,
            currentPage: page,
        };
    } catch (error) {
        throw new Error(`Error retrieving douncements: ${error.message}`);
    }
};
exports.findInstitutionDocs = findInstitutionDocs;
const findDocByIdAndUpdate = async (id, data) => {
    try {
        await models_1.CounselorDocuments.findByIdAndUpdate(id, data, {
            new: true,
        });
        const updatedDocument = await models_1.CounselorDocuments.findById(id)
            .populate('institute_id', 'name')
            .populate('user_id', 'name');
        if (!updatedDocument) {
            throw new Error('Document not found');
        }
        return updatedDocument;
    } catch (error) {
        throw new Error(
            `Error updating Document: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findDocByIdAndUpdate = findDocByIdAndUpdate;
const findDocByIdAndDelete = async (id) => {
    try {
        return await models_1.CounselorDocuments.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(
            `Error updating Document: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findDocByIdAndDelete = findDocByIdAndDelete;
//# sourceMappingURL=db.counselor.js.map
