'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getProgramAvatarsList = exports.getAvatarsList = void 0;
const models_1 = require('../models');
const getAvatarsList = async () => {
    try {
        return await models_1.Avatar.find();
    } catch (error) {
        throw new Error(
            `Error fetching Avatar: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.getAvatarsList = getAvatarsList;
const getProgramAvatarsList = async (program) => {
    try {
        return await models_1.Avatar.find({ type: program });
    } catch (error) {
        throw new Error(
            `Error fetching Avatar: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.getProgramAvatarsList = getProgramAvatarsList;
//# sourceMappingURL=db.avatars.js.map
