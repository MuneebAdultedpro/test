'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteDocController =
    exports.getInstitutionDocsController =
    exports.updateDocController =
    exports.getAllDocsController =
        void 0;
const counselor_1 = require('../../services/counselor');
const getAllDocsController = async (req, res) => {
    try {
        const result = await (0, counselor_1.getAllDocs)(req);
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
                    documents:
                        result === null || result === void 0
                            ? void 0
                            : result.documents,
                    totalDocuments:
                        result === null || result === void 0
                            ? void 0
                            : result.totalDocuments,
                    totalPages:
                        result === null || result === void 0
                            ? void 0
                            : result.totalPages,
                    currentPage:
                        result === null || result === void 0
                            ? void 0
                            : result.currentPage,
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
exports.getAllDocsController = getAllDocsController;
const getInstitutionDocsController = async (req, res) => {
    try {
        const result = await (0, counselor_1.getInstitutionDocs)(req);
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
                    documents:
                        result === null || result === void 0
                            ? void 0
                            : result.documents,
                    totalDocuments:
                        result === null || result === void 0
                            ? void 0
                            : result.totalDocuments,
                    totalPages:
                        result === null || result === void 0
                            ? void 0
                            : result.totalPages,
                    currentPage:
                        result === null || result === void 0
                            ? void 0
                            : result.currentPage,
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
exports.getInstitutionDocsController = getInstitutionDocsController;
const updateDocController = async (req, res) => {
    try {
        const result = await (0, counselor_1.updateDoc)(req);
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
                    document:
                        result === null || result === void 0
                            ? void 0
                            : result.document,
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
exports.updateDocController = updateDocController;
const deleteDocController = async (req, res) => {
    try {
        const result = await (0, counselor_1.deleteDoc)(req);
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
                    document:
                        result === null || result === void 0
                            ? void 0
                            : result.document,
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
exports.deleteDocController = deleteDocController;
//# sourceMappingURL=counselor.controller.js.map
