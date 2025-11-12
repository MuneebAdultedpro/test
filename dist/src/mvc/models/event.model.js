'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const methods_1 = require('../../methods');
const types_1 = require('../../interfaces/types');
const stringObject = { type: String, default: '' };
const EventSchema = (0, methods_1.CreateSchema)({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    title: { type: String },
    creater_email: { type: String, default: '' },
    creater_name: { type: String, default: '' },
    creater_role: stringObject,
    contact_email: { type: String, default: '' },
    contact_phone: { type: String, default: '' },
    description: stringObject,
    address_line1: { type: String },
    address_line2: { type: String },
    approved_by_admin: { type: Boolean },
    rejected_by_admin: { type: Boolean },
    dress_code: { type: String, default: '' },
    organized_by: {
        type: {
            type: String,
            enum: ['branch', 'institution', 'student'],
            // required: true,
        },
        ref_id: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            // required: true
        }, // This will store the reference id of respective member branch, institution
    },
    type: { type: String, default: '' },
    requested_program: { type: String, default: '' },
    zipCode: stringObject,
    //firebase values
    av_equipment_needs: { type: String, default: '' },
    rsvp: { type: String, default: '' },
    additional_comments: stringObject,
    agenda: stringObject,
    carousel_images: { type: Array },
    catering_preferences: stringObject,
    emergency_contact_no: stringObject,
    note_from_institution: stringObject,
    parking_arrangments: stringObject,
    prefered_location_in_school: stringObject,
    purpose: stringObject,
    expected_attendees: stringObject,
    setup_requirments: stringObject,
    status: {
        type: String,
        enum: Object.values(types_1.EventStatus),
        // required: true,
        default: types_1.EventStatus.Requested,
    },
    transportation_details: stringObject,
    url: stringObject,
    state: stringObject,
    isTest: { type: Boolean },
    event_from: { type: Date, default: null },
    event_to: { type: Date, default: null },
    event_date: { type: Date, default: null },
    city: stringObject,
    proposed_dates: { type: Array },
    requested_partner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'institution',
    }, //proposedDates for rescueduling
    // requested_branch: { type: Array }, //we got seprate table for this right?
    // requested_institute: { type: Array }, //we got seprate table for this right?
    // requested_candidate: { type: Array }, //we got seprate table for this right?
});
module.exports = mongoose_1.default.model('event', EventSchema);
// event eventParticipants map and get userId if exist if not then email and get the data from where ever we want institute candidate branch (for branch we need to think) and store it to eventRegistration
//# sourceMappingURL=event.model.js.map
