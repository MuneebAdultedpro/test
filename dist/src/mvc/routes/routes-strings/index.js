'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.studentRoutes = exports.userRoutes = exports.baseRoutes = void 0;
exports.baseRoutes = {
    userBase: '/api/user',
    commonBase: '/api/common',
};
exports.userRoutes = {
    auth: '/api/auth',
    login: '/login',
    loginWithDeviceSignature: '/loginWithDeviceSignature',
    register: '/register',
    pusherAuth: '/pusher-auth',
    profile: '/profile',
    update: '/update',
    sendNotification: '/send-notification',
    postfcmToken: '/post-fcm-token',
    userById: '/user-by-id',
    userByEmail: '/user-by-email',
    createUser: '/create-user',
};
exports.studentRoutes = {
    postfcmToken: '/post-fcm-token',
    user: '/get-user',
    allUsers: '/get-all-users',
    delete: '/delete-user',
    updateUser: '/update-user',
    usersWithData: '/getuserswithdata',
    getConditionalUsers: '/get-conditional-users',
};
//# sourceMappingURL=index.js.map
