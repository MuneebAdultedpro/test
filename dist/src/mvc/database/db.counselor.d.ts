export declare const findAllDocs: (
    search?: string,
    limit?: number,
    page?: number
) => Promise<{
    documents: any;
    totalDocuments: any;
    totalPages: number;
    currentPage: number;
}>;
export declare const findInstitutionDocs: (
    institutionId: string,
    search?: string,
    limit?: number,
    page?: number
) => Promise<{
    documents: any;
    totalDocuments: any;
    totalPages: number;
    currentPage: number;
}>;
export declare const findDocByIdAndUpdate: (id: any, data: any) => Promise<any>;
export declare const findDocByIdAndDelete: (id: any) => Promise<any>;
