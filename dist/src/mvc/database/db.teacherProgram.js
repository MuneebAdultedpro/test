'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.findTeacherByIdAndUpdate =
    exports.updateTeacherPrograms =
    exports.findUnApprovedTeacher =
    exports.findTeacher =
    exports.getTeacherProgram =
    exports.getStudentsForTeacher =
    exports.assignprogramsToTeacher =
        void 0;
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const models_1 = require('../models');
const types_1 = require('../../interfaces/types');
const assignprogramsToTeacher = async (data) => {
    try {
        const teacher = await new models_1.TeacherProgram(data);
        return teacher.save();
    } catch (error) {
        throw new Error(
            `Error assigning program to teacher: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.assignprogramsToTeacher = assignprogramsToTeacher;
const getStudentsForTeacher = async (teacher_id) => {
    try {
        const results = await models_1.TeacherProgram.aggregate([
            {
                $match: {
                    teacher_id: new mongoose_1.default.Types.ObjectId(
                        teacher_id
                    ),
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'program_ids',
                    foreignField: 'program_id',
                    as: 'students',
                },
            },
            {
                $unwind: {
                    path: '$students',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $match: {
                    'students.role': { $in: ['Student'] }, // Match users with 'student' role
                },
            },
            {
                $group: {
                    _id: '$_id',
                    students: { $push: '$students' },
                },
            },
        ]);
        return results[0] ? results[0].students : [];
    } catch (error) {
        console.error('Error fetching students for teacher:', error);
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
        };
    }
};
exports.getStudentsForTeacher = getStudentsForTeacher;
const getTeacherProgram = async (teacher_id) => {
    try {
        const teacherObjectId = new mongoose_1.default.Types.ObjectId(
            teacher_id
        );
        const teacherPrograms = await models_1.TeacherProgram.aggregate([
            { $match: { teacher_id: teacherObjectId } },
            {
                $lookup: {
                    from: 'programs',
                    localField: 'program_ids',
                    foreignField: '_id',
                    as: 'programDetails',
                },
            },
            {
                $project: {
                    _id: 0,
                    teacher_id: 1,
                    programDetails: 1,
                },
            },
        ]);
        return (
            teacherPrograms === null || teacherPrograms === void 0
                ? void 0
                : teacherPrograms.length
        )
            ? teacherPrograms
            : [];
    } catch (error) {
        console.error('Error fetching teacher programs:', error);
        throw error;
    }
};
exports.getTeacherProgram = getTeacherProgram;
const findTeacher = async (teacherId) => {
    try {
        const teacherExist = await models_1.TeacherProgram.findOne({
            teacher_id: teacherId,
        });
        return teacherExist;
    } catch (error) {
        return false;
    }
};
exports.findTeacher = findTeacher;
const findUnApprovedTeacher = async ({ page = 1, limit = 10, search = '' }) => {
    try {
        const skip = (page - 1) * limit;
        const query = {
            $or: [
                { approved_by_admin: false },
                { approved_by_admin: { $exists: false } },
            ],
            role: { $in: [types_1.Role.Teacher, types_1.Role.Admin] },
            name: { $regex: search, $options: 'i' },
        };
        const unApprovedTeachers = await models_1.User.find(query)
            .select('name email institute_id createdAt updatedAt')
            .populate('institute_id')
            .skip(skip)
            .limit(limit);
        const totalTeachers = await models_1.User.countDocuments(query);
        return {
            unApprovedTeachers,
            totalTeachers,
            currentPage: page,
            totalPages: Math.ceil(totalTeachers / limit),
        };
    } catch (error) {
        console.error('Error fetching unapproved teachers:', error);
        return false;
    }
};
exports.findUnApprovedTeacher = findUnApprovedTeacher;
const updateTeacherPrograms = async (teacher_Id, program_ids) => {
    try {
        const updatedTeacherProgram =
            await models_1.TeacherProgram.findByIdAndUpdate(
                teacher_Id,
                { $addToSet: { program_ids: { $each: program_ids } } },
                { new: true }
            );
        return updatedTeacherProgram;
    } catch (error) {
        console.error('Error updating teacher programs:', error);
        return false;
    }
};
exports.updateTeacherPrograms = updateTeacherPrograms;
const findTeacherByIdAndUpdate = async (id, data) => {
    try {
        // First, update the document and retrieve the ID of the updated document
        await models_1.User.findByIdAndUpdate(id, data, {
            new: true,
        });
        // Then, retrieve the updated document with population
        const updatedDocument = await models_1.User.findById(id);
        if (!updatedDocument) {
            throw new Error('user not found');
        }
        return updatedDocument;
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
};
exports.findTeacherByIdAndUpdate = findTeacherByIdAndUpdate;
//# sourceMappingURL=db.teacherProgram.js.map
