'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.findInstituteAndStudentChats =
    exports.findUserChatsByChatType =
    exports.getChatofTeacherProgram =
    exports.getStudentsTeacherChat =
    exports.startChatAndMessage =
    exports.startChat =
    exports.findUsersNotifiedForChatCompletion =
    exports.dashboardChatsCount =
    exports.findMultipleUsersChats =
    exports.findStudentEmployerChats =
    exports.findChatWithParticipantIds =
    exports.findEmployerChats =
    exports.findUserChats =
    exports.findChatByIdAndUpdate =
    exports.findAllChats =
        void 0;
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const moment_1 = tslib_1.__importDefault(require('moment'));
const models_1 = require('../models');
const types_1 = require('../../interfaces/types');
const findAllChats = async () => {
    return await models_1.Chat.find();
};
exports.findAllChats = findAllChats;
const findChatByIdAndUpdate = async (chatId, chatData) => {
    try {
        await models_1.Chat.findByIdAndUpdate(chatId, chatData, {
            new: true,
        });
        // Then, retrieve the updated document with population
        const updatedDocument = await models_1.Chat.findById(chatId).populate({
            path: 'participants.userId',
            model: 'user',
        });
        if (!updatedDocument) {
            throw new Error('Chat not found');
        }
        return updatedDocument;
    } catch (error) {
        throw new Error(
            `Error updating Chat: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findChatByIdAndUpdate = findChatByIdAndUpdate;
const findUserChats = async (userId, page = 1, limit = 10, search) => {
    try {
        const query = {
            participants: {
                $elemMatch: {
                    userId: new mongoose_1.default.Types.ObjectId(userId),
                },
            },
        };
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }
        return await models_1.Chat.find(query)
            .sort({ lastMessageTimestamp: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate({ path: 'job_id', model: 'job', select: 'title' })
            .populate({
                path: 'participants.userId',
                model: 'user',
            });
    } catch (error) {
        throw new Error(
            `Error updating Chat: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findUserChats = findUserChats;
const findEmployerChats = async (userId, page = 1, limit = 10, search) => {
    try {
        const query = {
            participants: {
                $elemMatch: {
                    userId: new mongoose_1.default.Types.ObjectId(userId),
                },
            },
            type: 'IS_JOB_APPLICATION_CHAT',
        };
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }
        return await models_1.Chat.find(query)
            .sort({ lastMessageTimestamp: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate({
                path: 'job_id',
                model: 'job',
                select: 'title photo_url',
            })
            .populate({
                path: 'participants.userId',
                model: 'user',
            });
    } catch (error) {
        throw new Error(
            `Error updating Chat: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findEmployerChats = findEmployerChats;
const findChatWithParticipantIds = async (userId, participantId) => {
    try {
        const query = {
            participants: {
                $all: [
                    {
                        $elemMatch: {
                            userId: new mongoose_1.default.Types.ObjectId(
                                userId
                            ),
                        },
                    },
                    {
                        $elemMatch: {
                            userId: new mongoose_1.default.Types.ObjectId(
                                participantId
                            ),
                        },
                    },
                ],
            },
        };
        return await models_1.Chat.find(query)
            .sort({ lastMessageTimestamp: -1 })
            .populate({
                path: 'participants.userId',
                model: 'user',
            });
    } catch (error) {
        throw new Error(
            `Error updating Chat: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findChatWithParticipantIds = findChatWithParticipantIds;
const findStudentEmployerChats = async (
    userId,
    jobId,
    page = 1,
    limit = 10,
    search
) => {
    try {
        const query = {
            participants: {
                $elemMatch: {
                    userId: new mongoose_1.default.Types.ObjectId(userId),
                },
            },
            job_id: new mongoose_1.default.Types.ObjectId(jobId),
        };
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }
        return await models_1.Chat.find(query)
            .sort({ lastMessageTimestamp: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate({ path: 'job_id', model: 'job', select: 'title' })
            .populate({
                path: 'participants.userId',
                model: 'user',
            });
    } catch (error) {
        throw new Error(
            `Error updating Chat: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findStudentEmployerChats = findStudentEmployerChats;
const findMultipleUsersChats = async (
    userIds,
    page = 1,
    limit = 10,
    search
) => {
    const query = {
        participants: {
            $elemMatch: {
                userId: {
                    $in: userIds.map(
                        (id) => new mongoose_1.default.Types.ObjectId(id)
                    ),
                },
            },
        },
    };
    if (search) {
        query.title = { $regex: search, $options: 'i' };
    }
    return await models_1.Chat.find(query)
        .sort({ lastMessageTimestamp: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate({
            path: 'participants.userId',
            model: 'user',
        });
};
exports.findMultipleUsersChats = findMultipleUsersChats;
const dashboardChatsCount = async (userId, studentIds) => {
    // Create an array of IDs starting with the userId
    const userIds = [new mongoose_1.default.Types.ObjectId(userId)];
    // If studentIds are provided, concatenate them to the userIds array
    if (
        studentIds === null || studentIds === void 0
            ? void 0
            : studentIds.length
    ) {
        userIds.push(
            ...studentIds.map((id) => new mongoose_1.default.Types.ObjectId(id))
        );
    }
    const query = {
        participants: {
            $elemMatch: {
                userId: { $in: userIds }, // Use $in to match any of the userIds
            },
        },
    };
    // Count the number of chats for the combined user IDs
    const totalChatsCount = await models_1.Chat.countDocuments(query);
    return totalChatsCount;
};
exports.dashboardChatsCount = dashboardChatsCount;
const findUsersNotifiedForChatCompletion = async (
    page,
    limit,
    startDate,
    endDate
) => {
    try {
        const query = {
            incompleteChatReminderSentDateForStudent: {
                $exists: true,
                $ne: null,
            },
        };
        if (startDate && endDate) {
            query.incompleteChatReminderSentDateForStudent = {
                $gte: (0, moment_1.default)(startDate).startOf('day').toDate(),
                $lte: (0, moment_1.default)(endDate).endOf('day').toDate(),
            };
        }
        const totalChats = await models_1.Chat.countDocuments(query);
        const totalPages = Math.ceil(totalChats / limit);
        const chats = await models_1.Chat.find(query)
            .sort({ incompleteChatReminderSentDateForStudent: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate({
                path: 'participants.userId',
                model: 'user',
                select: 'name email role institute_id',
                populate: {
                    path: 'institute_id',
                    model: 'institution',
                    select: 'name',
                },
            })
            .populate({
                path: 'job_id',
                model: 'job',
                select: 'title',
            });
        return {
            chats: chats,
            totalChats,
            totalPages,
            currentPage: page,
        };
    } catch (error) {
        throw new Error(`Error retrieving chat alerts: ${error.message}`);
    }
};
exports.findUsersNotifiedForChatCompletion = findUsersNotifiedForChatCompletion;
const startChat = async (chatData) => {
    try {
        // Create the new chat document
        const newChat = new models_1.Chat(
            Object.assign(Object.assign({}, chatData), {
                createdAt: new Date(),
                updatedAt: new Date(),
                lastMessageTimestamp: new Date(),
            })
        );
        const savedChat = await newChat.save();
        // Populate the participants with user data
        const populatedChat = await savedChat.populate({
            path: 'participants.userId',
            model: 'user',
        });
        // Return the populated chat
        return populatedChat;
    } catch (error) {
        console.error('Error creating chat:', error);
        throw new Error('Error creating chat');
    }
};
exports.startChat = startChat;
const startChatAndMessage = async (chatData, messageData) => {
    var _a, _b;
    try {
        let populatedChat;
        // Step 1: Check if the same chat already exist then dont create new chat instead just update the old chat
        const participantIds =
            (_b =
                (_a =
                    chatData === null || chatData === void 0
                        ? void 0
                        : chatData.participants) === null || _a === void 0
                    ? void 0
                    : _a.map) === null || _b === void 0
                ? void 0
                : _b.call(_a, (p) =>
                      p === null || p === void 0 ? void 0 : p.userId
                  );
        const existingChat = await models_1.Chat.findOne({
            type:
                chatData === null || chatData === void 0
                    ? void 0
                    : chatData.type,
            $expr: {
                $eq: [
                    { $size: '$participants' },
                    participantIds === null || participantIds === void 0
                        ? void 0
                        : participantIds.length,
                ],
            },
            'participants.userId': { $all: participantIds }, // Ensure all userIds match
        });
        if (existingChat) {
            populatedChat = await existingChat.populate({
                path: 'participants.userId',
                model: 'user',
            });
        } else {
            // Step 2: Create Chat
            const newChat = new models_1.Chat(
                Object.assign(Object.assign({}, chatData), {
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    lastMessageTimestamp: new Date(),
                })
            );
            const savedChat = await newChat.save();
            // Populate participants
            populatedChat = await savedChat.populate({
                path: 'participants.userId',
                model: 'user',
            });
        }
        // Step 3: Create Message
        const messageWithChatId = Object.assign(
            Object.assign({}, messageData),
            { chatId: populatedChat._id }
        );
        const newMessage = await new models_1.Message(messageWithChatId).save();
        // Step 4: Update Chat's last message details
        populatedChat.last_message = newMessage.content;
        populatedChat.lastMessageTimestamp = new Date();
        await populatedChat.save();
        // Return the newly created chat and message
        return { chat: populatedChat, newMessage };
    } catch (error) {
        console.error('Error creating chat:', error);
        throw new Error('Error creating chat');
    }
};
exports.startChatAndMessage = startChatAndMessage;
const getStudentsTeacherChat = async (teacher_id) => {
    try {
        const results = await models_1.Chat.aggregate([
            {
                $match: {
                    'participants.userId':
                        new mongoose_1.default.Types.ObjectId(teacher_id),
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'participants.userId',
                    foreignField: '_id',
                    as: 'userDetails',
                },
            },
            {
                $unwind: '$userDetails', // Flatten the array
            },
            {
                $match: {
                    'userDetails.role': { $in: [types_1.Role.Student] }, // Ensure one of the users is a student
                },
            },
            {
                $project: {
                    _id: 1,
                    job_id: 1,
                    last_message: 1,
                    groupName: 1,
                    groupPhoto: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    lastMessageTimestamp: 1,
                    participants: 1,
                },
            },
        ]);
        return (
            results === null || results === void 0 ? void 0 : results.length
        )
            ? results
            : [];
    } catch (error) {
        console.error('Error fetching students for teacher:', error);
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
        };
    }
};
exports.getStudentsTeacherChat = getStudentsTeacherChat;
const getChatofTeacherProgram = async (
    teacher_id,
    program_id,
    institute_id
) => {
    try {
        const results = await models_1.User.aggregate([
            {
                $match: {
                    program_id: new mongoose_1.default.Types.ObjectId(
                        program_id
                    ),
                    institute_id: new mongoose_1.default.Types.ObjectId(
                        institute_id
                    ),
                    role: types_1.Role.Student,
                },
            },
            {
                $lookup: {
                    from: 'chats',
                    let: { studentId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $in: [
                                                '$$studentId',
                                                '$participants.userId',
                                            ],
                                        },
                                        {
                                            $in: [
                                                new mongoose_1.default.Types.ObjectId(
                                                    teacher_id
                                                ),
                                                '$participants.userId',
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 1,
                                participants: 1,
                                last_message: 1,
                                type: 1,
                                createdAt: 1,
                                updatedAt: 1,
                                lastMessageTimestamp: 1,
                            },
                        },
                    ],
                    as: 'chats',
                },
            },
            {
                $match: {
                    'chats.0': { $exists: true },
                },
            },
            {
                $unwind: {
                    path: '$chats',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $group: {
                    _id: '$chats._id',
                    chat: {
                        $first: {
                            $mergeObjects: [
                                '$chats',
                                {
                                    studentdetails: {
                                        _id: '$_id',
                                        name: '$name',
                                        email: '$email',
                                        role: '$role',
                                        photo_url: '$photo_url',
                                        firebaseId: '$firebaseId',
                                    },
                                },
                            ],
                        },
                    },
                },
            },
            {
                $sort: { 'chat.lastMessageTimestamp': -1 },
            },
        ]);
        return (
            results === null || results === void 0 ? void 0 : results.length
        )
            ? results
            : [];
    } catch (error) {
        console.error('Error fetching teacher program chat:', error);
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
        };
    }
};
exports.getChatofTeacherProgram = getChatofTeacherProgram;
const findUserChatsByChatType = async (
    userId,
    page = 1,
    limit = 10,
    chatType,
    search
) => {
    try {
        const query = {
            participants: {
                $elemMatch: {
                    userId: new mongoose_1.default.Types.ObjectId(userId),
                },
            },
            type: chatType,
            // 'participants.userId': {
            //     $in: await User.find({ role: { $in: allowedRoles } }).distinct(
            //         '_id'
            //     ),
            // },
        };
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }
        return await models_1.Chat.find(query)
            .sort({ lastMessageTimestamp: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate({
                path: 'participants.userId',
                model: 'user',
            });
    } catch (error) {
        throw new Error(
            `Error fetching Chats: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findUserChatsByChatType = findUserChatsByChatType;
const findInstituteAndStudentChats = async (
    userId,
    page = 1,
    limit = 10,
    search
) => {
    try {
        const query = {
            participants: {
                $elemMatch: {
                    userId: new mongoose_1.default.Types.ObjectId(userId),
                },
            },
            type: {
                $in: ['TEACHER_TO_STUDENT', 'ADMIN_TO_STUDENT'],
            },
        };
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }
        return await models_1.Chat.find(query)
            .sort({ lastMessageTimestamp: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate({
                path: 'participants.userId',
                model: 'user',
            });
    } catch (error) {
        throw new Error(
            `Error fetching Chats: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.findInstituteAndStudentChats = findInstituteAndStudentChats;
//# sourceMappingURL=db.chat.js.map
