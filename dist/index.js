'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const dotenv_1 = tslib_1.__importDefault(require('dotenv'));
const routes_1 = tslib_1.__importDefault(require('./src/init/routes'));
const localize_1 = tslib_1.__importDefault(require('./src/init/localize'));
const db_1 = tslib_1.__importDefault(require('./src/init/db'));
const theApp_1 = tslib_1.__importDefault(require('./src/init/theApp'));
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const useragent = require('express-useragent');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: process.env.NODE_ENV !== 'prod' ? 300 : 3000,
    message: 'Too many requests from this IP, please try again later.',
});
const v8 = require('v8');
dotenv_1.default.config();
const app = (0, express_1.default)();
app.disable('x-powered-by'); // hides 'X-Powered-By: Express' header
app.set('trust proxy', 'loopback'); //Forward user/client ip to log it on backend
const cors = require('cors');
const corsOptions = {
    origin: '*',
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(limiter);
app.use(useragent.express());
app.use((req, res, next) => {
    var _a;
    // @ts-ignore
    if (
        (req === null || req === void 0 ? void 0 : req.useragent) &&
        ((_a = req === null || req === void 0 ? void 0 : req.useragent) ===
            null || _a === void 0
            ? void 0
            : _a.isBot)
    ) {
        return res.status(403).send('Bots not allowed');
    }
    next();
});
(0, theApp_1.default)(app);
(0, localize_1.default)(app);
(0, db_1.default)();
(0, routes_1.default)(app);
app.listen(8080, '0.0.0.0', () => {
    console.log(`⚡️ [server]: Server is running at http://localhost:${8080}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map
