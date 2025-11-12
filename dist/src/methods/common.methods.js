'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.sendEmail =
    exports.CreateSchema =
    exports.getFcmTokensForUserIds =
    exports.getIDfromToken =
        void 0;
const tslib_1 = require('tslib');
const models_1 = require('../mvc/models');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const firebase_methods_1 = require('./firebase.methods');
const { v4: uuidv4 } = require('uuid');
const jwt_decode = require('jwt-decode');
const Schema = mongoose_1.default.Schema;
const getIDfromToken = (req) => {
    var _a, _b;
    const token =
        (_a = req === null || req === void 0 ? void 0 : req.body) === null ||
        _a === void 0
            ? void 0
            : _a.token;
    return (_b = jwt_decode(token)) === null || _b === void 0 ? void 0 : _b.id;
};
exports.getIDfromToken = getIDfromToken;
const getFcmTokensForUserIds = async (userIds) => {
    try {
        const users = await models_1.User.find({ _id: { $in: userIds } });
        return users === null || users === void 0
            ? void 0
            : users.map((user) =>
                  user === null || user === void 0 ? void 0 : user.fcm_token
              );
    } catch (error) {
        console.log('getFcmTokensForUserIds failed with', error);
    }
};
exports.getFcmTokensForUserIds = getFcmTokensForUserIds;
const CreateSchema = (schema) => {
    const schem = new Schema(schema, { timestamps: true });
    schem.method('toJSON', function () {
        const _a = this.toObject(),
            { _id } = _a,
            object = tslib_1.__rest(_a, ['_id']);
        object.id = _id;
        return object;
    });
    return schem;
};
exports.CreateSchema = CreateSchema;
const sendEmail = async ({ templateName, data }) => {
    if (process.env.NODE_ENV === 'dev') return;
    try {
        const collection = firebase_methods_1.firebaseDB.collection('emails');
        // console.log('lets see', data);
        const docId = uuidv4();
        const mail = {
            to: data === null || data === void 0 ? void 0 : data.to,
            template: {
                name: templateName,
                data,
            },
        };
        const response = await collection.doc(docId).set(mail, { merge: true });
        return true;
    } catch (error) {
        console.log('error', error);
        return false;
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=common.methods.js.map
