'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.reportPost =
    exports.findComment =
    exports.findPost =
    exports.unpinPost =
    exports.pinPost =
    exports.unHidePost =
    exports.hidePost =
    exports.getHashtags =
    exports.deleteComment =
    exports.deletePost =
    exports.findLikedPost =
    exports.findPostsByUserId =
    exports.getDetailedPost =
    exports.getConsortiumid =
    exports.addLike =
    exports.findComments =
    exports.addComment =
    exports.findAllPosts =
    exports.updatePost =
    exports.createPost =
        void 0;
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const models_1 = require('../models');
const createPost = async (data, instituteId) => {
    try {
        const institute = await models_1.Institute.findById(instituteId);
        if (!institute) {
            throw new Error(`Institute with ID ${instituteId} not found`);
        }
        const postData = Object.assign(Object.assign({}, data), {
            consortiumId: institute.consortiom_id,
        });
        const { hashtags = [] } = postData;
        const post = new models_1.SpotlightPost(postData);
        await Promise.all([
            post.save(),
            createHashtag(hashtags, institute.consortiom_id),
        ]);
        return post.save();
    } catch (error) {
        throw new Error(
            `Error Creating Post: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.createPost = createPost;
const updatePost = async (data, postId, userId) => {
    try {
        const existingPost = await models_1.SpotlightPost.findById(postId);
        if (!existingPost) {
            throw new Error('Post not found');
        }
        const oldHashtags = new Set(existingPost.hashtags || []);
        const newHashtags = new Set(data.hashtags || []);
        const added = [...newHashtags].filter((tag) => !oldHashtags.has(tag));
        const removed = [...oldHashtags].filter((tag) => !newHashtags.has(tag));
        if (added.length > 0) {
            const existing = await models_1.SpotLightHashtags.find({
                name: { $in: added },
            });
            const existingNames = new Set(existing.map((tag) => tag.name));
            const toIncrement = [...added].filter((tag) =>
                existingNames.has(tag)
            );
            const toInsert = [...added].filter(
                (tag) => !existingNames.has(tag)
            );
            if (toIncrement.length > 0) {
                await models_1.SpotLightHashtags.bulkWrite(
                    toIncrement.map((tag) => ({
                        updateOne: {
                            filter: { name: tag },
                            update: { $inc: { postCount: 1 } },
                        },
                    }))
                );
            }
            if (toInsert.length > 0) {
                await models_1.SpotLightHashtags.insertMany(
                    toInsert.map((tag) => ({
                        name: tag,
                        postCount: 1,
                        consortiumId:
                            existingPost === null || existingPost === void 0
                                ? void 0
                                : existingPost.consortiumId,
                    }))
                );
            }
        }
        if (removed.length > 0) {
            const existingRemoved = await models_1.SpotLightHashtags.find({
                name: { $in: removed },
            });
            const toDecrement = [];
            const toDelete = [];
            for (const tag of existingRemoved) {
                if (tag.postCount <= 1) {
                    toDelete.push(tag.name);
                } else {
                    toDecrement.push(tag.name);
                }
            }
            if (toDecrement.length > 0) {
                await models_1.SpotLightHashtags.bulkWrite(
                    toDecrement.map((tag) => ({
                        updateOne: {
                            filter: { name: tag },
                            update: { $inc: { postCount: -1 } },
                        },
                    }))
                );
            }
            if (toDelete.length > 0) {
                await models_1.SpotLightHashtags.deleteMany({
                    name: { $in: toDelete },
                });
            }
        }
        const updatedDocument = await models_1.SpotlightPost.findByIdAndUpdate(
            postId,
            data,
            { new: true }
        );
        if (!updatedDocument) {
            throw new Error('Post not found or could not be updated');
        }
        const result = await models_1.SpotlightPost.aggregate([
            { $match: { _id: updatedDocument._id } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'UsersData',
                },
            },
            {
                $unwind: {
                    path: '$UsersData',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'spotlight-likes',
                    let: { postId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$postId', '$$postId'] },
                                        { $eq: ['$userId', userId] },
                                    ],
                                },
                            },
                        },
                        { $limit: 1 },
                    ],
                    as: 'likeData',
                },
            },
            {
                $addFields: {
                    isLiked: { $gt: [{ $size: '$likeData' }, 0] },
                },
            },
            {
                $addFields: {
                    'UsersData.id': '$UsersData._id',
                },
            },
            {
                $project: {
                    _id: 1,
                    content: 1,
                    media: 1,
                    commentsCount: 1,
                    likesCount: 1,
                    createdAt: 1,
                    postLocations: 1,
                    consortiumId: 1,
                    hashtags: 1,
                    isLiked: 1,
                    'UsersData.id': 1,
                    'UsersData.name': 1,
                    'UsersData.email': 1,
                    'UsersData.role': 1,
                    'UsersData._id': 1,
                    'UsersData.bio': 1,
                    'UsersData.tag_line': 1,
                    'UsersData.photo_url': 1,
                },
            },
        ]);
        const formattedUpdatedPost =
            result === null || result === void 0 ? void 0 : result[0];
        return formattedUpdatedPost;
    } catch (error) {
        throw new Error(`Error updating post: ${error.message}`);
    }
};
exports.updatePost = updatePost;
const findAllPosts = async (
    consortiumId,
    locationType,
    page,
    limit,
    tagName,
    userId
) => {
    try {
        const reportedPosts = await models_1.SpotLightReport.find({
            reportedBy: new mongoose_1.default.Types.ObjectId(userId),
            postId: { $ne: null },
        }).select('postId');
        const reportedPostIds = reportedPosts
            .map((r) => r.postId)
            .filter(Boolean)
            .map((id) => new mongoose_1.default.Types.ObjectId(id));
        const query = {
            postLocations: locationType,
            consortiumId: new mongoose_1.default.Types.ObjectId(consortiumId),
            isDeleted: false,
            hiddenByUserIds: {
                $ne: new mongoose_1.default.Types.ObjectId(userId),
            },
            _id: { $nin: reportedPostIds },
        };
        const skip = (page - 1) * limit;
        if (tagName) {
            query.hashtags = tagName;
        }
        const posts = await models_1.SpotlightPost.find(query)
            .sort({ pinnedByOwner: -1, createdAt: -1 })
            .skip(skip)
            .limit(limit);
        const totalPosts = await models_1.SpotlightPost.countDocuments(query);
        return {
            posts: posts || [],
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: page,
            totalPosts,
        };
    } catch (error) {
        throw new Error(
            `Error Fetching Posts: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findAllPosts = findAllPosts;
const addComment = async (postId, content, userId) => {
    try {
        const comment = new models_1.SpotLightComment({
            postId,
            userId,
            content,
        });
        await comment.save();
        await models_1.SpotlightPost.findByIdAndUpdate(postId, {
            $inc: { commentsCount: 1 },
        });
        return comment;
    } catch (error) {
        throw new Error(
            `Error Fetching Message: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.addComment = addComment;
const findComments = async (postId, loggedInUser, page, limit) => {
    try {
        const reportedComments = await models_1.SpotLightReport.find({
            reportedBy: new mongoose_1.default.Types.ObjectId(loggedInUser),
            commentId: { $ne: null },
        });
        const reportedCommentIds = reportedComments
            .map((r) => r.commentId)
            .filter(Boolean)
            .map((id) => new mongoose_1.default.Types.ObjectId(id));
        const comments = await models_1.SpotLightComment.find({
            postId: new mongoose_1.default.Types.ObjectId(postId),
            _id: { $nin: reportedCommentIds },
        })
            .populate('userId', 'name email photo_url')
            .sort({ createdAt: -1 })
            .skip((parseInt(page) - 1) * parseInt(limit))
            .limit(parseInt(limit));
        return comments;
    } catch (error) {
        throw new Error(
            `Error Fetching Message: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findComments = findComments;
const addLike = async (postId, userId) => {
    try {
        const existingLike = await models_1.SpotLightLike.findOneAndDelete({
            postId,
            userId,
        });
        if (existingLike) {
            await models_1.SpotlightPost.findByIdAndUpdate(postId, {
                $inc: { likesCount: -1 },
            });
            return 'Post unliked';
        } else {
            const like = new models_1.SpotLightLike({ postId, userId });
            await like.save();
            await models_1.SpotlightPost.findByIdAndUpdate(postId, {
                $inc: { likesCount: 1 },
            });
            return 'Post liked';
        }
    } catch (error) {
        throw new Error(
            `Error Fetching Message: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.addLike = addLike;
const getConsortiumid = async (instituteId) => {
    try {
        const consortiumId = await models_1.Institute.findOne({
            _id: instituteId,
        }).select('consortiom_id');
        return consortiumId === null || consortiumId === void 0
            ? void 0
            : consortiumId.consortiom_id;
    } catch (error) {
        throw new Error(
            `Error Fetching consortium: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.getConsortiumid = getConsortiumid;
const getDetailedPost = async (
    id,
    userId,
    consortiumId,
    locationType,
    page = 1,
    limit = 10
) => {
    var _a, _b, _c, _d, _e;
    try {
        const objectId = new mongoose_1.default.Types.ObjectId(id);
        const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
        const skip = (page - 1) * limit;
        const reportedPosts = await models_1.SpotLightReport.find({
            reportedBy: new mongoose_1.default.Types.ObjectId(userId),
            postId: { $ne: null },
        }).select('postId');
        let reportedPostIds = reportedPosts
            .map((r) => r.postId)
            .filter(Boolean)
            .map((id) => new mongoose_1.default.Types.ObjectId(id));
        reportedPostIds = [...reportedPostIds];
        // objectId
        const morePostsPipeline = [
            {
                // need to add the which locationtype you want to get from front end
                $match: {
                    _id: { $nin: reportedPostIds },
                    postLocations: locationType,
                    isDeleted: false,
                    hiddenByUserIds: {
                        $ne: new mongoose_1.default.Types.ObjectId(userId),
                    },
                    consortiumId: new mongoose_1.default.Types.ObjectId(
                        consortiumId
                    ),
                },
            },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'UsersData',
                },
            },
            {
                $unwind: {
                    path: '$UsersData',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'spotlight-likes',
                    let: { postId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ['$postId', '$$postId'],
                                        },
                                        {
                                            $eq: ['$userId', userObjectId],
                                        },
                                    ],
                                },
                            },
                        },
                        { $limit: 1 },
                    ],
                    as: 'likeData',
                },
            },
            {
                $addFields: {
                    isLiked: { $gt: [{ $size: '$likeData' }, 0] },
                },
            },
            {
                $project: {
                    // likeData: 0,
                    // 'UsersData.password': 0,
                    _id: 1,
                    content: 1,
                    media: 1,
                    commentsCount: 1,
                    likesCount: 1,
                    createdAt: 1,
                    postLocations: 1,
                    consortiumId: 1,
                    hashtags: 1,
                    isLiked: 1,
                    createdBy: 1,
                    'UsersData.name': 1,
                    'UsersData.email': 1,
                    'UsersData.role': 1,
                    'UsersData._id': 1,
                    'UsersData.bio': 1,
                    'UsersData.tag_line': 1,
                    'UsersData.photo_url': 1,
                },
            },
        ];
        const mainPostPipeline = [
            {
                $match: {
                    $and: [
                        { _id: new mongoose_1.default.Types.ObjectId(id) },
                        { _id: { $nin: reportedPostIds } },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'UsersData',
                },
            },
            {
                $unwind: {
                    path: '$UsersData',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    // to check whether the currentuser liked the post or not
                    from: 'spotlight-likes',
                    localField: '_id',
                    foreignField: 'postId',
                    let: { postId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ['$postId', '$$postId'],
                                        },
                                        {
                                            $eq: [
                                                '$userId',
                                                new mongoose_1.default.Types.ObjectId(
                                                    userId
                                                ),
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                        { $limit: 1 },
                    ],
                    as: 'likeData',
                },
            },
            {
                $addFields: {
                    isLiked: { $gt: [{ $size: '$likeData' }, 0] },
                },
            },
            {
                $project: {
                    likeData: 0,
                },
            },
            {
                $project: {
                    _id: 1,
                    content: 1,
                    media: 1,
                    commentsCount: 1,
                    likesCount: 1,
                    consortiumId: 1,
                    postLocations: 1,
                    hashtags: 1,
                    createdAt: 1,
                    isLiked: 1,
                    createdBy: 1,
                    'UsersData.name': 1,
                    'UsersData.email': 1,
                    'UsersData.role': 1,
                    'UsersData._id': 1,
                    'UsersData.bio': 1,
                    'UsersData.tag_line': 1,
                    'UsersData.photo_url': 1,
                },
            },
        ];
        const facet = {
            morePosts: morePostsPipeline,
        };
        if (page === 1) {
            facet.mainPost = mainPostPipeline;
        }
        const result = await models_1.SpotlightPost.aggregate([
            {
                $facet: facet,
            },
        ]);
        return {
            morePosts:
                (_a = result[0]) === null || _a === void 0
                    ? void 0
                    : _a.morePosts,
            mainPosts:
                page == 1
                    ? ((_b = result[0]) === null || _b === void 0
                          ? void 0
                          : _b.mainPost[0]) &&
                      Object.keys(
                          (_c = result[0]) === null || _c === void 0
                              ? void 0
                              : _c.mainPost[0]
                      ).length > 0
                        ? (_d = result[0]) === null || _d === void 0
                            ? void 0
                            : _d.mainPost[0]
                        : (_e = result[0]) === null || _e === void 0
                        ? void 0
                        : _e.morePosts[0]
                    : {},
        };
    } catch (error) {
        throw new Error(
            `Error Fetching Post: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.getDetailedPost = getDetailedPost;
// user profile with there posts
const findPostsByUserId = async (
    userId,
    postMediaType,
    logedInUser,
    page = 1,
    limit = 10
) => {
    try {
        const skip = (page - 1) * limit;
        const usersInfo = await models_1.User.findOne({ _id: userId }).select(
            'name email role photo_url tag_line bio'
        );
        const userObjectId = new mongoose_1.default.Types.ObjectId(logedInUser);
        const reportedPosts = await models_1.SpotLightReport.find({
            reportedBy: new mongoose_1.default.Types.ObjectId(logedInUser),
            postId: { $ne: null },
        }).select('postId');
        let reportedPostIds = reportedPosts
            .map((r) => r.postId)
            .filter(Boolean)
            .map((id) => new mongoose_1.default.Types.ObjectId(id));
        const matchQuery = {
            _id: { $nin: reportedPostIds },
            isDeleted: false,
            userId: new mongoose_1.default.Types.ObjectId(userId),
        };
        if (postMediaType !== 'All') {
            matchQuery.postMediaType = postMediaType;
        }
        const posts = await models_1.SpotlightPost.aggregate([
            {
                $match: matchQuery,
            },
            { $sort: { pinnedByOwner: -1, createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    from: 'spotlight-likes',
                    let: { postId: '$_id', userId: userObjectId },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$postId', '$$postId'] },
                                        { $eq: ['$userId', '$$userId'] },
                                    ],
                                },
                            },
                        },
                        { $limit: 1 },
                    ],
                    as: 'likeData',
                },
            },
            {
                $addFields: {
                    isLiked: { $gt: [{ $size: '$likeData' }, 0] },
                },
            },
            // {
            //     $lookup: {
            //         from: 'spotlight-likes',
            //         let: { postId: '$_id' },
            //         pipeline: [
            //             {
            //                 $match: {
            //                     $expr: {
            //                         $eq: ['$postId', '$$postId'],
            //                     },
            //                 },
            //             },
            //         ],
            //         as: 'likeData',
            //     },
            // },
            // {
            //     $addFields: {
            //         isLiked: {
            //             $gt: [
            //                 {
            //                     $size: {
            //                         $filter: {
            //                             input: '$likeData',
            //                             as: 'like',
            //                             cond: {
            //                                 $eq: [
            //                                     '$$like.userId',
            //                                     { $literal: userObjectId },
            //                                 ],
            //                             },
            //                         },
            //                     },
            //                 },
            //                 0,
            //             ],
            //         },
            //     },
            // },
            {
                $project: {
                    likeData: 1,
                    commentsData: 1,
                    isLiked: 1,
                    content: 1,
                    media: 1,
                    hashtags: 1,
                    postLocations: 1,
                    createdAt: 1,
                    likesCount: 1,
                    commentsCount: 1,
                    pinnedByOwner: 1,
                },
            },
        ]);
        const totalPosts = await models_1.SpotlightPost.countDocuments({
            userId,
            isDeleted: false,
        });
        return {
            usersInfo,
            posts,
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: page,
            totalPosts,
        };
    } catch (error) {
        throw new Error(
            `Error Fetching Message: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findPostsByUserId = findPostsByUserId;
const findLikedPost = async (postId, userId) => {
    try {
        const like = models_1.SpotLightLike.findOne({ postId, userId });
        return like;
    } catch (error) {
        throw new Error(
            `Error Fetching Message: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findLikedPost = findLikedPost;
const createHashtag = async (newHashTag, consortiom_id) => {
    var _a;
    try {
        const existingHashtags = await models_1.SpotLightHashtags.find({
            name: { $in: newHashTag },
        });
        const existingHashtagNames = new Set(
            existingHashtags.map((h) => h.name)
        );
        const bulkOperations = existingHashtags.map((h) => ({
            updateOne: {
                filter: { name: h.name },
                update: { $inc: { postCount: 1 } },
            },
        }));
        const newHashtags =
            (_a =
                newHashTag === null || newHashTag === void 0
                    ? void 0
                    : newHashTag.filter(
                          (tag) => !existingHashtagNames.has(tag)
                      )) === null || _a === void 0
                ? void 0
                : _a.map((tag) => ({
                      name: tag,
                      postCount: 1,
                      consortiumId: consortiom_id,
                  }));
        await Promise.all([
            newHashtags.length > 0
                ? models_1.SpotLightHashtags.insertMany(newHashtags)
                : null,
            bulkOperations.length > 0
                ? models_1.SpotLightHashtags.bulkWrite(bulkOperations)
                : null,
        ]);
    } catch (error) {
        throw new Error(
            `Error Fetching Message: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
const deletePost = async (postId, hashtags = [], deletionReason) => {
    try {
        const deletedPost = await models_1.SpotlightPost.findByIdAndUpdate(
            postId,
            {
                isDeleted: true,
                deletionReason: deletionReason,
            },
            { new: true }
        );
        if (!deletedPost) {
            throw new Error('Post not found');
        }
        const tagsToUpdate = Array.isArray(hashtags)
            ? hashtags
            : Array.isArray(deletedPost.hashtags)
            ? deletedPost.hashtags
            : [];
        if (tagsToUpdate.length === 0) return;
        const existingTags = await models_1.SpotLightHashtags.find({
            name: { $in: tagsToUpdate },
        });
        const bulkDecrementOps = [];
        const tagsToDelete = [];
        for (const tag of existingTags) {
            if (tag.postCount <= 1) {
                tagsToDelete.push(tag.name);
            } else {
                bulkDecrementOps.push({
                    updateOne: {
                        filter: { name: tag.name },
                        update: { $inc: { postCount: -1 } },
                    },
                });
            }
        }
        await Promise.all([
            bulkDecrementOps.length > 0
                ? models_1.SpotLightHashtags.bulkWrite(bulkDecrementOps)
                : null,
            tagsToDelete.length > 0
                ? models_1.SpotLightHashtags.deleteMany({
                      name: { $in: tagsToDelete },
                  })
                : null,
        ]);
        return deletedPost;
    } catch (error) {
        throw new Error(
            `Error Deleting Post: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.deletePost = deletePost;
const deleteComment = async (commentId) => {
    try {
        const comment = await models_1.SpotLightComment.findById(commentId);
        if (!comment) {
            throw new Error('Comment not found');
        }
        const postId = comment.postId;
        await models_1.SpotLightComment.deleteOne({ _id: commentId });
        await models_1.SpotlightPost.findByIdAndUpdate(
            postId,
            { $inc: { commentsCount: -1 } },
            { new: true }
        );
        return comment;
    } catch (error) {
        throw new Error(
            `Error deleting comment: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.deleteComment = deleteComment;
const getHashtags = async (limit, page, consortiomId) => {
    try {
        const hashtags = await models_1.SpotLightHashtags.find({
            consortiumId: consortiomId,
        })
            .sort({ postCount: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        const total = await models_1.SpotLightHashtags.countDocuments();
        return { hashtags, total };
    } catch (error) {
        throw new Error(
            `Error fetching hashtags: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.getHashtags = getHashtags;
const hidePost = async (postId, userId) => {
    try {
        return models_1.SpotlightPost.findByIdAndUpdate(
            postId,
            { $addToSet: { hiddenByUserIds: userId } },
            { new: true }
        );
    } catch (error) {
        throw new Error(
            `Error hidding post: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.hidePost = hidePost;
const unHidePost = async (postId, userId) => {
    try {
        return models_1.SpotlightPost.findByIdAndUpdate(
            postId,
            { $pull: { hiddenByUserIds: userId } },
            { new: true }
        );
    } catch (error) {
        throw new Error(
            `Error unhidding post: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.unHidePost = unHidePost;
const pinPost = async (postId) => {
    try {
        return models_1.SpotlightPost.findByIdAndUpdate(
            postId,
            { pinnedByOwner: true },
            { new: true }
        );
    } catch (error) {
        throw new Error(
            `Error pinning post: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.pinPost = pinPost;
const unpinPost = async (postId) => {
    try {
        return models_1.SpotlightPost.findByIdAndUpdate(
            postId,
            { pinnedByOwner: false },
            { new: true }
        );
    } catch (error) {
        throw new Error(
            `Error unpinning post: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.unpinPost = unpinPost;
const findPost = async (id) => {
    return models_1.SpotlightPost.findOne({ _id: id });
};
exports.findPost = findPost;
const findComment = async (id) => {
    return models_1.SpotLightComment.findOne({ _id: id });
};
exports.findComment = findComment;
const reportPost = async (data) => {
    try {
        const reportData = new models_1.SpotLightReport(data);
        return reportData.save();
    } catch (error) {
        throw new Error(
            `Error reporting post: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.reportPost = reportPost;
//# sourceMappingURL=db.spotlight.js.map
