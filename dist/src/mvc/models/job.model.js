'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const methods_1 = require('../../methods');
const types_1 = require('../../interfaces/types');
const stringObject = { type: String, default: '' };
const JobSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    job_description: types_1.multilingualObject,
    hours_description: stringObject,
    hours: stringObject,
    firebaseId: { type: String },
    address_line1: { type: String },
    address_line2: { type: String },
    rank_index: { type: Number },
    is_active: { type: Boolean },
    is_test: { type: Boolean },
    is_remote: { type: Boolean, default: false },
    language: stringObject,
    program: { type: Array },
    savedJobEmails: { type: Array },
    applicantEmails: { type: Array },
    skippedJobEmails: { type: Array },
    program_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'program',
    },
    branch_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'branch',
    },
    city: stringObject,
    state: stringObject,
    title: types_1.multilingualObject,
    zip_code: stringObject,
    jobLink: stringObject,
    //firebase fields
    _geoloc: { type: Object },
    // apply_date: { type: Date, default: Date.now() }, // this should be in the jobApplication?
    branch_location: stringObject,
    contact_bio: types_1.multilingualObject,
    contact_email: stringObject,
    contact_no: stringObject,
    contact_name: stringObject,
    country: stringObject,
    posted_date: stringObject,
    branch_bio: types_1.multilingualObject,
    branch_no: stringObject,
    branch_name: stringObject,
    branch_email: stringObject,
    // expire_date: { type: Date, default: Date.now() },
    expire_date: { type: String },
    no_of_positions: { type: Number, default: 1 },
    pay: stringObject,
    pay_description: types_1.multilingualObject,
    payPeriod: stringObject,
    photo_url: stringObject,
    shift: { type: Array },
    shift_description: { type: Array },
    days_description: { type: Array },
    days: { type: Array },
    date_posted: stringObject,
    date_updated: stringObject,
    date_created: stringObject,
    apply_date: stringObject,
    search_keywords: stringObject,
    // these fields are yet to be imported
    // swipeCount: job?.swipeCountjob,
});
module.exports = mongoose_1.default.model('job', JobSchema);
//# sourceMappingURL=job.model.js.map
