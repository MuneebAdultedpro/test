'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
const routes_strings_1 = require('../routes-strings');
const middlewares_1 = require('../../middlewares');
const controllers_1 = require('../../controllers');
const router = express_1.default.Router();
router.post(
    routes_strings_1.mockInterviewRoutes.createInterivew,
    middlewares_1.auth,
    controllers_1.mockInterviewController === null ||
        controllers_1.mockInterviewController === void 0
        ? void 0
        : controllers_1.mockInterviewController
              .addMockInterViewSessionController
);
router.get(
    routes_strings_1.mockInterviewRoutes.getInterviews,
    middlewares_1.auth,
    controllers_1.mockInterviewController === null ||
        controllers_1.mockInterviewController === void 0
        ? void 0
        : controllers_1.mockInterviewController
              .getMockInterviewSessionController
);
router.patch(
    routes_strings_1.mockInterviewRoutes.updateInterview,
    middlewares_1.auth,
    controllers_1.mockInterviewController === null ||
        controllers_1.mockInterviewController === void 0
        ? void 0
        : controllers_1.mockInterviewController
              .updateMockInterviewSessionController
);
exports.default = router;
//# sourceMappingURL=mock-interview-routes.js.map
