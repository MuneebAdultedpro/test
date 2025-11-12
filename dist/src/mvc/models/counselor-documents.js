'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const methods_1 = require('../../methods');
var DocumentLevelOfView;
(function (DocumentLevelOfView) {
    DocumentLevelOfView['CONSORTIUM'] = 'consortium';
    DocumentLevelOfView['SCHOOL'] = 'school';
})(DocumentLevelOfView || (DocumentLevelOfView = {}));
const metadataSchema = new mongoose_1.default.Schema({
    doc_id: { type: String, default: '' },
    filename: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    document_type: { type: String, default: '' },
    level_of_view: { type: String, enum: Object.values(DocumentLevelOfView) },
});
const schema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    consortium_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'consortiom',
    },
    institute_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'institution',
    },
    user_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'user' },
    role: { type: String, default: '' },
    metadata: {
        type: metadataSchema,
    },
    url: { type: String, default: '' },
});
module.exports = mongoose_1.default.model('counselor-documents', schema);
//# sourceMappingURL=counselor-documents.js.map
