'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.refreshInstagramTokenCron = void 0;
const tslib_1 = require('tslib');
const axios_1 = tslib_1.__importDefault(require('axios'));
const cron = require('node-cron');
// once per 30 days
const refreshInstagramTokenCron = () => {
    // Running on the 30th of each month
    cron.schedule('0 0 30 * *', async () => {
        var _a, _b, _c;
        try {
            console.log('Refreshing Instagram Long-Lived Token...');
            // Request to refresh the long-lived token
            const response = await axios_1.default.get(
                `https://graph.facebook.com/v16.0/oauth/access_token`,
                {
                    params: {
                        grant_type: 'fb_exchange_token',
                        client_id: encodeURIComponent(
                            process.env.FACEBOOK_APP_ID.trim()
                        ),
                        client_secret: encodeURIComponent(
                            process.env.FACEBOOK_APP_SECRET.trim()
                        ),
                        fb_exchange_token: encodeURIComponent(
                            process.env.LONG_TIME_ACCESS_TOKEN.trim()
                        ),
                    },
                    headers: {
                        'User-Agent': 'Node.js App',
                    },
                }
            );
            if (
                (_a =
                    response === null || response === void 0
                        ? void 0
                        : response.data) === null || _a === void 0
                    ? void 0
                    : _a.access_token
            ) {
                const newToken =
                    (_b =
                        response === null || response === void 0
                            ? void 0
                            : response.data) === null || _b === void 0
                        ? void 0
                        : _b.access_token;
                const expiresIn =
                    (_c =
                        response === null || response === void 0
                            ? void 0
                            : response.data) === null || _c === void 0
                        ? void 0
                        : _c.expires_in;
                console.log('New long-lived token acquired:', newToken);
                console.log(`Token will expire in: ${expiresIn} seconds`);
                // Optionally: Save the new token in your database or environment variables
                // saveTokenToDatabase(newToken);
            } else {
                throw new Error(
                    'Token refresh failed: no access_token returned.'
                );
            }
            console.log('Instagram token successfully refreshed.');
        } catch (error) {
            console.error(
                'Failed to refresh Instagram token:',
                error.message,
                JSON.stringify(error)
            );
        }
    });
};
exports.refreshInstagramTokenCron = refreshInstagramTokenCron;
//# sourceMappingURL=index.js.map
