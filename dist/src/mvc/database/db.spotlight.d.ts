export declare const createPost: (data: any, instituteId: any) => Promise<any>;
export declare const updatePost: (
    data: any,
    postId: any,
    userId: any
) => Promise<any>;
export declare const findAllPosts: (
    consortiumId: any,
    locationType: any,
    page: any,
    limit: any,
    tagName: any,
    userId: any
) => Promise<{
    posts: any;
    totalPages: number;
    currentPage: any;
    totalPosts: any;
}>;
export declare const addComment: (
    postId: any,
    content: any,
    userId: any
) => Promise<any>;
export declare const findComments: (
    postId: any,
    loggedInUser: any,
    page: any,
    limit: any
) => Promise<any>;
export declare const addLike: (
    postId: any,
    userId: any
) => Promise<'Post unliked' | 'Post liked'>;
export declare const getConsortiumid: (instituteId: any) => Promise<any>;
export declare const getDetailedPost: (
    id: any,
    userId: any,
    consortiumId: any,
    locationType: any,
    page?: number,
    limit?: number
) => Promise<{
    morePosts: any;
    mainPosts: any;
}>;
export declare const findPostsByUserId: (
    userId: any,
    postMediaType: any,
    logedInUser: any,
    page?: number,
    limit?: number
) => Promise<{
    usersInfo: any;
    posts: any;
    totalPages: number;
    currentPage: number;
    totalPosts: any;
}>;
export declare const findLikedPost: (postId: any, userId: any) => Promise<any>;
export declare const deletePost: (
    postId: any,
    hashtags: any[],
    deletionReason: any
) => Promise<any>;
export declare const deleteComment: (commentId: any) => Promise<any>;
export declare const getHashtags: (
    limit: any,
    page: any,
    consortiomId: any
) => Promise<{
    hashtags: any;
    total: any;
}>;
export declare const hidePost: (postId: any, userId: any) => Promise<any>;
export declare const unHidePost: (postId: any, userId: any) => Promise<any>;
export declare const pinPost: (postId: any) => Promise<any>;
export declare const unpinPost: (postId: any) => Promise<any>;
export declare const findPost: (id: any) => Promise<any>;
export declare const findComment: (id: any) => Promise<any>;
export declare const reportPost: (data: any) => Promise<any>;
