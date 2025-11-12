'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
// Enable Mongoose debug mode
if (process.env.NODE_ENV === 'dev') {
    mongoose_1.default.set('debug', true);
}
const connectToDatabase = async () => {
    var _a;
    if (
        !((_a =
            process === null || process === void 0 ? void 0 : process.env) ===
            null || _a === void 0
            ? void 0
            : _a.DATABASE_URL)
    ) {
        throw new Error('DATABASE_URL environment variable is not set.');
    }
    const dbOptions = {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 120000,
        connectTimeoutMS: 60000,
        maxPoolSize: 50,
        minPoolSize: 10,
        keepAlive: true,
        keepAliveInitialDelay: 300000,
    };
    let reconnecting = false;
    const connectWithRetry = async () => {
        var _a, _b;
        console.log('Attempting to connect to database...');
        console.log(
            'Connection URI:',
            (_a =
                process === null || process === void 0
                    ? void 0
                    : process.env) === null || _a === void 0
                ? void 0
                : _a.DATABASE_URL
        );
        try {
            await mongoose_1.default.connect(
                (_b =
                    process === null || process === void 0
                        ? void 0
                        : process.env) === null || _b === void 0
                    ? void 0
                    : _b.DATABASE_URL,
                dbOptions
            );
            console.log('Database connected successfully.');
            // Start watching Algolia sync on successful connection
        } catch (error) {
            console.error(
                'Database connection error:',
                (error === null || error === void 0 ? void 0 : error.message) ||
                    error
            );
            setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
        }
    };
    mongoose_1.default.connection.on('error', (error) => {
        console.error(
            'Database connection error:',
            (error === null || error === void 0 ? void 0 : error.message) ||
                error
        );
        if (
            (error === null || error === void 0 ? void 0 : error.name) ===
            'MongooseServerSelectionError'
        ) {
            mongoose_1.default.disconnect();
            console.error(
                'Server Selection Error: Please check your database URI or network settings.'
            );
        }
    });
    mongoose_1.default.connection.on('disconnected', async () => {
        console.log('Database disconnected. Attempting to reconnect...');
        if (!reconnecting) {
            reconnecting = true;
            // Stop watching Algolia sync on disconnection
            try {
                await connectWithRetry();
            } finally {
                reconnecting = false;
            }
        }
    });
    mongoose_1.default.connection.on('reconnected', () => {
        console.log('Database reconnected.');
        // Restart watching Algolia sync on reconnection
    });
    mongoose_1.default.connection.on('connected', () => {
        console.log('Database connected.');
    });
    mongoose_1.default.connection.on('SIGINT', async () => {
        console.log('Closing MongoDB connection...');
        try {
            await mongoose_1.default.disconnect();
            console.log('MongoDB disconnected successfully.');
        } catch (err) {
            console.error('Error disconnecting from MongoDB:', err);
        } finally {
            process.exit(0);
        }
    });
    await connectWithRetry();
};
exports.default = connectToDatabase;
//# sourceMappingURL=db.js.map
