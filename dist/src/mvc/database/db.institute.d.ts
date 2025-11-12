export declare const findInstituteByEmail: (email: string) => Promise<any>;
export declare const findNearestInstitues: (
    longitude: number,
    latitude: number
) => Promise<any>;
export declare const findInstituteById: (id: string) => Promise<any>;
export declare const createProgram: (data: any) => Promise<any>;
export declare const findProgramByName: (name: string) => Promise<any>;
export declare const findProgramById: (id: string) => Promise<any>;
export declare const findPrograms: (
    approved?: string,
    search?: string,
    limit?: number,
    page?: number
) => Promise<{
    programs: any;
    totalPrograms: any;
    totalPages: number;
    currentPage: number;
}>;
export declare const findInstituteUsersByProgramId: (
    programId: string,
    instituteId: string,
    page: number,
    limit: number,
    startDate?: Date,
    endDate?: Date,
    search?: string
) => Promise<{
    users: any;
    totalUsers: any;
}>;
export declare const findInstitutes: (
    page?: number,
    limit?: number,
    approved?: string,
    startDate?: Date,
    endDate?: Date,
    search?: string
) => Promise<{
    institutes: any;
    totalInstitutes: any;
    totalPages: number;
    currentPage: number;
}>;
export declare const findInstitutesOfConsortiumByInstituteId: (
    page: number,
    limit: number,
    instituteId: string,
    approved?: string,
    startDate?: Date,
    endDate?: Date,
    search?: string
) => Promise<{
    institutes: any;
    totalInstitutes: any;
    totalPages: number;
    currentPage: number;
}>;
export declare const findInstituteTeachers: (
    instituteId: any,
    page?: number,
    limit?: number,
    startDate?: Date,
    endDate?: Date,
    search?: string,
    role?: string
) => Promise<{
    teachers: any;
    totalTeachers: any;
}>;
export declare const registerInstitute: (data: any) => Promise<any>;
export declare const registerProgram: (data: any) => Promise<any>;
export declare const findInstituteByIdAndUpdate: (
    id: string,
    data: any
) => Promise<any>;
export declare const findInstituteEmployers: (
    page: number,
    limit: number,
    startDate?: Date,
    endDate?: Date,
    search?: string
) => Promise<{
    employers: any;
    totalEmployers: any;
    totalPages: number;
    currentPage: number;
}>;
export declare const findUsersByRole: (
    role: string,
    page: number,
    limit: number
) => Promise<{
    users: any;
    totalUsers: any;
    totalPages: number;
    currentPage: number;
}>;
export declare const findUser: (userId: any) => Promise<any>;
export declare const findProgramsWithStudents: (
    institutionId: string,
    page: number,
    limit: number
) => Promise<{
    programsWithStudents: any;
    totalPrograms: any;
}>;
export declare const findJobsByInstitute: (
    instituteId: any,
    page: any,
    limit: any
) => Promise<any>;
