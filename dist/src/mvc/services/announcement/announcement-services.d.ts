import { Request } from 'express';
declare const getAnnouncementsList: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          announcements: any;
          totalAnnouncements: any;
          totalPages: any;
          currentPage: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          announcements?: undefined;
          totalAnnouncements?: undefined;
          totalPages?: undefined;
          currentPage?: undefined;
      }
>;
declare const getInstituteAnnouncementsList: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          announcements: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          announcements?: undefined;
      }
>;
declare const getStudentAnnouncementsList: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          announcements: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          announcements?: undefined;
      }
>;
declare const getAnnouncementById: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          announcement: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          announcement?: undefined;
      }
>;
declare const createAnnouncement: (req: Request) => Promise<
    | {
          announcement: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          announcement?: undefined;
      }
>;
declare const updateAnnouncement: (req: Request) => Promise<
    | {
          announcement: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          announcement?: undefined;
      }
>;
export {
    getAnnouncementsList,
    getInstituteAnnouncementsList,
    getAnnouncementById,
    createAnnouncement,
    updateAnnouncement,
    getStudentAnnouncementsList,
};
