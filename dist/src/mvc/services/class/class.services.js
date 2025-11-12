'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getClassStudentsService =
    exports.updateClassService =
    exports.deleteClassService =
    exports.assignTeacherToClassesService =
    exports.getClassesByUserIdService =
    exports.getClassByIdService =
    exports.getAllClassesService =
    exports.createClassService =
        void 0;
const tslib_1 = require('tslib');
const db_class_1 = require('../../database/db.class');
const db_user_1 = require('../../database/db.user');
const moment_1 = tslib_1.__importDefault(require('moment'));
const createClassService = async (req) => {
    var _a;
    try {
        const { timings, AssignedTo } = req.body;
        // if (req.user.role.toLowerCase() !== 'admin') {
        //     return {
        //         success: false,
        //         statusCode: 400,
        //         message: 'Access denied. Only Admins can create classes.',
        //     };
        // }
        if (!AssignedTo) {
            return {
                success: false,
                statusCode: 400,
                message: 'please provide Teacher id',
            };
        }
        const teacher = await (0, db_user_1.findUserById)(AssignedTo);
        if (!teacher) {
            return {
                success: false,
                statusCode: 400,
                message: 'Invalid Teacher Id',
            };
        }
        const updatedTimings = timings.map((slot) => {
            const start = (0, moment_1.default)(slot.startTime, 'HH:mm');
            const end = (0, moment_1.default)(slot.endTime, 'HH:mm');
            if (!start.isValid() || !end.isValid()) {
                throw new Error(
                    'Invalid startTime or endTime format. Use HH:mm.'
                );
            }
            const duration = moment_1.default
                .duration(end.diff(start))
                .asMinutes(); // Convert to minutes
            return Object.assign(Object.assign({}, slot), { duration });
        });
        const newClass = await (0, db_class_1.createClass)(
            Object.assign(
                Object.assign(
                    {},
                    req === null || req === void 0 ? void 0 : req.body
                ),
                {
                    timings: updatedTimings,
                    createdBy:
                        (_a =
                            req === null || req === void 0
                                ? void 0
                                : req.user) === null || _a === void 0
                            ? void 0
                            : _a.id,
                }
            )
        );
        if (newClass) {
            return {
                class: newClass,
                message: 'new class created Successfully',
                statusCode: 200,
                success: true,
            };
        } else {
            return {
                success: false,
                statusCode: 400,
                message: 'Error creating Class',
            };
        }
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error,
        };
    }
};
exports.createClassService = createClassService;
const getAllClassesService = async (req) => {
    var _a, _b, _c;
    try {
        const instituteId =
            (_a = req === null || req === void 0 ? void 0 : req.query) ===
                null || _a === void 0
                ? void 0
                : _a.instituteId;
        const sortBy =
            (_b = req === null || req === void 0 ? void 0 : req.query) ===
                null || _b === void 0
                ? void 0
                : _b.sortBy;
        const profileCompletionStatus =
            (_c = req === null || req === void 0 ? void 0 : req.query) ===
                null || _c === void 0
                ? void 0
                : _c.profileCompletionStatus;
        if (!instituteId) {
            return {
                success: false,
                statusCode: 400,
                message: 'Institute id is missing',
            };
        }
        const classes = await (0, db_class_1.getAllClasses)(
            instituteId,
            sortBy,
            profileCompletionStatus
        );
        return {
            success: true,
            statusCode: 200,
            message: 'Classes retrieved successfully',
            classes: classes,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || 'Internal Server Error',
        };
    }
};
exports.getAllClassesService = getAllClassesService;
const getClassByIdService = async (req) => {
    try {
        const { id } = req.query;
        if (!id) {
            return {
                success: false,
                statusCode: 400,
                message: 'Class id is missing',
            };
        }
        const foundClass = await (0, db_class_1.getClassById)(id); // Fetch class by ID
        if (!foundClass) {
            return {
                success: false,
                statusCode: 200,
                message: 'Class not found',
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Class retrieved successfully',
            class: foundClass,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || 'Internal Server Error',
        };
    }
};
exports.getClassByIdService = getClassByIdService;
const getClassesByUserIdService = async (req) => {
    try {
        const userId = req.query.id;
        const role = req.query.role;
        const sortBy = req.query.sortBy;
        const profileCompletionStatus = req.query.profileCompletionStatus;
        let baseFilter = {};
        //if we need institute or program classes just add another condition here can use same api
        if (role.toLowerCase() === 'admin') {
            baseFilter = { createdBy: userId };
        } else if (role.toLowerCase() === 'teacher') {
            baseFilter = { AssignedTo: userId };
        } else if (role.toLowerCase() === 'student') {
            baseFilter = { students: userId };
        } else {
            return {
                success: false,
                statusCode: 400,
                message: 'Access denied. Unauthorized role.',
            };
        }
        const classes = await (0, db_class_1.getClassesByFilter)(
            baseFilter,
            sortBy,
            profileCompletionStatus
        );
        return {
            success: true,
            statusCode: 200,
            message: 'Classes retrieved successfully',
            classes: classes,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || 'Internal Server Error',
        };
    }
};
exports.getClassesByUserIdService = getClassesByUserIdService;
const assignTeacherToClassesService = async (req) => {
    try {
        const { teacherId, classesIds } = req.body;
        const foundClass = await (0, db_class_1.assignTeacherToClasses)(
            teacherId,
            classesIds
        ); // Fetch class by ID
        if (!foundClass.success) {
            return {
                success: false,
                statusCode: 404,
                message: 'Error Assigning teacher',
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Teacher Assigned to selected Classes',
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || 'Internal Server Error',
        };
    }
};
exports.assignTeacherToClassesService = assignTeacherToClassesService;
const updateClassService = async (req) => {
    try {
        const { id } = req.query;
        const updatedData = req.body;
        const updatedClass = await (0, db_class_1.UpdateClass)(id, updatedData);
        if (!updatedClass) {
            return {
                success: false,
                statusCode: 404,
                message: 'Error Updating classs',
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Class Updated Successfully',
            class: updatedClass,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || 'Internal Server Error',
        };
    }
};
exports.updateClassService = updateClassService;
const deleteClassService = async (req) => {
    try {
        const { id } = req.query;
        if (!id) {
            return {
                success: false,
                statusCode: 400,
                message: 'class id is missing',
            };
        }
        const deletedClass = await (0, db_class_1.deletClass)(id);
        if (!deletedClass) {
            return {
                success: false,
                statusCode: 404,
                message: 'Error deleting classs',
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Class deleted Successfully',
            class: deletedClass,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || 'Internal Server Error',
        };
    }
};
exports.deleteClassService = deleteClassService;
const getClassStudentsService = async (req) => {
    try {
        const { id } = req.query;
        const students = await (0, db_class_1.getStudentsByClassId)(id);
        if (
            !students ||
            !(students === null || students === void 0
                ? void 0
                : students.length)
        ) {
            return {
                success: false,
                statusCode: 404,
                message: 'Error getting students',
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'Class deleted Successfully',
            students: students,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || 'Internal Server Error',
        };
    }
};
exports.getClassStudentsService = getClassStudentsService;
//# sourceMappingURL=class.services.js.map
