'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.sendExternalLinksToStudents = void 0;
const uuid_1 = require('uuid');
const methods_1 = require('../../methods');
const cron = require('node-cron');
const getAllChatsFrom = async () => {
    var _a, _b, _c;
    try {
        const chatsQuerySnapshot = await methods_1.firebaseDB
            .collection('chats')
            .where('chatType', '==', 'IS_JOB_APPLICATION_CHAT')
            // .where('alreadyProcessedForExternalLink', '!=', true)
            .get();
        const chatsData =
            (_b =
                (_a =
                    chatsQuerySnapshot === null || chatsQuerySnapshot === void 0
                        ? void 0
                        : chatsQuerySnapshot.docs) === null || _a === void 0
                    ? void 0
                    : _a.map) === null || _b === void 0
                ? void 0
                : _b.call(_a, (doc) => {
                      var _a;
                      return Object.assign(
                          Object.assign(
                              {},
                              (_a =
                                  doc === null || doc === void 0
                                      ? void 0
                                      : doc.data) === null || _a === void 0
                                  ? void 0
                                  : _a.call(doc)
                          ),
                          {
                              id:
                                  doc === null || doc === void 0
                                      ? void 0
                                      : doc.id,
                          }
                      );
                  });
        return (_c =
            chatsData === null || chatsData === void 0
                ? void 0
                : chatsData.filter) === null || _c === void 0
            ? void 0
            : _c.call(
                  chatsData,
                  (chat) =>
                      (chat === null || chat === void 0
                          ? void 0
                          : chat.alreadyProcessedForExternalLink) !== true
              );
    } catch (error) {
        console.log('getAllChatsFrom in external link failed with', error);
    }
};
const getAllMessagesForChat = async (chatId) => {
    try {
        const messagesQuerySnapshot = await methods_1.firebaseDB
            .collection(`chats/${chatId}/messages`)
            .orderBy('timestamp', 'desc')
            .get();
        const messagesData = messagesQuerySnapshot.docs.map((doc) => {
            var _a;
            return Object.assign(
                Object.assign(
                    {},
                    (_a =
                        doc === null || doc === void 0 ? void 0 : doc.data) ===
                        null || _a === void 0
                        ? void 0
                        : _a.call(doc)
                ),
                { id: doc === null || doc === void 0 ? void 0 : doc.id }
            );
        });
        return messagesData;
    } catch (error) {
        console.log(
            'getAllMessagesForChat in external link failed with',
            error
        );
    }
};
const sendJobExternalLinkToUser = async (chat, mostRecentMessage) => {
    try {
        const jobId = chat === null || chat === void 0 ? void 0 : chat.jobId;
        const chatId = chat === null || chat === void 0 ? void 0 : chat.id;
        // First get the job for that chat and extract it's externalLink
        const jobQuerySnapshot = await methods_1.firebaseDB
            .collection(`jobs`)
            .doc(jobId)
            .get();
        const jobData =
            jobQuerySnapshot === null || jobQuerySnapshot === void 0
                ? void 0
                : jobQuerySnapshot.data();
        // Send a message to user with the jobLink if there is any
        if (jobData === null || jobData === void 0 ? void 0 : jobData.jobLink) {
            const newMessage = {
                isEmployerResponse: false,
                senderId:
                    mostRecentMessage === null || mostRecentMessage === void 0
                        ? void 0
                        : mostRecentMessage.senderId,
                isFromBot: true,
                readBy: [
                    mostRecentMessage === null || mostRecentMessage === void 0
                        ? void 0
                        : mostRecentMessage.senderId,
                ],
                text: `The employer hasn't yet connected with you, so we’re sharing the application link to help you proceed.
          Click below to complete your application: ${
              jobData === null || jobData === void 0 ? void 0 : jobData.jobLink
          }`,
                chatType: 'IS_JOB_APPLICATION_CHAT',
                timestamp: new Date(),
            };
            console.log('sending this new message', newMessage);
            const message = Object.assign({}, newMessage);
            const chatDetails = {
                lastMessage:
                    newMessage === null || newMessage === void 0
                        ? void 0
                        : newMessage.text,
                alreadyProcessedForExternalLink: true,
                lastMessageTimestamp: new Date(),
            };
            await methods_1.firebaseDB
                .collection('chats')
                .doc(chatId)
                .collection('messages')
                .doc((0, uuid_1.v4)())
                .set(message, { merge: true });
            // also update the chats collection as well
            await methods_1.firebaseDB
                .collection('chats')
                .doc(chatId)
                .set(chatDetails, { merge: true });
        }
    } catch (error) {
        console.log(
            'sendJobExternalLinkToUser in external link failed with',
            error
        );
    }
};
const getMostRecentMessageForChat = (messages) => {
    const mostRecentMessage = messages.sort((a, b) => {
        var _a, _b, _c, _d, _e, _f;
        if (
            ((_a = a === null || a === void 0 ? void 0 : a.timestamp) ===
                null || _a === void 0
                ? void 0
                : _a._seconds) !==
            ((_b = b === null || b === void 0 ? void 0 : b.timestamp) ===
                null || _b === void 0
                ? void 0
                : _b._seconds)
        ) {
            return (
                ((_c = b === null || b === void 0 ? void 0 : b.timestamp) ===
                    null || _c === void 0
                    ? void 0
                    : _c._seconds) -
                ((_d = a === null || a === void 0 ? void 0 : a.timestamp) ===
                    null || _d === void 0
                    ? void 0
                    : _d._seconds)
            );
        }
        return (
            ((_e = b === null || b === void 0 ? void 0 : b.timestamp) ===
                null || _e === void 0
                ? void 0
                : _e._nanoseconds) -
            ((_f = a === null || a === void 0 ? void 0 : a.timestamp) ===
                null || _f === void 0
                ? void 0
                : _f._nanoseconds)
        );
    })[0];
    return mostRecentMessage;
};
const checkIfMessageIsFourDaysOld = (recentMessage) => {
    var _a, _b;
    // Get the timestamp of the most recent message in milliseconds
    const messageDate = new Date(
        ((_a =
            recentMessage === null || recentMessage === void 0
                ? void 0
                : recentMessage.timestamp) === null || _a === void 0
            ? void 0
            : _a._seconds) *
            1000 +
            ((_b =
                recentMessage === null || recentMessage === void 0
                    ? void 0
                    : recentMessage.timestamp) === null || _b === void 0
                ? void 0
                : _b._nanoseconds) /
                1000000
    );
    // Get the current date
    const currentDate = new Date();
    // Calculate the difference in time in milliseconds
    const timeDifference = currentDate - messageDate;
    // Convert 4 days into milliseconds (4 * 24 * 60 * 60 * 1000)
    const fourDaysInMilliseconds = 4 * 24 * 60 * 60 * 1000;
    // Check if the message is older than 4 days
    const isOlderThanFourDays = timeDifference >= fourDaysInMilliseconds;
    return isOlderThanFourDays;
};
// once per week
const sendExternalLinksToStudents = () => {
    // Schedule task to run Every day
    cron.schedule('0 0 * * *', async () => {
        try {
            console.log('Running a task Every day');
            // Step1 : get all chats
            const chatList = await getAllChatsFrom();
            console.log(
                `chatList ${
                    chatList === null || chatList === void 0
                        ? void 0
                        : chatList.length
                }`
            );
            // Step2 : get all messages for each chat
            for (const chat of chatList) {
                const messagesList = await getAllMessagesForChat(
                    chat === null || chat === void 0 ? void 0 : chat.id
                );
                console.log(
                    `messagesList ${
                        chatList === null || chatList === void 0
                            ? void 0
                            : chatList.length
                    } for chatid ${
                        chat === null || chat === void 0 ? void 0 : chat.id
                    }`
                );
                // Step3: now map over all messages for that chat and check if there is any document where the isEmployerResponse is true because
                // if isEmployerResponse is true that mean the employer has already sent the message and we dont need to send the external link to end users
                // but if all of the documents has the isFromBot true then we need to send a message as the employer hasn't sent any messages yet
                const allBotMessages =
                    messagesList === null || messagesList === void 0
                        ? void 0
                        : messagesList.filter(
                              (message) =>
                                  (message === null || message === void 0
                                      ? void 0
                                      : message.isFromBot) === true
                          );
                console.log(
                    `is all messages are from bot ==> `,
                    (allBotMessages === null || allBotMessages === void 0
                        ? void 0
                        : allBotMessages.length) ===
                        (messagesList === null || messagesList === void 0
                            ? void 0
                            : messagesList.length)
                );
                if (
                    (allBotMessages === null || allBotMessages === void 0
                        ? void 0
                        : allBotMessages.length) ===
                    (messagesList === null || messagesList === void 0
                        ? void 0
                        : messagesList.length)
                ) {
                    // if allBotMessages?.length===messagesList?.length that means employer hasn't send any message yet
                    // Step4: now get the time of last message
                    const mostRecentMessage =
                        getMostRecentMessageForChat(messagesList);
                    // Step5: Now check if it's 4 days old if yes then send him a message with the external link for that job
                    const isMessageFourDaysOld =
                        checkIfMessageIsFourDaysOld(mostRecentMessage);
                    if (isMessageFourDaysOld) {
                        // Step6: send message to this collection and then also set a flag alreadyProcessedForExternalLink to true so next time we dont count this chat
                        await sendJobExternalLinkToUser(
                            chat,
                            mostRecentMessage
                        );
                    }
                }
            }
            console.log('Links has sent to all users.');
        } catch (error) {
            console.log('external link cron failed with', error);
        }
    });
};
exports.sendExternalLinksToStudents = sendExternalLinksToStudents;
//# sourceMappingURL=index.js.map
