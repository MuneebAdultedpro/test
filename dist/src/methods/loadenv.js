'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const dotenv_1 = require('dotenv');
const { NODE_ENV } =
    process === null || process === void 0 ? void 0 : process.env;
const path = `.env${NODE_ENV ? `.${NODE_ENV}` : ''}`;
exports.default = (0, dotenv_1.config)({ path });
//# sourceMappingURL=loadenv.js.map
