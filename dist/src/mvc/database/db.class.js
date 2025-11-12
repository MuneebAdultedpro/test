'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getStudentsByClassId =
    exports.UpdateClass =
    exports.deletClass =
    exports.assignTeacherToClasses =
    exports.getClassesByFilter =
    exports.getClassById =
    exports.getAllClasses =
    exports.computeAverageProfileCompletion =
    exports.createClass =
        void 0;
const tslib_1 = require('tslib');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
const models_1 = require('../models');
const types_1 = require('../../interfaces/types');
const createClass = async (newClass) => {
    try {
        const newclass = await new models_1.Class(newClass);
        const savedClass = await newclass.save();
        // Populate fields after saving
        const populatedClass = await models_1.Class.findById(savedClass._id)
            .populate('program_id', 'name')
            .populate('institute_id', 'name')
            .populate('createdBy', 'name role')
            .populate('AssignedTo', 'name role')
            .populate('students', 'name role')
            .exec();
        return populatedClass;
    } catch (error) {
        throw new Error(
            `Error Creating class: ${
                error === null || error === void 0 ? void 0 : error.message
            }`
        );
    }
};
exports.createClass = createClass;
const computeAverageProfileCompletion = (classes, profileCompletionStatus) => {
    var _a, _b, _c;
    let processedClasses =
        (_a = classes === null || classes === void 0 ? void 0 : classes.map) ===
            null || _a === void 0
            ? void 0
            : _a.call(classes, (cls) => {
                  var _a, _b, _c;
                  const studentPercentages =
                      (_b =
                          (_a =
                              (cls === null || cls === void 0
                                  ? void 0
                                  : cls.students) || []) === null ||
                          _a === void 0
                              ? void 0
                              : _a.map((student) =>
                                    student === null || student === void 0
                                        ? void 0
                                        : student.profile_completion_percentage
                                )) === null || _b === void 0
                          ? void 0
                          : _b.filter((p) => typeof p === 'number');
                  const averageProfileCompletion = (
                      studentPercentages === null ||
                      studentPercentages === void 0
                          ? void 0
                          : studentPercentages.length
                  )
                      ? (studentPercentages === null ||
                        studentPercentages === void 0
                            ? void 0
                            : studentPercentages.reduce(
                                  (sum, val) => sum + val,
                                  0
                              )) /
                        (studentPercentages === null ||
                        studentPercentages === void 0
                            ? void 0
                            : studentPercentages.length)
                      : 0;
                  return Object.assign(
                      Object.assign(
                          {},
                          (_c =
                              cls === null || cls === void 0
                                  ? void 0
                                  : cls.toObject) === null || _c === void 0
                              ? void 0
                              : _c.call(cls)
                      ),
                      {
                          averageProfileCompletion: Math.round(
                              averageProfileCompletion
                          ),
                      }
                  );
              });
    if (profileCompletionStatus === types_1.ProfileCompletionStatus.completed) {
        processedClasses =
            (_b =
                processedClasses === null || processedClasses === void 0
                    ? void 0
                    : processedClasses.filter) === null || _b === void 0
                ? void 0
                : _b.call(
                      processedClasses,
                      (cls) =>
                          (cls === null || cls === void 0
                              ? void 0
                              : cls.averageProfileCompletion) === 100
                  );
    } else if (
        profileCompletionStatus === types_1.ProfileCompletionStatus.notCompleted
    ) {
        processedClasses =
            (_c =
                processedClasses === null || processedClasses === void 0
                    ? void 0
                    : processedClasses.filter) === null || _c === void 0
                ? void 0
                : _c.call(
                      processedClasses,
                      (cls) =>
                          (cls === null || cls === void 0
                              ? void 0
                              : cls.averageProfileCompletion) < 100
                  );
    }
    return processedClasses;
};
exports.computeAverageProfileCompletion = computeAverageProfileCompletion;
const getAllClasses = async (instituteId, sortBy, profileCompletionStatus) => {
    try {
        const sortOrder = sortBy === 'asc' ? 1 : -1;
        let classes = await models_1.Class.find({ institute_id: instituteId })
            .populate('program_id', 'name')
            .populate('institute_id', 'name')
            .populate('createdBy', 'name role')
            .populate('AssignedTo', 'name role')
            .populate('students', 'name role profile_completion_percentage')
            .sort({ createdAt: sortOrder || -1 });
        if (
            !(classes === null || classes === void 0 ? void 0 : classes.length)
        ) {
            return [];
        }
        return (0, exports.computeAverageProfileCompletion)(
            classes,
            profileCompletionStatus
        );
    } catch (error) {
        throw new Error(`Error getting classes: ${error.message}`);
    }
};
exports.getAllClasses = getAllClasses;
//findUserById
const getClassById = async (id) => {
    try {
        const foundClass = await models_1.Class.findById(id)
            .populate('program_id', 'name')
            .populate('institute_id', 'name')
            .populate('createdBy', 'name role')
            .populate('AssignedTo', 'name role')
            .populate('students', 'name role');
        return foundClass;
    } catch (error) {
        throw new Error(`Error getting classes: ${error.message}`);
    }
};
exports.getClassById = getClassById;
const getClassesByFilter = async (filter, sortBy, profileCompletionStatus) => {
    try {
        const sortOrder = sortBy === 'asc' ? 1 : -1;
        let classes = await models_1.Class.find(filter)
            .populate('program_id', 'name')
            .populate('institute_id', 'name')
            .populate('createdBy', 'name role')
            .populate('AssignedTo', 'name role')
            .populate('students', 'name role profile_completion_percentage')
            .sort({ createdAt: sortOrder || -1 });
        return (0, exports.computeAverageProfileCompletion)(
            classes,
            profileCompletionStatus
        );
    } catch (error) {
        throw new Error('Error fetching classes');
    }
};
exports.getClassesByFilter = getClassesByFilter;
const assignTeacherToClasses = async (teacherId, classesIds) => {
    try {
        await models_1.Class.updateMany(
            { _id: { $in: classesIds } }, // Find all classes with IDs in classesIds
            { $set: { AssignedTo: teacherId } } // Assign the teacher to each class
        );
        return { message: 'Teacher assigned successfully', success: true };
    } catch (error) {
        throw new Error(`Error assigning teacher to classes: ${error.message}`);
    }
};
exports.assignTeacherToClasses = assignTeacherToClasses;
const deletClass = async (classId) => {
    try {
        return await models_1.Class.findByIdAndDelete(classId);
    } catch (error) {
        throw new Error(`Error deleting class: ${error.message}`);
    }
};
exports.deletClass = deletClass;
const UpdateClass = async (classId, data) => {
    try {
        return await models_1.Class.findByIdAndUpdate(classId, data, {
            new: true,
        })
            .populate('program_id', 'name')
            .populate('institute_id', 'name')
            .populate('createdBy', 'name role')
            .populate('AssignedTo', 'name role')
            .populate('students', 'name role');
    } catch (error) {
        throw new Error(`Error Updating class: ${error.message}`);
    }
};
exports.UpdateClass = UpdateClass;
const getStudentsByClassId = async (classId) => {
    var _a;
    try {
        const matchStage = {
            _id: new mongoose_1.default.Types.ObjectId(classId),
        };
        // Aggregate pipeline
        const pipeline = [
            { $match: matchStage },
            // Lookup students from the users collection
            {
                $lookup: {
                    from: 'users',
                    localField: 'students',
                    foreignField: '_id',
                    as: 'students',
                },
            },
            { $unwind: '$students' },
            // Lookup job applications for each student
            {
                $lookup: {
                    from: 'job_applications',
                    localField: 'students._id',
                    foreignField: 'candidate_id',
                    as: 'students.jobApplications', // Store job applications inside students
                },
            },
            // Lookup program details
            {
                $lookup: {
                    from: 'programs',
                    localField: 'students.program_id',
                    foreignField: '_id',
                    as: 'students.program',
                },
            },
            // Flatten program array (since lookup returns an array)
            {
                $addFields: {
                    'students.program': {
                        $arrayElemAt: ['$students.program', 0],
                    },
                },
            },
            // Group back the students under the class
            {
                $group: {
                    _id: '$_id',
                    students: { $push: '$students' },
                },
            },
            // Sort students by creation date
            {
                $unwind: '$students',
            },
            { $sort: { 'students.createdAt': -1 } },
            {
                $group: {
                    _id: '$_id',
                    students: { $push: '$students' },
                },
            },
        ];
        const result = await models_1.Class.aggregate(pipeline);
        return result.length > 0
            ? (_a = result[0]) === null || _a === void 0
                ? void 0
                : _a.students
            : [];
    } catch (error) {
        throw new Error(
            `Error retrieving students for class ID ${classId}: ${error.message}`
        );
    }
};
exports.getStudentsByClassId = getStudentsByClassId;
//# sourceMappingURL=db.class.js.map
