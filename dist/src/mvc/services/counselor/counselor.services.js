'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteDoc =
    exports.getInstitutionDocs =
    exports.updateDoc =
    exports.getAllDocs =
        void 0;
const db_counselor_1 = require('../../database/db.counselor');
const getAllDocs = async (req) => {
    var _a, _b, _c;
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
        const search =
            (_c = req === null || req === void 0 ? void 0 : req.query) ===
                null || _c === void 0
                ? void 0
                : _c.search;
        const { documents, totalDocuments, totalPages, currentPage } = await (0,
        db_counselor_1.findAllDocs)(search, limit, page);
        if (documents) {
            return {
                message: 'documents Retrived Successfully',
                statusCode: 200,
                success: true,
                documents: documents,
                totalDocuments,
                totalPages,
                currentPage,
            };
        } else {
            return {
                success: true,
                statusCode: 200,
                message: 'documents not found',
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
exports.getAllDocs = getAllDocs;
const getInstitutionDocs = async (req) => {
    var _a, _b, _c, _d;
    try {
        const institutionId =
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
            ) || 1;
        const limit =
            parseInt(
                (_c = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _c === void 0
                    ? void 0
                    : _c.limit
            ) || 10;
        const search =
            (_d = req === null || req === void 0 ? void 0 : req.query) ===
                null || _d === void 0
                ? void 0
                : _d.search;
        const { documents, totalDocuments, totalPages, currentPage } = await (0,
        db_counselor_1.findInstitutionDocs)(institutionId, search, limit, page);
        if (documents) {
            return {
                message: 'documents Retrived Successfully',
                statusCode: 200,
                success: true,
                documents: documents,
                totalDocuments,
                totalPages,
                currentPage,
            };
        } else {
            return {
                success: true,
                statusCode: 200,
                message: 'documents not found',
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
exports.getInstitutionDocs = getInstitutionDocs;
const updateDoc = async (req) => {
    var _a;
    try {
        const data = req === null || req === void 0 ? void 0 : req.body;
        const id =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const document = await (0, db_counselor_1.findDocByIdAndUpdate)(
            id,
            data
        );
        if (document) {
            return {
                document: document,
                message: 'document updated Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: true,
                statusCode: 200,
                message: 'document not found',
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
exports.updateDoc = updateDoc;
const deleteDoc = async (req) => {
    var _a;
    try {
        const id =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const document = await (0, db_counselor_1.findDocByIdAndDelete)(id);
        if (document) {
            return {
                document: document,
                message: 'document updated Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: true,
                statusCode: 200,
                message: 'document not found',
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
exports.deleteDoc = deleteDoc;
//# sourceMappingURL=counselor.services.js.map
