'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getHashtagsService =
    exports.reportContent =
    exports.unpinPostService =
    exports.pinPostService =
    exports.unhidePostService =
    exports.hidePostService =
    exports.deleteCommentService =
    exports.updateSpotlightPost =
    exports.deletePostService =
    exports.getPostsByUserId =
    exports.toggleLike =
    exports.getComments =
    exports.createComment =
    exports.getPostById =
    exports.getPostsByLocation =
    exports.createEmploymentVerificationPost =
    exports.createSpotlightPost =
    exports.getInstagramPostsByTagName =
        void 0;
const tslib_1 = require('tslib');
const axios_1 = tslib_1.__importDefault(require('axios'));
const db_spotlight_1 = require('../../database/db.spotlight');
const types_1 = require('../../../interfaces/types');
const db_user_1 = require('../../database/db.user');
// this is not used any more , keeping it only if we need to fetch the post from backend in future
const getInstagramPostsByTagName = async (req) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    try {
        const tagName =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.tagName;
        const hashtagIdResponse = await axios_1.default.get(
            `https://graph.facebook.com/v21.0/ig_hashtag_search?user_id=${
                (_b =
                    process === null || process === void 0
                        ? void 0
                        : process.env) === null || _b === void 0
                    ? void 0
                    : _b.INSTAGRAM_USER_ID
            }&q=${tagName}&access_token=${
                (_c =
                    process === null || process === void 0
                        ? void 0
                        : process.env) === null || _c === void 0
                    ? void 0
                    : _c.LONG_TIME_ACCESS_TOKEN
            }`
        );
        const hashtagId =
            (_f =
                (_e =
                    (_d =
                        hashtagIdResponse === null ||
                        hashtagIdResponse === void 0
                            ? void 0
                            : hashtagIdResponse.data) === null || _d === void 0
                        ? void 0
                        : _d.data) === null || _e === void 0
                    ? void 0
                    : _e[0]) === null || _f === void 0
                ? void 0
                : _f.id;
        if (!hashtagId) {
            return {
                success: false,
                statusCode: 400,
                message: 'Failed to fetch tag id',
            };
        }
        const postsResponse = await axios_1.default.get(
            `https://graph.facebook.com/v21.0/${hashtagId}/recent_media?user_id=${
                (_g =
                    process === null || process === void 0
                        ? void 0
                        : process.env) === null || _g === void 0
                    ? void 0
                    : _g.INSTAGRAM_USER_ID
            }&fields=id,caption,media_type,like_count,media_url,timestamp&access_token=${
                (_h =
                    process === null || process === void 0
                        ? void 0
                        : process.env) === null || _h === void 0
                    ? void 0
                    : _h.LONG_TIME_ACCESS_TOKEN
            }`
        );
        return {
            success: true,
            statusCode: 200,
            message: 'Posts retrieved successfully',
            posts:
                (_j =
                    postsResponse === null || postsResponse === void 0
                        ? void 0
                        : postsResponse.data) === null || _j === void 0
                    ? void 0
                    : _j.data,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message:
                (error === null || error === void 0 ? void 0 : error.message) ||
                'Internal Server Error',
        };
    }
};
exports.getInstagramPostsByTagName = getInstagramPostsByTagName;
const createEmploymentVerificationPost = async (req) => {
    const { userId, joinedCompany, postContent, media, instituteId } = req.body;
    try {
        const updatedUser = await (0, db_user_1.findUserByIdAndUpdate)(userId, {
            joinedCompany,
        });
        const newPost = await (0, db_spotlight_1.createPost)(
            {
                userId,
                content:
                    postContent ||
                    `${updatedUser.name} has secured a new job! 🎉`,
                postType: 'employment_verified',
                postLocations: [types_1.PostLocationType.CONSORTIUM],
                media: [
                    {
                        uri: 'https://firebasestorage.googleapis.com/v0/b/just-easy-jobs-50739.appspot.com/o/spotlightMedia%2Femployment-verification-post.png?alt=media&token=7f8d8284-e283-4541-a2de-4e09baa86209',
                        type: 'image/png',
                    },
                ],
                createdAt: new Date(),
            },
            instituteId
        );
        if (newPost) {
            return {
                post: newPost,
                message: 'New post created Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 400,
                message: 'Error Creating post',
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
exports.createEmploymentVerificationPost = createEmploymentVerificationPost;
const createSpotlightPost = async (req) => {
    var _a;
    try {
        const { userId, content, postLocations } =
            req === null || req === void 0 ? void 0 : req.body;
        const instituteId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.instituteId;
        if (!userId || !content) {
            return {
                statusCode: 400,
                success: false,
                message: 'Invalid payload',
            };
        }
        // if (
        //     !postLocations.every((loc) =>
        //         Object.values(PostLocationType).includes(loc)
        //     )
        // ) {
        //     return {
        //         success: false,
        //         statusCode: 400,
        //         message: 'Invalid location type',
        //     };
        // }
        const post = await (0, db_spotlight_1.createPost)(
            req === null || req === void 0 ? void 0 : req.body,
            instituteId
        );
        if (post) {
            return {
                post: post,
                message: 'New post created Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 400,
                message: 'Error Creating post',
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
exports.createSpotlightPost = createSpotlightPost;
const getPostsByLocation = async (req) => {
    var _a, _b, _c, _d, _e, _f;
    try {
        const instituteId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.instituteId;
        const locationType =
            (_b = req === null || req === void 0 ? void 0 : req.query) ===
                null || _b === void 0
                ? void 0
                : _b.locationType;
        const tagName =
            (_c = req === null || req === void 0 ? void 0 : req.query) ===
                null || _c === void 0
                ? void 0
                : _c.tagName;
        const page =
            parseInt(
                (_d = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _d === void 0
                    ? void 0
                    : _d.page
            ) || 1;
        const limit =
            parseInt(
                (_e = req === null || req === void 0 ? void 0 : req.query) ===
                    null || _e === void 0
                    ? void 0
                    : _e.limit
            ) || 10000;
        const userId =
            (_f = req === null || req === void 0 ? void 0 : req.user) ===
                null || _f === void 0
                ? void 0
                : _f.id;
        if (!locationType || !instituteId) {
            return {
                success: false,
                statusCode: 400,
                message: 'Invalid payload',
            };
        }
        const consortiumId = await (0, db_spotlight_1.getConsortiumid)(
            instituteId
        );
        if (!Object.values(types_1.PostLocationType).includes(locationType)) {
            return {
                success: false,
                statusCode: 400,
                message: 'Invalid location type',
            };
        }
        const posts = await (0, db_spotlight_1.findAllPosts)(
            consortiumId,
            locationType,
            page,
            limit,
            tagName,
            userId
        );
        return {
            success: true,
            statusCode: 200,
            posts: posts.posts,
            totalPages: posts.totalPages,
            currentpage: posts.currentPage,
            totalPosts: posts.totalPosts,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.getPostsByLocation = getPostsByLocation;
const getPostById = async (req) => {
    var _a;
    try {
        const { id, page, limit, instituteId, locationType } = req.query;
        const userId =
            (_a = req === null || req === void 0 ? void 0 : req.user) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        if (!id || !instituteId || !locationType) {
            return {
                success: false,
                statusCode: 404,
                message: 'Invalid payload',
            };
        } //need to add the institute id
        const consortiumId = await (0, db_spotlight_1.getConsortiumid)(
            instituteId
        );
        const post = await (0, db_spotlight_1.getDetailedPost)(
            id,
            userId,
            consortiumId,
            locationType,
            page,
            limit
        );
        if (!post)
            return {
                success: true,
                statusCode: 200,
                message: 'Post not found',
            };
        return { success: true, statusCode: 200, post };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
        };
    }
};
exports.getPostById = getPostById;
const createComment = async (req) => {
    try {
        const { postId, content } = req.body;
        const { id } = req.user;
        if (!postId || !content)
            return {
                success: false,
                statusCode: 400,
                message: 'Invalid Payload',
            };
        const comment = await (0, db_spotlight_1.addComment)(
            postId,
            content,
            id
        );
        return {
            success: true,
            statusCode: 200,
            message: 'Comment added',
            comment,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
        };
    }
};
exports.createComment = createComment;
const getComments = async (req) => {
    var _a, _b, _c, _d;
    try {
        const postId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.postId;
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
            ) || 5;
        const loggedInUser =
            (_d = req.user) === null || _d === void 0 ? void 0 : _d.id;
        if (!postId) {
            return {
                success: false,
                statusCode: 400,
                message: 'Please Provide postId',
            };
        }
        const comments = await (0, db_spotlight_1.findComments)(
            postId,
            loggedInUser,
            page,
            limit
        );
        return { success: true, statusCode: 200, comments };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
        };
    }
};
exports.getComments = getComments;
const toggleLike = async (req) => {
    try {
        const { postId } = req.query;
        const { id } = req.user;
        if (!postId || !id) {
            return {
                success: false,
                statusCode: 400,
                message: 'Invalid payload',
            };
        }
        const liked = await (0, db_spotlight_1.addLike)(postId, id);
        return { success: true, statusCode: 200, message: liked };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
        };
    }
};
exports.toggleLike = toggleLike;
const getPostsByUserId = async (req) => {
    var _a, _b, _c, _d, _e;
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
            ) || 5;
        const userId =
            (_c = req === null || req === void 0 ? void 0 : req.query) ===
                null || _c === void 0
                ? void 0
                : _c.userId;
        const postMediaType =
            (_d = req === null || req === void 0 ? void 0 : req.query) ===
                null || _d === void 0
                ? void 0
                : _d.postMediaType;
        const logedInUser =
            (_e = req.user) === null || _e === void 0 ? void 0 : _e.id;
        if (!userId) {
            return {
                success: false,
                statusCode: 400,
                message: 'User ID is required',
            };
        }
        const { usersInfo, posts, totalPages, currentPage, totalPosts } =
            await (0, db_spotlight_1.findPostsByUserId)(
                userId,
                postMediaType,
                logedInUser,
                page,
                limit
            );
        return {
            success: true,
            statusCode: 200,
            usersInfo,
            posts,
            totalPages,
            currentPage,
            totalPosts,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
        };
    }
};
exports.getPostsByUserId = getPostsByUserId;
const deletePostService = async (req) => {
    var _a, _b, _c;
    try {
        const postId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.postId;
        const hashtags =
            (_b = req === null || req === void 0 ? void 0 : req.body) ===
                null || _b === void 0
                ? void 0
                : _b.hashtags;
        const deletionReason =
            (_c = req === null || req === void 0 ? void 0 : req.body) ===
                null || _c === void 0
                ? void 0
                : _c.deletionReason;
        if (!postId) {
            return {
                success: false,
                statusCode: 400,
                message: 'Post Id is required',
            };
        }
        const post = await (0, db_spotlight_1.deletePost)(
            postId,
            hashtags,
            deletionReason
        );
        if (!post) {
            return {
                success: true,
                statusCode: 200,
                post,
                message: 'Post with the given id doesnot exist',
            };
        }
        return {
            success: true,
            statusCode: 200,
            post,
            message: 'Post deleted successfully',
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
        };
    }
};
exports.deletePostService = deletePostService;
const deleteCommentService = async (req) => {
    var _a;
    try {
        const commentId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.commentId;
        if (!commentId) {
            return {
                success: false,
                statusCode: 400,
                message: 'Comment Id is required',
            };
        }
        const comment = await (0, db_spotlight_1.deleteComment)(commentId);
        if (!comment) {
            return {
                success: true,
                statusCode: 200,
                comment,
                message: 'Comment with the given id doesnot exist',
            };
        }
        return {
            success: true,
            statusCode: 200,
            comment,
            message: 'Comment deleted successfully',
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
        };
    }
};
exports.deleteCommentService = deleteCommentService;
const updateSpotlightPost = async (req) => {
    var _a, _b;
    try {
        const postId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.id;
        const userId =
            (_b = req === null || req === void 0 ? void 0 : req.user) ===
                null || _b === void 0
                ? void 0
                : _b.id;
        if (!postId) {
            return {
                success: false,
                statusCode: 404,
                message: 'postId is required',
            };
        }
        const post = await (0, db_spotlight_1.updatePost)(
            req === null || req === void 0 ? void 0 : req.body,
            postId,
            userId
        );
        if (post) {
            return {
                post: post,
                message: 'Post updated Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 400,
                message: 'Error updating post',
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
exports.updateSpotlightPost = updateSpotlightPost;
const getHashtagsService = async (req) => {
    try {
        const limit = parseInt(req.query.limit) || 25;
        const page = parseInt(req.query.page) || 1;
        const instituteId = req.query.instituteId;
        const consortiumId = await (0, db_spotlight_1.getConsortiumid)(
            instituteId
        );
        const { hashtags, total } = await (0, db_spotlight_1.getHashtags)(
            limit,
            page,
            consortiumId
        );
        if (
            hashtags === null || hashtags === void 0 ? void 0 : hashtags.length
        ) {
            return {
                hashtags,
                totalHashtags: total,
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: true,
                statusCode: 200,
                message: 'No Hashtag found',
                hashtags,
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
exports.getHashtagsService = getHashtagsService;
const hidePostService = async (req) => {
    var _a, _b;
    try {
        const postId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.postId;
        const userId =
            (_b = req === null || req === void 0 ? void 0 : req.user) ===
                null || _b === void 0
                ? void 0
                : _b.id;
        if (!postId || !userId) {
            return {
                success: false,
                statusCode: 400,
                message: 'Invalid Payload',
            };
        }
        const post = await (0, db_spotlight_1.hidePost)(postId, userId);
        if (!post) {
            return {
                success: true,
                statusCode: 200,
                post,
                message: 'Post with the given id doesnot exist',
            };
        }
        return {
            success: true,
            statusCode: 200,
            post,
            message: 'Post hided',
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
        };
    }
};
exports.hidePostService = hidePostService;
const unhidePostService = async (req) => {
    var _a, _b;
    try {
        const postId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.postId;
        const userId =
            (_b = req === null || req === void 0 ? void 0 : req.user) ===
                null || _b === void 0
                ? void 0
                : _b.id;
        if (!postId || !userId) {
            return {
                success: false,
                statusCode: 400,
                message: 'Invalid Payload',
            };
        }
        const post = await (0, db_spotlight_1.unHidePost)(postId, userId);
        if (!post) {
            return {
                success: true,
                statusCode: 200,
                post,
                message: 'Post with the given id doesnot exist',
            };
        }
        return {
            success: true,
            statusCode: 200,
            post,
            message: 'Post Viewed',
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
        };
    }
};
exports.unhidePostService = unhidePostService;
const pinPostService = async (req) => {
    var _a;
    try {
        const postId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.postId;
        if (!postId) {
            return {
                success: false,
                statusCode: 400,
                message: 'Invalid Payload',
            };
        }
        const post = await (0, db_spotlight_1.pinPost)(postId);
        if (!post) {
            return {
                success: true,
                statusCode: 200,
                post,
                message: 'Post with the given id doesnot exist',
            };
        }
        return {
            success: true,
            statusCode: 200,
            post,
            message: 'Post Pinned',
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
        };
    }
};
exports.pinPostService = pinPostService;
const unpinPostService = async (req) => {
    var _a;
    try {
        const postId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.postId;
        if (!postId) {
            return {
                success: false,
                statusCode: 400,
                message: 'Invalid Payload',
            };
        }
        const post = await (0, db_spotlight_1.unpinPost)(postId);
        if (!post) {
            return {
                success: true,
                statusCode: 200,
                post,
                message: 'Post with the given id doesnot exist',
            };
        }
        return {
            success: true,
            statusCode: 200,
            post,
            message: 'Post unpinned',
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
        };
    }
};
exports.unpinPostService = unpinPostService;
const reportContent = async (req) => {
    var _a, _b, _c, _d;
    try {
        const type =
            (_a = req === null || req === void 0 ? void 0 : req.body) ===
                null || _a === void 0
                ? void 0
                : _a.type;
        const id =
            (_b = req === null || req === void 0 ? void 0 : req.body) ===
                null || _b === void 0
                ? void 0
                : _b.id;
        const reason =
            (_c = req === null || req === void 0 ? void 0 : req.body) ===
                null || _c === void 0
                ? void 0
                : _c.reason;
        const userId =
            (_d = req === null || req === void 0 ? void 0 : req.user) ===
                null || _d === void 0
                ? void 0
                : _d.id;
        const reportData = {
            reportedBy: userId,
            reason,
            type,
        };
        if (type.toLowerCase() == types_1.SpotlightTypes.POST.toLowerCase()) {
            reportData.postId = id;
            const postExist = await (0, db_spotlight_1.findPost)(id);
            if (!postExist) {
                return {
                    success: false,
                    statusCode: 400,
                    message: 'post with the given id doesnot exist',
                };
            }
        } else if (type === types_1.SpotlightTypes.COMMENT.toLowerCase()) {
            reportData.commentId = id;
            const commentExist = await (0, db_spotlight_1.findComment)(id);
            if (!commentExist) {
                return {
                    success: false,
                    statusCode: 400,
                    message: 'Comment with the given id doesnot exist',
                };
            }
        }
        const reportedPost = await (0, db_spotlight_1.reportPost)(reportData);
        if (!reportedPost) {
            return {
                success: false,
                statusCode: 400,
                message: `error reporting ${
                    type === types_1.SpotlightTypes.COMMENT ? 'Comment' : 'Post'
                }`,
            };
        }
        return {
            success: true,
            statusCode: 200,
            reportedPost,
            message: `${
                type === types_1.SpotlightTypes.COMMENT ? 'Comment' : 'Post'
            } reported successfully`,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
        };
    }
};
exports.reportContent = reportContent;
//# sourceMappingURL=spotlight.service.js.map
