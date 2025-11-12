export declare const createJob: (data: any) => Promise<any>;
export declare const applyForJob: (data: any) => Promise<any>;
export declare const fetchJobById: (id: string) => Promise<any>;
export declare const fetchJobs: (
    page?: number,
    limit?: number,
    startDate?: Date,
    endDate?: Date,
    search?: string,
    includeJobApplications?: string
) => Promise<{
    jobs: any;
    totalJobs: any;
    totalPages: number;
    currentPage: number;
}>;
export declare const fetchAllApplications: (
    page?: number,
    limit?: number
) => Promise<{
    applications: any;
    totalApplications: any;
    totalPages: number;
    currentPage: number;
}>;
export declare const fetchSavedJobs: (
    applicantId: string,
    page?: number,
    limit?: number
) => Promise<{
    jobs: any;
    totalJobs: any;
}>;
export declare const fetchAppliedJobs: (
    applicantId: string,
    page?: number,
    limit?: number
) => Promise<{
    jobs: any;
    totalJobs: any;
}>;
export declare const removeJob: (id: string) => Promise<any>;
export declare const fetchJobByUserId: (
    id: any,
    includeJobApplications: any
) => Promise<any>;
export declare const fetchJobsByEmployerEmail: (
    email: string,
    includeJobApplications: string,
    page: number,
    limit: number
) => Promise<{
    jobs: any;
    totalPages: number;
    currentPage: number;
}>;
export declare const fetchDashboardsJobByUserId: (id: any) => Promise<any>;
export declare const getEmployerDashobardSwipeCounts: (
    jobs: any
) => Promise<any>;
export declare const getEmployerDashobardApplicationCounts: (
    jobIds: any
) => Promise<any>;
export declare const updateJob: (id: string, data: any) => Promise<any>;
export declare const fetchApplicationsById: (id: string) => Promise<any>;
export declare const updateApplicationById: (
    applicationId: string,
    status: string
) => Promise<any>;
