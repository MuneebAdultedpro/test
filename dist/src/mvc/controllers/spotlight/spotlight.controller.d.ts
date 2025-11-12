import { Request, Response } from 'express';
declare const getInstagramPostsByTagNameController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getPostsByLocationController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getPostByIdController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const createCommentController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getCommentsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const createPostController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const createEmploymentVerificationPostController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const toggleLikeController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getPostsByUserIdController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const updatePostController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const deletePostController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const deleteCommentController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const getHashTagsController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const hidePostController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const unhidePostController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const unpinPostController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const pinPostController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
declare const reportController: (
    req: Request,
    res: Response
) => Promise<Response<any, Record<string, any>>>;
export {
    hidePostController,
    unhidePostController,
    pinPostController,
    reportController,
    unpinPostController,
    getInstagramPostsByTagNameController,
    createPostController,
    updatePostController,
    toggleLikeController,
    getHashTagsController,
    getCommentsController,
    createCommentController,
    getPostsByLocationController,
    getPostByIdController,
    getPostsByUserIdController,
    createEmploymentVerificationPostController,
    deletePostController,
    deleteCommentController,
};
