'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteCommentController =
    exports.deletePostController =
    exports.createEmploymentVerificationPostController =
    exports.getPostsByUserIdController =
    exports.getPostByIdController =
    exports.getPostsByLocationController =
    exports.createCommentController =
    exports.getCommentsController =
    exports.getHashTagsController =
    exports.toggleLikeController =
    exports.updatePostController =
    exports.createPostController =
    exports.getInstagramPostsByTagNameController =
    exports.unpinPostController =
    exports.reportController =
    exports.pinPostController =
    exports.unhidePostController =
    exports.hidePostController =
        void 0;
const spotlight_1 = require('../../services/spotlight');
const spotlight_service_1 = require('../../services/spotlight/spotlight.service');
// this is not used any more , keeping it only if we need to fetch the post from backend in future
const getInstagramPostsByTagNameController = async (req, res) => {
    try {
        const result = await (0, spotlight_1.getInstagramPostsByTagName)(req);
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
                    posts:
                        result === null || result === void 0
                            ? void 0
                            : result.posts,
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
exports.getInstagramPostsByTagNameController =
    getInstagramPostsByTagNameController;
const getPostsByLocationController = async (req, res) => {
    try {
        const result = await (0, spotlight_1.getPostsByLocation)(req);
        if (result.success) {
            return res.status(result.statusCode).json({
                success: result.success,
                posts:
                    (result === null || result === void 0
                        ? void 0
                        : result.posts) || [],
                totalPages: result.totalPages,
                currentpage: result.currentpage,
                totalPosts: result.totalPosts,
            });
        } else {
            return res.status(result.statusCode).json({
                success: result.success,
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
exports.getPostsByLocationController = getPostsByLocationController;
const getPostByIdController = async (req, res) => {
    try {
        const result = await (0, spotlight_1.getPostById)(req);
        if (result.success) {
            return res.status(result.statusCode).json({
                success: result.success,
                message:
                    result === null || result === void 0
                        ? void 0
                        : result.message,
                post:
                    (result === null || result === void 0
                        ? void 0
                        : result.post) || null,
            });
        } else {
            return res.status(result.statusCode).json({
                success: result.success,
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
exports.getPostByIdController = getPostByIdController;
const createCommentController = async (req, res) => {
    try {
        const result = await (0, spotlight_1.createComment)(req);
        if (result === null || result === void 0 ? void 0 : result.success) {
            return res.status(result.statusCode).json({
                success: result.success,
                message:
                    result === null || result === void 0
                        ? void 0
                        : result.message,
                comment:
                    (result === null || result === void 0
                        ? void 0
                        : result.comment) || null,
            });
        } else {
            return res.status(result.statusCode).json({
                success: result.success,
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
exports.createCommentController = createCommentController;
const getCommentsController = async (req, res) => {
    try {
        const result = await (0, spotlight_1.getComments)(req);
        if (result === null || result === void 0 ? void 0 : result.success) {
            return res.status(result.statusCode).json({
                success: result.success,
                message:
                    result === null || result === void 0
                        ? void 0
                        : result.message,
                comments:
                    (result === null || result === void 0
                        ? void 0
                        : result.comments) || [],
            });
        } else {
            return res.status(result.statusCode).json({
                success: result.success,
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
exports.getCommentsController = getCommentsController;
const createPostController = async (req, res) => {
    try {
        const result = await (0, spotlight_1.createSpotlightPost)(req);
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
                    post:
                        result === null || result === void 0
                            ? void 0
                            : result.post,
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
exports.createPostController = createPostController;
const createEmploymentVerificationPostController = async (req, res) => {
    try {
        const result = await (0, spotlight_1.createEmploymentVerificationPost)(
            req
        );
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
                    post:
                        result === null || result === void 0
                            ? void 0
                            : result.post,
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
exports.createEmploymentVerificationPostController =
    createEmploymentVerificationPostController;
const toggleLikeController = async (req, res) => {
    try {
        const result = await (0, spotlight_1.toggleLike)(req);
        return res.status(result.statusCode).json({
            success: result.success,
            message:
                result === null || result === void 0 ? void 0 : result.message,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
exports.toggleLikeController = toggleLikeController;
const getPostsByUserIdController = async (req, res) => {
    try {
        const result = await (0, spotlight_1.getPostsByUserId)(req);
        if (result === null || result === void 0 ? void 0 : result.success) {
            return res.status(result.statusCode).json({
                success: result.success,
                message:
                    result === null || result === void 0
                        ? void 0
                        : result.message,
                usersInfo:
                    result === null || result === void 0
                        ? void 0
                        : result.usersInfo,
                posts:
                    (result === null || result === void 0
                        ? void 0
                        : result.posts) || null,
                totalPages:
                    result === null || result === void 0
                        ? void 0
                        : result.totalPages,
                currentPage:
                    result === null || result === void 0
                        ? void 0
                        : result.currentPage,
                totalPosts:
                    result === null || result === void 0
                        ? void 0
                        : result.totalPosts,
            });
        } else {
            return res.status(result.statusCode).json({
                success: result.success,
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
exports.getPostsByUserIdController = getPostsByUserIdController;
const updatePostController = async (req, res) => {
    try {
        const result = await (0, spotlight_1.updateSpotlightPost)(req);
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
                    post:
                        result === null || result === void 0
                            ? void 0
                            : result.post,
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
exports.updatePostController = updatePostController;
const deletePostController = async (req, res) => {
    try {
        const result = await (0, spotlight_service_1.deletePostService)(req);
        if (result === null || result === void 0 ? void 0 : result.success) {
            return res.status(result.statusCode).json({
                success: result.success,
                message:
                    result === null || result === void 0
                        ? void 0
                        : result.message,
                post:
                    result === null || result === void 0 ? void 0 : result.post,
            });
        } else {
            return res.status(result.statusCode).json({
                success: result.success,
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
exports.deletePostController = deletePostController;
const deleteCommentController = async (req, res) => {
    try {
        const result = await (0, spotlight_1.deleteCommentService)(req);
        if (result === null || result === void 0 ? void 0 : result.success) {
            return res.status(result.statusCode).json({
                success: result.success,
                message:
                    result === null || result === void 0
                        ? void 0
                        : result.message,
                comment:
                    result === null || result === void 0
                        ? void 0
                        : result.comment,
            });
        } else {
            return res.status(result.statusCode).json({
                success: result.success,
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
exports.deleteCommentController = deleteCommentController;
const getHashTagsController = async (req, res) => {
    try {
        const result = await (0, spotlight_service_1.getHashtagsService)(req);
        if (result.success) {
            return res.status(result.statusCode).json({
                success: result.success,
                message:
                    result === null || result === void 0
                        ? void 0
                        : result.message,
                hashtags:
                    (result === null || result === void 0
                        ? void 0
                        : result.hashtags) || [],
                totalHashTags:
                    result === null || result === void 0
                        ? void 0
                        : result.totalHashtags,
            });
        } else {
            return res.status(result.statusCode).json({
                success: result.success,
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
exports.getHashTagsController = getHashTagsController;
const hidePostController = async (req, res) => {
    try {
        const result = await (0, spotlight_service_1.hidePostService)(req);
        if (result === null || result === void 0 ? void 0 : result.success) {
            return res.status(result.statusCode).json({
                success: result.success,
                message:
                    result === null || result === void 0
                        ? void 0
                        : result.message,
                post:
                    result === null || result === void 0 ? void 0 : result.post,
            });
        } else {
            return res.status(result.statusCode).json({
                success: result.success,
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
exports.hidePostController = hidePostController;
const unhidePostController = async (req, res) => {
    try {
        const result = await (0, spotlight_service_1.unhidePostService)(req);
        if (result === null || result === void 0 ? void 0 : result.success) {
            return res.status(result.statusCode).json({
                success: result.success,
                message:
                    result === null || result === void 0
                        ? void 0
                        : result.message,
                post:
                    result === null || result === void 0 ? void 0 : result.post,
            });
        } else {
            return res.status(result.statusCode).json({
                success: result.success,
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
exports.unhidePostController = unhidePostController;
const unpinPostController = async (req, res) => {
    try {
        const result = await (0, spotlight_service_1.unpinPostService)(req);
        if (result === null || result === void 0 ? void 0 : result.success) {
            return res.status(result.statusCode).json({
                success: result.success,
                message:
                    result === null || result === void 0
                        ? void 0
                        : result.message,
                post:
                    result === null || result === void 0 ? void 0 : result.post,
            });
        } else {
            return res.status(result.statusCode).json({
                success: result.success,
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
exports.unpinPostController = unpinPostController;
const pinPostController = async (req, res) => {
    try {
        const result = await (0, spotlight_service_1.pinPostService)(req);
        if (result === null || result === void 0 ? void 0 : result.success) {
            return res.status(result.statusCode).json({
                success: result.success,
                message:
                    result === null || result === void 0
                        ? void 0
                        : result.message,
                post:
                    result === null || result === void 0 ? void 0 : result.post,
            });
        } else {
            return res.status(result.statusCode).json({
                success: result.success,
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
exports.pinPostController = pinPostController;
const reportController = async (req, res) => {
    try {
        const result = await (0, spotlight_service_1.reportContent)(req);
        if (result === null || result === void 0 ? void 0 : result.success) {
            return res.status(result.statusCode).json({
                success: result.success,
                message:
                    result === null || result === void 0
                        ? void 0
                        : result.message,
                post:
                    result === null || result === void 0
                        ? void 0
                        : result.reportedPost,
            });
        } else {
            return res.status(result.statusCode).json({
                success: result.success,
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
exports.reportController = reportController;
//# sourceMappingURL=spotlight.controller.js.map
