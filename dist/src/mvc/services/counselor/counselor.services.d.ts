import { Request } from 'express';
declare const getAllDocs: (req: Request) => Promise<
    | {
          message: string;
          statusCode: number;
          success: boolean;
          documents: any;
          totalDocuments: any;
          totalPages: any;
          currentPage: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          documents?: undefined;
          totalDocuments?: undefined;
          totalPages?: undefined;
          currentPage?: undefined;
      }
>;
declare const getInstitutionDocs: (req: Request) => Promise<
    | {
          message: string;
          statusCode: number;
          success: boolean;
          documents: any;
          totalDocuments: any;
          totalPages: any;
          currentPage: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          documents?: undefined;
          totalDocuments?: undefined;
          totalPages?: undefined;
          currentPage?: undefined;
      }
>;
declare const updateDoc: (req: Request) => Promise<
    | {
          document: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          document?: undefined;
      }
>;
declare const deleteDoc: (req: Request) => Promise<
    | {
          document: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          document?: undefined;
      }
>;
export { getAllDocs, updateDoc, getInstitutionDocs, deleteDoc };
