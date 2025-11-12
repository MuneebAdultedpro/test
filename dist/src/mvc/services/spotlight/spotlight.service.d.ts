declare const getInstagramPostsByTagName: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          posts: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          posts?: undefined;
      }
>;
declare const createEmploymentVerificationPost: (req: any) => Promise<
    | {
          post: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          post?: undefined;
      }
>;
declare const createSpotlightPost: (req: any) => Promise<
    | {
          post: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          post?: undefined;
      }
>;
declare const getPostsByLocation: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          posts: any;
          totalPages: any;
          currentpage: any;
          totalPosts: any;
          message?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          posts?: undefined;
          totalPages?: undefined;
          currentpage?: undefined;
          totalPosts?: undefined;
      }
>;
declare const getPostById: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          post?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          post: any;
          message?: undefined;
      }
>;
declare const createComment: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          comment?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          message: string;
          comment: any;
      }
>;
declare const getComments: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          comments?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          comments: any;
          message?: undefined;
      }
>;
declare const toggleLike: (req: any) => Promise<{
    success: boolean;
    statusCode: number;
    message: any;
}>;
declare const getPostsByUserId: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          usersInfo?: undefined;
          posts?: undefined;
          totalPages?: undefined;
          currentPage?: undefined;
          totalPosts?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          usersInfo: any;
          posts: any;
          totalPages: any;
          currentPage: any;
          totalPosts: any;
          message?: undefined;
      }
>;
declare const deletePostService: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          post?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          post: any;
          message: string;
      }
>;
declare const deleteCommentService: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          comment?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          comment: any;
          message: string;
      }
>;
declare const updateSpotlightPost: (req: any) => Promise<
    | {
          post: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          post?: undefined;
      }
>;
declare const getHashtagsService: (req: any) => Promise<
    | {
          hashtags: any;
          totalHashtags: any;
          statusCode: number;
          success: boolean;
          message?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          message: string;
          hashtags: any;
          totalHashtags?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          hashtags?: undefined;
          totalHashtags?: undefined;
      }
>;
declare const hidePostService: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          post?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          post: any;
          message: string;
      }
>;
declare const unhidePostService: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          post?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          post: any;
          message: string;
      }
>;
declare const pinPostService: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          post?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          post: any;
          message: string;
      }
>;
declare const unpinPostService: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          post?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          post: any;
          message: string;
      }
>;
declare const reportContent: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          reportedPost?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          reportedPost: any;
          message: string;
      }
>;
export {
    getInstagramPostsByTagName,
    createSpotlightPost,
    createEmploymentVerificationPost,
    getPostsByLocation,
    getPostById,
    createComment,
    getComments,
    toggleLike,
    getPostsByUserId,
    deletePostService,
    updateSpotlightPost,
    deleteCommentService,
    hidePostService,
    unhidePostService,
    pinPostService,
    unpinPostService,
    reportContent,
    getHashtagsService,
};
