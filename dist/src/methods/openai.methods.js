'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.respondWithBotOnUserMessage =
    exports.sendJobApplicationToCandidateOnJobApply =
    exports.callChatGPTForJobApplicationChat =
    exports.processPromptForApplicantOnJobApply =
    exports.getPromptForApplicantOnJobApply =
        void 0;
const tslib_1 = require('tslib');
const axios_1 = tslib_1.__importDefault(require('axios'));
const types_1 = require('../interfaces/types');
const models_1 = require('../mvc/models');
const db_message_1 = require('../mvc/database/db.message');
const pusher_methods_1 = require('./pusher.methods');
const message_services_1 = require('../mvc/services/message/message.services');
const getPromptForApplicantOnJobApply = (data) => {
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
        _s,
        _t,
        _u,
        _v,
        _w,
        _x,
        _y;
    let prompt = `Here are the job and applicant details: Job Title: ${
        (_a = data === null || data === void 0 ? void 0 : data.job) === null ||
        _a === void 0
            ? void 0
            : _a.title
    }.`;
    if (
        ((_c =
            (_b = data === null || data === void 0 ? void 0 : data.job) ===
                null || _b === void 0
                ? void 0
                : _b.description) === null || _c === void 0
            ? void 0
            : _c.length) > 0
    ) {
        prompt += `, Job Description: ${data.job.description}.`;
    }
    if (
        ((_e =
            (_d = data === null || data === void 0 ? void 0 : data.job) ===
                null || _d === void 0
                ? void 0
                : _d.shiftDescription) === null || _e === void 0
            ? void 0
            : _e.length) > 0
    ) {
        prompt += `, Shift Description: ${data.job.shiftDescription}.`;
    }
    if (
        ((_g =
            (_f = data === null || data === void 0 ? void 0 : data.job) ===
                null || _f === void 0
                ? void 0
                : _f.daysDescription) === null || _g === void 0
            ? void 0
            : _g.length) > 0
    ) {
        prompt += `, Days Description: ${data.job.daysDescription}.`;
    }
    if (
        ((_j =
            (_h = data === null || data === void 0 ? void 0 : data.job) ===
                null || _h === void 0
                ? void 0
                : _h.hoursDescription) === null || _j === void 0
            ? void 0
            : _j.length) > 0
    ) {
        prompt += `, Hours Description: ${data.job.hoursDescription}.`;
    }
    if (
        ((_l =
            (_k = data === null || data === void 0 ? void 0 : data.job) ===
                null || _k === void 0
                ? void 0
                : _k.hours) === null || _l === void 0
            ? void 0
            : _l.length) > 0
    ) {
        prompt += `, Job No. of Hours: ${data.job.hours}.`;
    }
    if (
        ((_o =
            (_m = data === null || data === void 0 ? void 0 : data.job) ===
                null || _m === void 0
                ? void 0
                : _m.payDescription) === null || _o === void 0
            ? void 0
            : _o.length) > 0
    ) {
        prompt += `, Pay Description: ${data.job.payDescription}.`;
    }
    if (
        ((_q =
            (_p =
                data === null || data === void 0 ? void 0 : data.applicant) ===
                null || _p === void 0
                ? void 0
                : _p.name) === null || _q === void 0
            ? void 0
            : _q.length) > 0
    ) {
        prompt += `, Applicant Preferred Name: ${data.applicant.name}.`;
    }
    if (
        ((_s =
            (_r =
                data === null || data === void 0 ? void 0 : data.applicant) ===
                null || _r === void 0
                ? void 0
                : _r.tagLine) === null || _s === void 0
            ? void 0
            : _s.length) > 0
    ) {
        prompt += `, Applicant Tagline: ${data.applicant.tagLine}.`;
    }
    if (
        ((_u =
            (_t =
                data === null || data === void 0 ? void 0 : data.applicant) ===
                null || _t === void 0
                ? void 0
                : _t.program) === null || _u === void 0
            ? void 0
            : _u.length) > 0
    ) {
        prompt += `, Applicant Program/Major: ${data.applicant.program}.`;
    }
    if (
        ((_w =
            (_v =
                data === null || data === void 0 ? void 0 : data.applicant) ===
                null || _v === void 0
                ? void 0
                : _v.skills) === null || _w === void 0
            ? void 0
            : _w.length) > 0
    ) {
        prompt += `, Applicant Skills: ${data.applicant.skills.join(', ')}.`;
    }
    if (
        ((_y =
            (_x =
                data === null || data === void 0 ? void 0 : data.applicant) ===
                null || _x === void 0
                ? void 0
                : _x.bio) === null || _y === void 0
            ? void 0
            : _y.length) > 0
    ) {
        prompt += `, Applicant Biography: ${data.applicant.bio}.`;
    }
    prompt +=
        ' As an recruiter ask your first question from the applicant. Wait for the applicant to respond before you ask another question. Follow the context given to you.';
    return prompt;
};
exports.getPromptForApplicantOnJobApply = getPromptForApplicantOnJobApply;
const processPromptForApplicantOnJobApply = async (prompt) => {
    try {
        const gptSystemContext = `I want you to act as an recruiter screening applicants for a job. Don't identify yourself as anything. I will provide you with job details including title, description, requirements, work hours, shift and pay. Additionally, i will provide you with the applicant’s detail including preferred name, tagline, major, skills and biography. If any information is missing, assume it has not been provided. If applicant's name is not provided, do not reference them by name or anything else. As interviewer you are responsible for performing initial screening in chat. You will have a conversation with the applicant asking 4 or 5 basic and general questions about their experience, skills, interest in the job and availability for work hours. Ask one question at a time and wait for the applicant to respond before asking another question. You will not setup any interview with the applicant. After 4 or 5 basic screening questions, ask the applicant an open ended question that will help distinguish each candidate amongst similar candidates. After that thank them for their time and inform them that their information will be reviewed and that they will be contacted directly from the employer for next steps. Ask them if they have any questions regarding the job, role or the company. Do not require proof of anything. Your task is just to prequalify the applicant. Make this pre-qualification as easy as possible. Do not ask any questions that violate California labor laws about protected classes, non-job related questions, children etc. Any inappropriate/irrelevant conversations should be ignored, and you should say something similar to "I'm sorry, I don't know what you mean, but " followed by the prior question. If anyone mentions criminal history reply back "Thank you for letting us know, we will take everything into consideration while reviewing your application"`;
        const gptMessagesHistory = [
            { role: 'system', content: gptSystemContext },
            { role: 'user', content: prompt }, // The actual user prompt
        ];
        const response = await callChatGPTForJobApplicationChat(
            gptMessagesHistory
        );
        if (response) {
            console.log('Generated response:', response);
            // Save the response to your database or further process it
            return response;
        } else {
            console.error('Failed to generate response from OpenAi');
            return null;
        }
    } catch (error) {
        console.log('got error in processPromptForApplicantOnJobApply ');
    }
};
exports.processPromptForApplicantOnJobApply =
    processPromptForApplicantOnJobApply;
/**
 * Calls the PaLM API using Vertex AI with the specified parameters.
 * @param {string} prompt - The user input prompt for the chatbot.
 * @param {string} context - The context for the chatbot's behavior.
 * @param {number} temperature - The temperature for response randomness (default: 0.7).
 * @returns {Promise<string | null>} - The generated response or null in case of an error.
 */
async function callChatGPTForJobApplicationChat(gptMessagesHistory) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const API_URL = 'https://api.openai.com/v1/chat/completions';
    const API_KEY =
        (_a = process === null || process === void 0 ? void 0 : process.env) ===
            null || _a === void 0
            ? void 0
            : _a.OPENAI_API_KEY;
    const requestData = {
        model: 'gpt-3.5-turbo',
        messages: gptMessagesHistory,
        temperature: 0.7,
        max_tokens: 150,
    };
    try {
        const response = await axios_1.default.post(API_URL, requestData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_KEY}`, // Add the API key to the Authorization header
            },
        });
        if (
            ((_c =
                (_b =
                    response === null || response === void 0
                        ? void 0
                        : response.data) === null || _b === void 0
                    ? void 0
                    : _b.choices) === null || _c === void 0
                ? void 0
                : _c.length) > 0
        ) {
            return (_j =
                (_h =
                    (_g =
                        (_f =
                            (_e =
                                (_d =
                                    response === null || response === void 0
                                        ? void 0
                                        : response.data) === null ||
                                _d === void 0
                                    ? void 0
                                    : _d.choices) === null || _e === void 0
                                ? void 0
                                : _e[0]) === null || _f === void 0
                            ? void 0
                            : _f.message) === null || _g === void 0
                        ? void 0
                        : _g.content) === null || _h === void 0
                    ? void 0
                    : _h.trim) === null || _j === void 0
                ? void 0
                : _j.call(_h); // Extract and return the text from the first choice
        }
        console.error('Unexpected API response structure:', response.data);
        return null;
    } catch (error) {
        if (error.response) {
            // API responded with a status code other than 2xx
            console.error(
                'API Error for chatgpt on job apply chat:',
                error.response.data
            );
        } else if (error.request) {
            // No response received
            console.error(
                'No response received for chatgpt on job apply chat:',
                error.request
            );
        } else {
            // Something else caused the error
            console.error(
                'Error for chatgpt on job apply chat:',
                error.message
            );
        }
        return null;
    }
}
exports.callChatGPTForJobApplicationChat = callChatGPTForJobApplicationChat;
const sendJobApplicationToCandidateOnJobApply = async (data) => {
    var _a, _b, _c, _d;
    const applicant =
        data === null || data === void 0 ? void 0 : data.applicant;
    const employer = data === null || data === void 0 ? void 0 : data.employer;
    try {
        if (
            ((_a = data === null || data === void 0 ? void 0 : data.job) ===
                null || _a === void 0
                ? void 0
                : _a.title) &&
            ((_c =
                (_b =
                    data === null || data === void 0 ? void 0 : data.status) ===
                    null || _b === void 0
                    ? void 0
                    : _b.trim) === null || _c === void 0
                ? void 0
                : _c.call(_b)) === types_1.JobApplicationStatus.APPLIED
        ) {
            const applicantId =
                applicant === null || applicant === void 0
                    ? void 0
                    : applicant._id;
            // Construct participants for the chat
            const participants = [
                {
                    userId:
                        (employer === null || employer === void 0
                            ? void 0
                            : employer.userId) || null,
                    joinedAt: new Date(),
                },
                {
                    userId: applicantId,
                    joinedAt: new Date(),
                },
            ];
            // Chat document
            const chatData = {
                job_id:
                    (_d =
                        data === null || data === void 0
                            ? void 0
                            : data.job) === null || _d === void 0
                        ? void 0
                        : _d._id,
                type: types_1.ChatTypes.IS_JOB_APPLICATION_CHAT,
                participants,
                groupName: '',
                groupPhoto: '',
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            // Save chat to MongoDB
            const newChat = await new models_1.Chat(chatData);
            newChat.save();
            // Create the initial message
            const prompt = (0, exports.getPromptForApplicantOnJobApply)(data);
            const gptApiResponse = await (0,
            exports.processPromptForApplicantOnJobApply)(prompt);
            // call thw palm api to get the response message and then store that message in messages and also update the last message in chat
            const initialMessage = {
                chatId:
                    newChat === null || newChat === void 0
                        ? void 0
                        : newChat._id,
                senderId: null,
                content: gptApiResponse,
                isFromBot: true,
                isEmployerResponse: false,
                messageType: types_1.MessageType.text,
            };
            // Save chat to MongoDB
            const newMessage = await new models_1.Message(initialMessage);
            newMessage.save();
            const chatPayload = {
                last_message: gptApiResponse,
                lastMessageTimestamp: new Date(),
            };
            await models_1.Chat.findByIdAndUpdate(
                newChat === null || newChat === void 0 ? void 0 : newChat._id,
                chatPayload,
                {
                    new: true,
                }
            );
            const updatedChat = await models_1.Chat.findById(
                newChat === null || newChat === void 0 ? void 0 : newChat._id
            ).populate({
                path: 'participants.userId',
                model: 'user',
            });
            (0, pusher_methods_1.realTimeEventForChatMessage)(
                updatedChat,
                newMessage,
                true
            );
            // send push notification for chat participents
            (0, message_services_1.sendPushNotificationForChatParticipents)(
                updatedChat,
                newMessage
            );
            return newChat;
        }
    } catch (error) {
        throw new Error(
            `Error while generating Chatbot response: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.sendJobApplicationToCandidateOnJobApply =
    sendJobApplicationToCandidateOnJobApply;
const respondWithBotOnUserMessage = async (chat) => {
    var _a;
    try {
        const chatMessages = await (0, db_message_1.findChatMessages)(
            chat === null || chat === void 0 ? void 0 : chat._id
        );
        let gptSystemContext = `You are an recruiter conducting a pre-screening interview with a job applicant. Your goal is to assess their qualifications, experience, interest in the role, and availability through a structured but natural conversation. Follow these guidelines:

1. Screening Process:
	•	Greet the applicant and briefly introduce the screening process.
	•	Ask one relevant question at a time based on the applicant’s previous response.
	•	Do not repeat any questions that have already been asked.
	•	Keep the conversation concise and professional while maintaining a friendly tone.

2. Types of Questions to Ask:

Basic Information
	•	“Can you briefly introduce yourself and share your background relevant to this role?”
	•	“What interests you most about this job opportunity?”

Experience & Skills
	•	“Can you describe your experience with [specific skill or requirement from the job]?”
	•	“Have you worked in a similar role before? If so, what were your key responsibilities?”
	•	“Can you provide an example of a challenge you faced at work and how you handled it?”

Availability & Logistics
	•	“When would you be available to start if selected for this position?”

Cultural & Interest Fit
	•	“What kind of work environment do you thrive in?”
	•	“What motivates you in your career, and how does this role align with your goals?”

3. Response Evaluation & Follow-ups:
	•	Acknowledge and summarize the applicant’s response to validate understanding.
	•	If the response lacks details, ask a follow-up question to get more clarity.
	•	If the response is sufficient, smoothly transition to the next relevant question.

4. Concluding the Conversation (After 4+ Questions):
	•	“Thank you for your responses! I appreciate you taking the time to answer these questions.”
	•	“Your information will now be reviewed by our team.”
	•	“If selected for the next stage, we will reach out to you with further details.”
	•	“Before we wrap up, do you have any questions about the role or the company?”

Additional Notes:
	•	Always wait for the applicant’s response before asking the next question.
	•	Keep the conversation professional yet conversational to make the applicant feel comfortable.
	•	Adapt questions slightly based on the applicant’s previous responses.
	•	Do not ask repetitive or irrelevant questions.
	•	Do not ask any question related to remote or hybrid rold i.e "Are you open to remote, hybrid, or in-office work?"
  `;
        const conversation =
            (_a =
                chatMessages === null || chatMessages === void 0
                    ? void 0
                    : chatMessages.map((item) => {
                          if (
                              item === null || item === void 0
                                  ? void 0
                                  : item.isFromBot
                          ) {
                              return {
                                  role: 'assistant',
                                  content:
                                      item === null || item === void 0
                                          ? void 0
                                          : item.content,
                              };
                          } else {
                              return {
                                  role: 'user',
                                  content:
                                      item === null || item === void 0
                                          ? void 0
                                          : item.content,
                              };
                          }
                      })) === null || _a === void 0
                ? void 0
                : _a.reverse();
        const gptMessagesHistory = [
            { role: 'system', content: gptSystemContext },
            ...conversation,
        ];
        console.log('gptMessagesHistory', gptMessagesHistory);
        const gptApiResponse = await callChatGPTForJobApplicationChat(
            gptMessagesHistory
        );
        if (gptApiResponse) {
            // call thw palm api to get the response message and then store that message in messages and also update the last message in chat
            const initialMessage = {
                chatId: chat === null || chat === void 0 ? void 0 : chat._id,
                senderId: null,
                content: gptApiResponse,
                isFromBot: true,
                isEmployerResponse: false,
                messageType: types_1.MessageType.text,
            };
            // Save chat to MongoDB
            const newMessage = await new models_1.Message(initialMessage);
            newMessage.save();
            const updatedPayload = {
                last_message: gptApiResponse,
                lastMessageTimestamp: new Date(),
            };
            await models_1.Chat.findByIdAndUpdate(
                chat === null || chat === void 0 ? void 0 : chat._id,
                updatedPayload,
                {
                    new: true,
                }
            );
            const updatedChat = await models_1.Chat.findById(
                chat === null || chat === void 0 ? void 0 : chat._id
            ).populate({
                path: 'participants.userId',
                model: 'user',
            });
            (0, pusher_methods_1.realTimeEventForChatMessage)(
                updatedChat,
                newMessage
            );
            return null;
        } else {
            console.error('Failed to generate response from OpenAi');
            return null;
        }
    } catch (error) {
        throw new Error(
            `Error while generating Chatbot response: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.respondWithBotOnUserMessage = respondWithBotOnUserMessage;
//# sourceMappingURL=openai.methods.js.map
