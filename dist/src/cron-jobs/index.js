'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.scheduleAllCronJobs = void 0;
// import { scheduleBulkUploadJobsCron } from './bulk-upload-jobs';
// import { sendExternalLinksToStudents } from './send-external-links-jobs';
const chat_completion_reminder_1 = require('./chat-completion-reminder');
const job_application_summary_1 = require('./job-application-summary');
const profile_completion_1 = require('./profile-completion');
const re_fresh_instagram_token_1 = require('./re-fresh-instagram-token');
const spotlight_birthday_post_1 = require('./spotlight-birthday-post');
const scheduleAllCronJobs = () => {
    // scheduleBulkUploadJobsCron();
    // sendExternalLinksToStudents();
    (0, re_fresh_instagram_token_1.refreshInstagramTokenCron)();
    (0, profile_completion_1.notifyIncompleteProfilesCron)();
    (0, chat_completion_reminder_1.reminderForChatCompletionOfJobApplication)();
    (0, job_application_summary_1.sendWeeklyJobSummaryCron)();
    (0, spotlight_birthday_post_1.spotifyBirthdayPostCron)();
};
exports.scheduleAllCronJobs = scheduleAllCronJobs;
//# sourceMappingURL=index.js.map
