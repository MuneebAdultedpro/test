'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.sendCreatorEmail =
    exports.sendEventEmailToUsers =
    exports.getEventTime =
    exports.getEventDate =
        void 0;
const common_methods_1 = require('./common.methods');
const getEventDate = (date) => {
    const eventDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return eventDate;
};
exports.getEventDate = getEventDate;
const getEventTime = (time) => {
    const eventTime = new Date(time).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
    return eventTime;
};
exports.getEventTime = getEventTime;
const sendEventEmailToUsers = async ({
    users,
    templateName,
    subject,
    eventData,
    adminName,
    branchName,
}) => {
    var _a, _b;
    if (!(users === null || users === void 0 ? void 0 : users.length)) return;
    const eventDate = (0, exports.getEventDate)(
        eventData === null || eventData === void 0
            ? void 0
            : eventData.event_from
    );
    const eventTime = (0, exports.getEventTime)(
        eventData === null || eventData === void 0
            ? void 0
            : eventData.event_from
    );
    const location = `${
        eventData === null || eventData === void 0 ? void 0 : eventData.type
    }${
        (
            eventData === null || eventData === void 0
                ? void 0
                : eventData.address_line1
        )
            ? ' - ' +
              (eventData === null || eventData === void 0
                  ? void 0
                  : eventData.address_line1)
            : ''
    }`;
    const schoolName =
        (_b =
            (_a = users === null || users === void 0 ? void 0 : users[0]) ===
                null || _a === void 0
                ? void 0
                : _a.institute_id) === null || _b === void 0
            ? void 0
            : _b.name;
    await Promise.all(
        users === null || users === void 0
            ? void 0
            : users.map((user) => {
                  var _a;
                  (0, common_methods_1.sendEmail)({
                      templateName,
                      data: {
                          to:
                              user === null || user === void 0
                                  ? void 0
                                  : user.email,
                          name:
                              (user === null || user === void 0
                                  ? void 0
                                  : user.name) || 'User',
                          subject,
                          title:
                              (eventData === null || eventData === void 0
                                  ? void 0
                                  : eventData.title) || 'N/A',
                          eventDate,
                          eventTime,
                          location: location || 'N/A',
                          description:
                              (eventData === null || eventData === void 0
                                  ? void 0
                                  : eventData.description) || 'N/A',
                          schoolName:
                              ((_a =
                                  user === null || user === void 0
                                      ? void 0
                                      : user.institute_id) === null ||
                              _a === void 0
                                  ? void 0
                                  : _a.name) ||
                              schoolName ||
                              'N/A',
                          contactEmail:
                              (eventData === null || eventData === void 0
                                  ? void 0
                                  : eventData.contact_email) || 'N/A',
                          adminName:
                              adminName ||
                              (eventData === null || eventData === void 0
                                  ? void 0
                                  : eventData.creater_name) ||
                              'N/A',
                          createrName:
                              (eventData === null || eventData === void 0
                                  ? void 0
                                  : eventData.creater_name) || 'N/A',
                          branchName: branchName || 'N/A',
                      },
                  });
              })
    );
};
exports.sendEventEmailToUsers = sendEventEmailToUsers;
const sendCreatorEmail = async ({
    event,
    templateName,
    subject,
    adminName,
    schoolName,
}) => {
    if (!(event === null || event === void 0 ? void 0 : event.creater_email))
        return;
    const eventDate = (0, exports.getEventDate)(
        event === null || event === void 0 ? void 0 : event.event_from
    );
    const eventTime = (0, exports.getEventTime)(
        event === null || event === void 0 ? void 0 : event.event_from
    );
    await (0, common_methods_1.sendEmail)({
        templateName,
        data: {
            to:
                event === null || event === void 0
                    ? void 0
                    : event.creater_email,
            name:
                (event === null || event === void 0
                    ? void 0
                    : event.creater_name) || 'User',
            title:
                (event === null || event === void 0 ? void 0 : event.title) ||
                'N/A',
            eventDate,
            eventTime,
            location:
                (event === null || event === void 0
                    ? void 0
                    : event.address_line1) || 'N/A',
            type:
                (event === null || event === void 0 ? void 0 : event.type) ||
                'N/A',
            schoolName: schoolName || 'N/A',
            adminName: adminName || 'N/A',
            subject,
        },
    });
};
exports.sendCreatorEmail = sendCreatorEmail;
//# sourceMappingURL=events.js.map
