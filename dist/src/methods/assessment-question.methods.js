'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.sendMailForExploreNextStep = void 0;
const globals_1 = require('../globals');
const assessments_interface_1 = require('../interfaces/assessments.interface');
const common_methods_1 = require('./common.methods');
const CONTINUE_MY_EDUCATION_REGISTERED_STUDENT_FLOW_SUBJECT =
    'Student Ready to Advance – Assistance Needed';
const EXPLORE_NEW_CAREER_REGISTERED_STUDENT_FLOW_SUBJECT =
    'New Prospective Student Seeking Career and Education Guidance';
const sendMailForExploreNextStep = async ({
    studentInstituteId,
    operationPerformed,
    foundInstitue,
    studentData,
}) => {
    // Send emails Logics
    // 1. If user is registered student (already enrolled with an institute) then send register student email to EvoloAi and registered institute , also select mail template based on frontend option what option user has choosed
    // 2. If user is registered student (already enrolled with an institute but we dont have institute email then append in subject that institute email is missing) and send email only to EvoloAi , also select mail template based on frontend option what option user has choosed
    // 3. If user is registered student (already enrolled with an institute but we dont have institute email then append in subject that institute email is missing) and send email only to EvoloAi , also select mail template based on frontend option what option user has choosed
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    if (
        operationPerformed ===
        assessments_interface_1.NextStepOptions.ContinueMyEducation
    ) {
        if (studentInstituteId) {
            // Registered Student flow
            // 1. send mail to Evoloai Support
            await (0, common_methods_1.sendEmail)({
                templateName:
                    globals_1.Constants
                        .CONTINUE_MY_EDUCATION_REGISTERED_STUDENT_FLOW,
                data: Object.assign(Object.assign({}, studentData), {
                    instituteName:
                        foundInstitue === null || foundInstitue === void 0
                            ? void 0
                            : foundInstitue.name,
                    to: globals_1.Constants.SUPPORT_EMAIL,
                    subject:
                        CONTINUE_MY_EDUCATION_REGISTERED_STUDENT_FLOW_SUBJECT,
                }),
            });
            // 2. send mail to institute
            await (0, common_methods_1.sendEmail)({
                templateName:
                    globals_1.Constants
                        .CONTINUE_MY_EDUCATION_REGISTERED_STUDENT_FLOW,
                data: Object.assign(Object.assign({}, studentData), {
                    instituteName:
                        foundInstitue === null || foundInstitue === void 0
                            ? void 0
                            : foundInstitue.name,
                    to:
                        foundInstitue === null || foundInstitue === void 0
                            ? void 0
                            : foundInstitue.email,
                    subject:
                        CONTINUE_MY_EDUCATION_REGISTERED_STUDENT_FLOW_SUBJECT,
                }),
            });
        } else {
            // Non Registered Student flow
            if (
                !(foundInstitue === null || foundInstitue === void 0
                    ? void 0
                    : foundInstitue.email) ||
                (foundInstitue === null || foundInstitue === void 0
                    ? void 0
                    : foundInstitue.email) === '' ||
                (foundInstitue === null || foundInstitue === void 0
                    ? void 0
                    : foundInstitue.email) == undefined
            ) {
                // if we done have found institute email then make sure to change subject in EvoloAi email that mail is missin
                // 1. send mail to Evoloai Support
                await (0, common_methods_1.sendEmail)({
                    templateName:
                        globals_1.Constants
                            .CONTINUE_MY_EDUCATION_NON_REGISTERED_STUDENT_FLOW,
                    data: Object.assign(Object.assign({}, studentData), {
                        instituteName:
                            foundInstitue === null || foundInstitue === void 0
                                ? void 0
                                : foundInstitue.name,
                        to: globals_1.Constants.SUPPORT_EMAIL,
                        subject: `${CONTINUE_MY_EDUCATION_REGISTERED_STUDENT_FLOW_SUBJECT} (Institute Mail Missing)`,
                    }),
                });
            } else {
                // 1. send mail to Evoloai Support
                await (0, common_methods_1.sendEmail)({
                    templateName:
                        globals_1.Constants
                            .CONTINUE_MY_EDUCATION_NON_REGISTERED_STUDENT_FLOW,
                    data: Object.assign(Object.assign({}, studentData), {
                        instituteName:
                            foundInstitue === null || foundInstitue === void 0
                                ? void 0
                                : foundInstitue.name,
                        to: globals_1.Constants.SUPPORT_EMAIL,
                        subject:
                            CONTINUE_MY_EDUCATION_REGISTERED_STUDENT_FLOW_SUBJECT,
                    }),
                });
                // 2. send mail to institute
                await (0, common_methods_1.sendEmail)({
                    templateName:
                        globals_1.Constants
                            .CONTINUE_MY_EDUCATION_NON_REGISTERED_STUDENT_FLOW,
                    data: Object.assign(Object.assign({}, studentData), {
                        instituteName:
                            foundInstitue === null || foundInstitue === void 0
                                ? void 0
                                : foundInstitue.name,
                        to:
                            foundInstitue === null || foundInstitue === void 0
                                ? void 0
                                : foundInstitue.email,
                        subject:
                            CONTINUE_MY_EDUCATION_REGISTERED_STUDENT_FLOW_SUBJECT,
                    }),
                });
            }
        }
    } else if (
        operationPerformed ===
        assessments_interface_1.NextStepOptions.ExploreNewCareer
    ) {
        if (studentInstituteId) {
            // Registered Student flow
            // 1. send mail to Evoloai Support
            await (0, common_methods_1.sendEmail)({
                templateName:
                    globals_1.Constants
                        .EXPLORE_NEW_CAREER_REGISTERED_STUDENT_FLOW,
                data: Object.assign(Object.assign({}, studentData), {
                    instituteName:
                        foundInstitue === null || foundInstitue === void 0
                            ? void 0
                            : foundInstitue.name,
                    to: globals_1.Constants.SUPPORT_EMAIL,
                    subject: EXPLORE_NEW_CAREER_REGISTERED_STUDENT_FLOW_SUBJECT,
                }),
            });
            // 2. send mail to institute
            await (0, common_methods_1.sendEmail)({
                templateName:
                    globals_1.Constants
                        .EXPLORE_NEW_CAREER_REGISTERED_STUDENT_FLOW,
                data: Object.assign(Object.assign({}, studentData), {
                    instituteName:
                        foundInstitue === null || foundInstitue === void 0
                            ? void 0
                            : foundInstitue.name,
                    to:
                        foundInstitue === null || foundInstitue === void 0
                            ? void 0
                            : foundInstitue.email,
                    subject: EXPLORE_NEW_CAREER_REGISTERED_STUDENT_FLOW_SUBJECT,
                }),
            });
        } else {
            // Non Registered Student flow
            if (
                !(foundInstitue === null || foundInstitue === void 0
                    ? void 0
                    : foundInstitue.email) ||
                (foundInstitue === null || foundInstitue === void 0
                    ? void 0
                    : foundInstitue.email) === '' ||
                (foundInstitue === null || foundInstitue === void 0
                    ? void 0
                    : foundInstitue.email) == undefined
            ) {
                // if we done have found institute email then make sure to change subject in EvoloAi email that mail is missin
                // 1. send mail to Evoloai Support
                await (0, common_methods_1.sendEmail)({
                    templateName:
                        globals_1.Constants
                            .EXPLORE_NEW_CAREER_NON_REGISTERED_STUDENT_FLOW,
                    data: Object.assign(Object.assign({}, studentData), {
                        instituteName:
                            foundInstitue === null || foundInstitue === void 0
                                ? void 0
                                : foundInstitue.name,
                        to: globals_1.Constants.SUPPORT_EMAIL,
                        subject: `${EXPLORE_NEW_CAREER_REGISTERED_STUDENT_FLOW_SUBJECT} (Institute Mail Missing)`,
                    }),
                });
            } else {
                // 1. send mail to Evoloai Support
                await (0, common_methods_1.sendEmail)({
                    templateName:
                        globals_1.Constants
                            .EXPLORE_NEW_CAREER_NON_REGISTERED_STUDENT_FLOW,
                    data: Object.assign(Object.assign({}, studentData), {
                        instituteName:
                            foundInstitue === null || foundInstitue === void 0
                                ? void 0
                                : foundInstitue.name,
                        to: globals_1.Constants.SUPPORT_EMAIL,
                        subject:
                            EXPLORE_NEW_CAREER_REGISTERED_STUDENT_FLOW_SUBJECT,
                    }),
                });
                // 2. send mail to institute
                await (0, common_methods_1.sendEmail)({
                    templateName:
                        globals_1.Constants
                            .EXPLORE_NEW_CAREER_NON_REGISTERED_STUDENT_FLOW,
                    data: Object.assign(Object.assign({}, studentData), {
                        instituteName:
                            foundInstitue === null || foundInstitue === void 0
                                ? void 0
                                : foundInstitue.name,
                        to:
                            foundInstitue === null || foundInstitue === void 0
                                ? void 0
                                : foundInstitue.email,
                        subject:
                            EXPLORE_NEW_CAREER_REGISTERED_STUDENT_FLOW_SUBJECT,
                    }),
                });
            }
        }
    } else if (
        operationPerformed ===
        assessments_interface_1.NextStepOptions.TalkToCounselor
    ) {
        const careerOptions = {
            careerOption1:
                ((_b =
                    (_a =
                        studentData === null || studentData === void 0
                            ? void 0
                            : studentData.careerOptions) === null ||
                    _a === void 0
                        ? void 0
                        : _a[0]) === null || _b === void 0
                    ? void 0
                    : _b.en) ||
                ((_c =
                    studentData === null || studentData === void 0
                        ? void 0
                        : studentData.careerOptions) === null || _c === void 0
                    ? void 0
                    : _c[0]),
            careerOption2:
                ((_e =
                    (_d =
                        studentData === null || studentData === void 0
                            ? void 0
                            : studentData.careerOptions) === null ||
                    _d === void 0
                        ? void 0
                        : _d[1]) === null || _e === void 0
                    ? void 0
                    : _e.en) ||
                ((_f =
                    studentData === null || studentData === void 0
                        ? void 0
                        : studentData.careerOptions) === null || _f === void 0
                    ? void 0
                    : _f[1]),
            careerOption3:
                ((_h =
                    (_g =
                        studentData === null || studentData === void 0
                            ? void 0
                            : studentData.careerOptions) === null ||
                    _g === void 0
                        ? void 0
                        : _g[2]) === null || _h === void 0
                    ? void 0
                    : _h.en) ||
                ((_j =
                    studentData === null || studentData === void 0
                        ? void 0
                        : studentData.careerOptions) === null || _j === void 0
                    ? void 0
                    : _j[2]),
            careerOption4:
                ((_l =
                    (_k =
                        studentData === null || studentData === void 0
                            ? void 0
                            : studentData.careerOptions) === null ||
                    _k === void 0
                        ? void 0
                        : _k[3]) === null || _l === void 0
                    ? void 0
                    : _l.en) ||
                ((_m =
                    studentData === null || studentData === void 0
                        ? void 0
                        : studentData.careerOptions) === null || _m === void 0
                    ? void 0
                    : _m[3]),
        };
        if (studentInstituteId) {
            // Registered Student flow
            // 1. send mail to Evoloai Support
            await (0, common_methods_1.sendEmail)({
                templateName:
                    globals_1.Constants
                        .TALK_TO_COUNSELOR_NON_REGISTERED_STUDENT_FLOW,
                data: Object.assign(
                    Object.assign(
                        Object.assign({}, studentData),
                        careerOptions
                    ),
                    {
                        instituteName:
                            foundInstitue === null || foundInstitue === void 0
                                ? void 0
                                : foundInstitue.name,
                        to: globals_1.Constants.SUPPORT_EMAIL,
                    }
                ),
            });
            // 2. send mail to institute
            await (0, common_methods_1.sendEmail)({
                templateName:
                    globals_1.Constants
                        .TALK_TO_COUNSELOR_NON_REGISTERED_STUDENT_FLOW,
                data: Object.assign(
                    Object.assign(
                        Object.assign({}, studentData),
                        careerOptions
                    ),
                    {
                        instituteName:
                            foundInstitue === null || foundInstitue === void 0
                                ? void 0
                                : foundInstitue.name,
                        to:
                            foundInstitue === null || foundInstitue === void 0
                                ? void 0
                                : foundInstitue.email,
                    }
                ),
            });
        } else {
            // Non Registered Student flow
            if (
                !(foundInstitue === null || foundInstitue === void 0
                    ? void 0
                    : foundInstitue.email) ||
                (foundInstitue === null || foundInstitue === void 0
                    ? void 0
                    : foundInstitue.email) === '' ||
                (foundInstitue === null || foundInstitue === void 0
                    ? void 0
                    : foundInstitue.email) == undefined
            ) {
                // if we done have found institute email then make sure to change subject in EvoloAi email that mail is missin
                // 1. send mail to Evoloai Support
                await (0, common_methods_1.sendEmail)({
                    templateName:
                        globals_1.Constants
                            .TALK_TO_COUNSELOR_NON_REGISTERED_STUDENT_FLOW,
                    data: Object.assign(
                        Object.assign(
                            Object.assign({}, studentData),
                            careerOptions
                        ),
                        {
                            instituteName:
                                foundInstitue === null ||
                                foundInstitue === void 0
                                    ? void 0
                                    : foundInstitue.name,
                            to: globals_1.Constants.SUPPORT_EMAIL,
                        }
                    ),
                });
            } else {
                // 1. send mail to Evoloai Support
                await (0, common_methods_1.sendEmail)({
                    templateName:
                        globals_1.Constants
                            .TALK_TO_COUNSELOR_NON_REGISTERED_STUDENT_FLOW,
                    data: Object.assign(
                        Object.assign(
                            Object.assign({}, studentData),
                            careerOptions
                        ),
                        {
                            instituteName:
                                foundInstitue === null ||
                                foundInstitue === void 0
                                    ? void 0
                                    : foundInstitue.name,
                            to: globals_1.Constants.SUPPORT_EMAIL,
                        }
                    ),
                });
                // 2. send mail to institute
                await (0, common_methods_1.sendEmail)({
                    templateName:
                        globals_1.Constants
                            .TALK_TO_COUNSELOR_NON_REGISTERED_STUDENT_FLOW,
                    data: Object.assign(
                        Object.assign(
                            Object.assign({}, studentData),
                            careerOptions
                        ),
                        {
                            instituteName:
                                foundInstitue === null ||
                                foundInstitue === void 0
                                    ? void 0
                                    : foundInstitue.name,
                            to:
                                foundInstitue === null ||
                                foundInstitue === void 0
                                    ? void 0
                                    : foundInstitue.email,
                        }
                    ),
                });
            }
        }
    }
};
exports.sendMailForExploreNextStep = sendMailForExploreNextStep;
//# sourceMappingURL=assessment-question.methods.js.map
