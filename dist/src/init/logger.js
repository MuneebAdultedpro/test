'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const fs_1 = tslib_1.__importDefault(require('fs'));
const path_1 = tslib_1.__importDefault(require('path'));
const morgan_1 = tslib_1.__importDefault(require('morgan'));
const rfs = tslib_1.__importStar(require('rotating-file-stream'));
const setupLogger = (app) => {
    const logDirectory = path_1.default.join(__dirname, '../logs');
    // Create logs directory if not exists
    if (!fs_1.default.existsSync(logDirectory)) {
        fs_1.default.mkdirSync(logDirectory, { recursive: true });
        fs_1.default.chmodSync(logDirectory, 0o700); // Secure permissions
    }
    // Setup rotating file streams
    const accessLogStream = rfs.createStream('access.log', {
        interval: '1d',
        path: logDirectory,
        compress: 'gzip',
        maxFiles: 7,
    });
    const errorLogStream = rfs.createStream('error.log', {
        interval: '1d',
        path: logDirectory,
        compress: 'gzip',
        maxFiles: 7,
    });
    // Custom tokens
    morgan_1.default.token('real-ip', (req) => {
        var _a, _b, _c, _d, _e, _f, _g;
        return (
            ((_f =
                (_e =
                    (_d =
                        (_c =
                            (_b =
                                (_a =
                                    req === null || req === void 0
                                        ? void 0
                                        : req.headers) === null || _a === void 0
                                    ? void 0
                                    : _a['x-forwarded-for']) === null ||
                            _b === void 0
                                ? void 0
                                : _b.toString) === null || _c === void 0
                            ? void 0
                            : _c.call(_b)) === null || _d === void 0
                        ? void 0
                        : _d.split) === null || _e === void 0
                    ? void 0
                    : _e.call(_d, ',')) === null || _f === void 0
                ? void 0
                : _f[0]) ||
            ((_g = req === null || req === void 0 ? void 0 : req.socket) ===
                null || _g === void 0
                ? void 0
                : _g.remoteAddress) ||
            '-'
        );
    });
    morgan_1.default.token('id', (req) => {
        var _a;
        return (
            ((_a = req.headers['x-correlation-id']) === null || _a === void 0
                ? void 0
                : _a.toString()) || '-'
        );
    });
    // Log format
    const logFormat =
        ':date[iso] :id :real-ip - ":method :url" :status :res[content-length] - :response-time ms ":referrer" ":user-agent"';
    // Log only successful requests
    app.use(
        (0, morgan_1.default)(logFormat, {
            stream: accessLogStream,
            skip: (req, res) => res.statusCode >= 400,
        })
    );
    // Log only failed requests
    app.use(
        (0, morgan_1.default)(logFormat, {
            stream: errorLogStream,
            skip: (req, res) => res.statusCode < 400,
        })
    );
    // Console logs in non-production
    if (process.env.NODE_ENV !== 'prod') {
        app.use((0, morgan_1.default)('dev'));
    }
};
exports.default = setupLogger;
//# sourceMappingURL=logger.js.map
