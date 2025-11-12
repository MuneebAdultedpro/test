export declare const findUserByEmail: (email: string) => Promise<any>;
export declare const findUnClaimedByStudentIdAndInstitueId: (
    student_id: string,
    instituteId: string
) => Promise<any>;
export declare const findUserById: (id: string) => Promise<any>;
export declare const removeUser: (id: string) => Promise<any>;
export declare const findUsers: (
    page: number,
    limit: number,
    startDate?: Date,
    endDate?: Date,
    search?: string
) => Promise<{
    users: any;
    totalUsers: any;
    totalPages: number;
    currentPage: number;
}>;
export declare const registerStudent: (data: any) => Promise<any>;
export declare const registerUser: (data: any) => Promise<any>;
export declare const findAllUsers: (
    page: number,
    limit: number,
    startDate?: Date,
    endDate?: Date,
    search?: string
) => Promise<{
    users: any;
    totalUsers: any;
    totalPages: number;
    currentPage: number;
}>;
export declare const createUser: (data: any) => Promise<any>;
export declare const findInstitudeIdByUserId: (userId: string) => Promise<{
    institueId: any;
}>;
export declare const findUserByIdAndUpdate: (
    id: string,
    data: any
) => Promise<any>;
