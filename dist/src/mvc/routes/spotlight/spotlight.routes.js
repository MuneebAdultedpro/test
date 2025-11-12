'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const index_1 = require('../../controllers/index');
const routes_strings_1 = require('../routes-strings');
const middlewares_1 = require('../../middlewares');
const router = express_1.default.Router();
// this is not used any more , keeping it only if we need to fetch the post from backend in future
// router.get(
//     spotlightRoutes?.posts,
//     auth,
//     spotlightController?.getInstagramPostsByTagNameController
// );
router.get(
    routes_strings_1.spotlightRoutes.posts,
    middlewares_1.auth,
    index_1.spotlightController.getPostsByLocationController
);
router.get(
    routes_strings_1.spotlightRoutes.getPostByPostId,
    middlewares_1.auth,
    index_1.spotlightController.getPostByIdController
);
router.post(
    routes_strings_1.spotlightRoutes.createComment,
    middlewares_1.auth,
    index_1.spotlightController.createCommentController
);
router.get(
    routes_strings_1.spotlightRoutes.getAllComments,
    middlewares_1.auth,
    index_1.spotlightController.getCommentsController
);
router.delete(
    routes_strings_1.spotlightRoutes.deleteComment,
    middlewares_1.auth,
    index_1.spotlightController.deleteCommentController
);
router.get(
    routes_strings_1.spotlightRoutes.getHashTag,
    middlewares_1.auth,
    index_1.spotlightController.getHashTagsController
);
router.post(
    routes_strings_1.spotlightRoutes.toggleLike,
    middlewares_1.auth,
    index_1.spotlightController.toggleLikeController
);
router.get(
    routes_strings_1.spotlightRoutes.postByuserId,
    middlewares_1.auth,
    index_1.spotlightController.getPostsByUserIdController
);
router.delete(
    routes_strings_1.spotlightRoutes.delete,
    middlewares_1.auth,
    index_1.spotlightController.deletePostController
);
router.post(
    routes_strings_1.spotlightRoutes === null ||
        routes_strings_1.spotlightRoutes === void 0
        ? void 0
        : routes_strings_1.spotlightRoutes.createPost,
    middlewares_1.auth,
    index_1.spotlightController === null ||
        index_1.spotlightController === void 0
        ? void 0
        : index_1.spotlightController.createPostController
);
router.post(
    routes_strings_1.spotlightRoutes === null ||
        routes_strings_1.spotlightRoutes === void 0
        ? void 0
        : routes_strings_1.spotlightRoutes.employmentVerification,
    middlewares_1.auth,
    index_1.spotlightController === null ||
        index_1.spotlightController === void 0
        ? void 0
        : index_1.spotlightController.createEmploymentVerificationPostController
);
router.post(
    routes_strings_1.spotlightRoutes === null ||
        routes_strings_1.spotlightRoutes === void 0
        ? void 0
        : routes_strings_1.spotlightRoutes.reportPost,
    middlewares_1.auth,
    index_1.spotlightController === null ||
        index_1.spotlightController === void 0
        ? void 0
        : index_1.spotlightController.reportController
);
router.patch(
    routes_strings_1.spotlightRoutes === null ||
        routes_strings_1.spotlightRoutes === void 0
        ? void 0
        : routes_strings_1.spotlightRoutes.updatePost,
    middlewares_1.auth,
    index_1.spotlightController === null ||
        index_1.spotlightController === void 0
        ? void 0
        : index_1.spotlightController.updatePostController
);
router.get(
    routes_strings_1.spotlightRoutes.hidePost,
    middlewares_1.auth,
    index_1.spotlightController.hidePostController
);
router.get(
    routes_strings_1.spotlightRoutes.unhidePost,
    middlewares_1.auth,
    index_1.spotlightController.unhidePostController
);
router.get(
    routes_strings_1.spotlightRoutes.pinPost,
    middlewares_1.auth,
    index_1.spotlightController.pinPostController
);
router.get(
    routes_strings_1.spotlightRoutes.unPinPost,
    middlewares_1.auth,
    index_1.spotlightController.unpinPostController
);
exports.default = router;
//# sourceMappingURL=spotlight.routes.js.map
