'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const logger_1 = tslib_1.__importDefault(require('./logger'));
const cookieParser = require('cookie-parser');
exports.default = (app) => {
    (0, logger_1.default)(app);
    app.use(cookieParser());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
};
//# sourceMappingURL=theApp.js.map
