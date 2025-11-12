'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.sendWeeklyJobSummaryCron = void 0;
const tslib_1 = require('tslib');
const types_1 = require('../../interfaces/types');
const methods_1 = require('../../methods');
const models_1 = require('../../mvc/models');
const moment_1 = tslib_1.__importDefault(require('moment'));
const cron = require('node-cron');
const sendWeeklyJobSummaryCron = () => {
    //  Runs every Monday at 9 AM California timezone
    cron.schedule('0 16 * * 1', async () => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        try {
            const lastMonday =
                (_f =
                    (_e =
                        (_d =
                            (_c =
                                (_b =
                                    (_a =
                                        moment_1.default === null ||
                                        moment_1.default === void 0
                                            ? void 0
                                            : (0, moment_1.default)()) ===
                                        null || _a === void 0
                                        ? void 0
                                        : _a.subtract) === null || _b === void 0
                                    ? void 0
                                    : _b.call(_a, 1, 'week')) === null ||
                            _c === void 0
                                ? void 0
                                : _c.startOf) === null || _d === void 0
                            ? void 0
                            : _d.call(_c, 'isoWeek')) === null || _e === void 0
                        ? void 0
                        : _e.toDate) === null || _f === void 0
                    ? void 0
                    : _f.call(_e);
            const lastSunday =
                (_m =
                    (_l =
                        (_k =
                            (_j =
                                (_h =
                                    (_g =
                                        moment_1.default === null ||
                                        moment_1.default === void 0
                                            ? void 0
                                            : (0, moment_1.default)()) ===
                                        null || _g === void 0
                                        ? void 0
                                        : _g.subtract) === null || _h === void 0
                                    ? void 0
                                    : _h.call(_g, 1, 'week')) === null ||
                            _j === void 0
                                ? void 0
                                : _j.endOf) === null || _k === void 0
                            ? void 0
                            : _k.call(_j, 'isoWeek')) === null || _l === void 0
                        ? void 0
                        : _l.toDate) === null || _m === void 0
                    ? void 0
                    : _m.call(_l);
            const applications = await models_1.JobApplication.find({
                createdAt: { $gte: lastMonday, $lte: lastSunday },
            })
                .populate('job_id')
                .populate('candidate_id');
            if (!applications.length) {
                console.log('No new applications last week.');
                return;
            }
            const summaryByEmployer = {};
            (_o =
                applications === null || applications === void 0
                    ? void 0
                    : applications.forEach) === null || _o === void 0
                ? void 0
                : _o.call(applications, (app) => {
                      var _a,
                          _b,
                          _c,
                          _d,
                          _e,
                          _f,
                          _g,
                          _h,
                          _j,
                          _k,
                          _l,
                          _m,
                          _o,
                          _p,
                          _q,
                          _r,
                          _s;
                      const employerId =
                          (_c =
                              (_b =
                                  (_a =
                                      app === null || app === void 0
                                          ? void 0
                                          : app.job_id) === null ||
                                  _a === void 0
                                      ? void 0
                                      : _a.branch_id) === null || _b === void 0
                                  ? void 0
                                  : _b.toString) === null || _c === void 0
                              ? void 0
                              : _c.call(_b);
                      if (!employerId) return;
                      if (
                          !(summaryByEmployer === null ||
                          summaryByEmployer === void 0
                              ? void 0
                              : summaryByEmployer[employerId])
                      ) {
                          summaryByEmployer[employerId] = {
                              employerId,
                              employerEmail:
                                  (_d =
                                      app === null || app === void 0
                                          ? void 0
                                          : app.job_id) === null ||
                                  _d === void 0
                                      ? void 0
                                      : _d.branch_email,
                              jobs: {},
                          };
                      }
                      const jobId =
                          (_g =
                              (_f =
                                  (_e =
                                      app === null || app === void 0
                                          ? void 0
                                          : app.job_id) === null ||
                                  _e === void 0
                                      ? void 0
                                      : _e._id) === null || _f === void 0
                                  ? void 0
                                  : _f.toString) === null || _g === void 0
                              ? void 0
                              : _g.call(_f);
                      if (
                          !((_j =
                              (_h =
                                  summaryByEmployer === null ||
                                  summaryByEmployer === void 0
                                      ? void 0
                                      : summaryByEmployer[employerId]) ===
                                  null || _h === void 0
                                  ? void 0
                                  : _h.jobs) === null || _j === void 0
                              ? void 0
                              : _j[jobId])
                      ) {
                          summaryByEmployer[employerId].jobs[jobId] = {
                              jobTitle:
                                  (_k =
                                      app === null || app === void 0
                                          ? void 0
                                          : app.job_id) === null ||
                                  _k === void 0
                                      ? void 0
                                      : _k.title,
                              applicants: [],
                          };
                      }
                      (_q =
                          (_p =
                              (_o =
                                  (_m =
                                      (_l =
                                          summaryByEmployer === null ||
                                          summaryByEmployer === void 0
                                              ? void 0
                                              : summaryByEmployer[
                                                    employerId
                                                ]) === null || _l === void 0
                                          ? void 0
                                          : _l.jobs) === null || _m === void 0
                                      ? void 0
                                      : _m[jobId]) === null || _o === void 0
                                  ? void 0
                                  : _o.applicants) === null || _p === void 0
                              ? void 0
                              : _p.push) === null || _q === void 0
                          ? void 0
                          : _q.call(_p, {
                                name:
                                    (_r =
                                        app === null || app === void 0
                                            ? void 0
                                            : app.candidate_id) === null ||
                                    _r === void 0
                                        ? void 0
                                        : _r.name,
                                email:
                                    (_s =
                                        app === null || app === void 0
                                            ? void 0
                                            : app.candidate_id) === null ||
                                    _s === void 0
                                        ? void 0
                                        : _s.email,
                            });
                  });
            for (const employerData of Object.values(summaryByEmployer)) {
                const employer = await models_1.Branch.findById(
                    employerData === null || employerData === void 0
                        ? void 0
                        : employerData.employerId
                );
                await (0, methods_1.sendEmail)({
                    templateName:
                        types_1.jobApplicationsSummaryTemplate.jobsSummary,
                    data: {
                        to:
                            employerData === null || employerData === void 0
                                ? void 0
                                : employerData.employerEmail,
                        name:
                            (employer === null || employer === void 0
                                ? void 0
                                : employer.name) || 'Employer',
                        subject: `New Applications Received for Your Job Postings on Evolo AI`,
                        employerName:
                            (employer === null || employer === void 0
                                ? void 0
                                : employer.name) || 'Employer',
                        jobs:
                            (_q =
                                (_p = Object.values(employerData.jobs)) ===
                                    null || _p === void 0
                                    ? void 0
                                    : _p.map) === null || _q === void 0
                                ? void 0
                                : _q.call(_p, (job) => {
                                      var _a, _b;
                                      return {
                                          title:
                                              ((_a =
                                                  job === null || job === void 0
                                                      ? void 0
                                                      : job.jobTitle) ===
                                                  null || _a === void 0
                                                  ? void 0
                                                  : _a.en) || 'Untitled Job',
                                          applications:
                                              ((_b =
                                                  job === null || job === void 0
                                                      ? void 0
                                                      : job.applicants) ===
                                                  null || _b === void 0
                                                  ? void 0
                                                  : _b.length) || 0,
                                      };
                                  }),
                    },
                });
            }
        } catch (error) {
            console.error('Error in sendWeeklyJobSummary:', error);
        }
    });
};
exports.sendWeeklyJobSummaryCron = sendWeeklyJobSummaryCron;
//# sourceMappingURL=index.js.map
