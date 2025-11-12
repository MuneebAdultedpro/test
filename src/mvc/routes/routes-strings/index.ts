export const baseRoutes = {
    userBase: '/api/user',
    commonBase: '/api/common',
    venueBase: '/api/venue',
    eventBase: '/api/event',
    favoriteBase: '/api/favorite',
    exoploreBase: '/api/explore',
};
export const userRoutes = {
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
export const studentRoutes = {
    postfcmToken: '/post-fcm-token',
    user: '/get-user',
    allUsers: '/get-all-users',
    delete: '/delete-user',
    updateUser: '/update-user',
    usersWithData: '/getuserswithdata',
    getConditionalUsers: '/get-conditional-users',
};
export const venueRoutes = {
    venue: '/venue',
    getAllVenues: '/get-all-venues',
};
export const favoriteRoutes = {
    favorite: '/',
    getAllFavorites: '/get-all-favorites',
};

export const exploreRoutes = {
    explore: '/explore',
    getAllExplores: '/get-all-explores',
};
export const eventRoutes = {
    event: '/event',
    getAllEvents: '/get-all-events',
    registerEvent: '/register-event',
    unregisterEvent: '/unregister-event',
    getUserRegisteredEvents: '/get-user-registered-events',
};
