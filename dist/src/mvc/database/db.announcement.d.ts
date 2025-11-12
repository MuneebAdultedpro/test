export declare const fetchAllAnnouncements: (
    search?: string,
    limit?: number,
    page?: number
) => Promise<{
    announcements: any;
    totalAnnouncements: any;
    totalPages: number;
    currentPage: number;
}>;
export declare const fetchInstitueAnnouncements: (
    instituteId: any
) => Promise<any>;
export declare const fetchStudentAnnouncements: (
    instituteId: any,
    userId: any
) => Promise<any>;
export declare const fetchAnnouncementById: (
    announcementId: any
) => Promise<any>;
export declare const createNewAnnouncement: (data: any) => Promise<any>;
export declare const findAnnouncementByIdAndUpdate: (
    id: string,
    data: any
) => Promise<any>;
