export declare const migrateFireStoreJobsToMongodb: () => Promise<void>;
export declare const migrateFireStoreBranchToMongodb: () => Promise<void>;
export declare const uploadUserApplicationToMongoDbFromJsonFile: () => Promise<void>;
export declare const uploadEventToMongoDbFromJsonFile: () => Promise<void>;
export declare const migrateFireStoreUsersToMongodb: () => Promise<void>;
export declare const migrateFireStoreProgramsToMongodb: () => Promise<void>;
export declare const migrateFireStoreTodosToMongodb: () => Promise<void>;
export declare const migrateFireStoreAnnouncementsToMongodb: () => Promise<void>;
export declare const migrateFireStoreAvatarsToMongodb: () => Promise<void>;
export declare const migrateFireStoreLabourMarketeToMongodb: () => Promise<void>;
export declare const migrateFireStorePartnersToMongodb: () => Promise<void>;
export declare const translateJobDescription: (
    text: any,
    targetLanguage: any
) => Promise<any>;
/**
 * Updates job records with translations.
 */
export declare const translateOldJobsInDatabase: () => Promise<void>;
export declare const getStudentsCreatedFromSpecificDate: () => any;
export declare const findAndDeleteEmployersBranches: () => Promise<void>;
export declare const getObjectSize: (obj: any) => {
    bytes: number;
    kilobytes: string;
    megabytes: string;
};
export declare const analyzeBranchMetrics: () => Promise<void>;
export declare const migrateConsortiomToMongoDB: () => Promise<void>;
export declare const convertConsortiomXlsxToJson: () => Promise<void>;
export declare const convertConsortiomWithMembersXlsxToJson: () => Promise<void>;
export declare const migrateConsortiumMembersToMongoDB: () => Promise<void>;
export declare const deleteInstitutesWithFewerUsers: () => Promise<void>;
export declare const findDuplicatInstituitons: () => Promise<void>;
export declare const addNameToBranches: () => Promise<void>;
export declare const transformStudentEducationAndExperienceToNewFormate: () => Promise<void>;
export declare const findEmployersWithMaxBranchSize: () => Promise<void>;
