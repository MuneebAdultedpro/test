export declare const findBranchByEmail: (email: string) => Promise<any>;
export declare const findBranchById: (id: string) => Promise<any>;
export declare const findEmployerByCompanyAndBranch: (
    name: string,
    branchLocation: string
) => Promise<any>;
export declare const findEmployerMainBranch: (name: string) => Promise<any>;
export declare const findBranchByUserId: (id: string) => Promise<any>;
export declare const findEmployerById: (id: string) => Promise<any>;
export declare const findEmployerOpenPositions: (
    branchId: any,
    candidateId: any
) => Promise<any>;
export declare const findAllEmployers: (
    page: number,
    limit: number,
    startDate?: Date,
    endDate?: Date,
    search?: string
) => Promise<{
    employers: any;
    totalEmployers: any;
}>;
export declare const findAllEmployersIds: () => Promise<{
    employers: any;
    totalEmployers: any;
}>;
export declare const findBranches: (
    page: number,
    limit: number,
    startDate?: Date,
    endDate?: Date,
    search?: string
) => Promise<{
    branches: any;
    totalBranches: any;
}>;
export declare const findJobApplicationsByEmployerEmail: (
    employerEmail: string,
    page: number,
    limit: number,
    startDate?: Date,
    endDate?: Date,
    search?: string
) => Promise<{
    applications: any;
    totalApplications: any;
}>;
export declare const findAllJobApplications: (
    page: number,
    limit: number,
    startDate?: Date,
    endDate?: Date,
    search?: string
) => Promise<{
    applications: any;
    totalApplications: any;
}>;
export declare const findBranchesOfEmployer: (
    page: number,
    limit: number,
    startDate?: Date,
    endDate?: Date,
    search?: string,
    employerEmail?: string
) => Promise<{
    branches: any;
    totalBranches: any;
}>;
export declare const registerBranch: (data: any) => Promise<any>;
export declare const registerBranchAndUser: (data: any) => Promise<any>;
export declare const findBranchByIdAndUpdate: (
    id: string,
    data: any
) => Promise<any>;
export declare const removeBranch: (id: string) => Promise<any>;
