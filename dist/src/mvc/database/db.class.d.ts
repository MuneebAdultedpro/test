export declare const createClass: (newClass: any) => Promise<any>;
export declare const computeAverageProfileCompletion: (
    classes: any,
    profileCompletionStatus: any
) => any;
export declare const getAllClasses: (
    instituteId: any,
    sortBy: any,
    profileCompletionStatus: any
) => Promise<any>;
export declare const getClassById: (id: any) => Promise<any>;
export declare const getClassesByFilter: (
    filter: any,
    sortBy: any,
    profileCompletionStatus: any
) => Promise<any>;
export declare const assignTeacherToClasses: (
    teacherId: any,
    classesIds: any
) => Promise<{
    message: string;
    success: boolean;
}>;
export declare const deletClass: (classId: any) => Promise<any>;
export declare const UpdateClass: (classId: any, data: any) => Promise<any>;
export declare const getStudentsByClassId: (classId: string) => Promise<any>;
