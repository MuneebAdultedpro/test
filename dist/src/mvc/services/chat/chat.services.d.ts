import { Request } from 'express';
declare const getTeacherProgramChat: (req: any) => Promise<
    | {
          chats: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          chats?: undefined;
      }
>;
declare const getTeacherStudentChat: (req: any) => Promise<
    | {
          chats: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          chats?: undefined;
      }
>;
declare const getAllChats: (req: Request) => Promise<
    | {
          chats: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          chats?: undefined;
      }
>;
declare const getUserChats: (req: any) => Promise<
    | {
          chats: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          chats?: undefined;
      }
>;
declare const getEmployerChats: (req: any) => Promise<
    | {
          chats: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          chats?: undefined;
      }
>;
declare const getChatWithParticipantIds: (req: any) => Promise<
    | {
          chat: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          chat?: undefined;
      }
>;
declare const getListOfUsersForGroupCreation: (req: any) => Promise<
    | {
          users: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          users?: undefined;
      }
>;
export declare const sendPushNotificationForGroupCreation: (
    groupName: any,
    participants: any,
    creatorName: any
) => Promise<void>;
declare const createGroupChat: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          chat?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          message: string;
          chat: any;
      }
>;
declare const exitChatGroup: (req: any) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          data?: undefined;
      }
    | {
          success: boolean;
          statusCode: number;
          message: string;
          data: any;
      }
>;
declare const getUserChatsByChatType: (req: any) => Promise<
    | {
          chats: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          chats?: undefined;
      }
>;
declare const getInstitueAndStudentChats: (req: any) => Promise<
    | {
          chats: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          chats?: undefined;
      }
>;
declare const getStudentEmployerChats: (req: any) => Promise<
    | {
          chats: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          chats?: undefined;
      }
>;
declare const getMultipleUsersChats: (req: any) => Promise<
    | {
          chats: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          chats?: undefined;
      }
>;
declare const createChat: (req: Request) => Promise<
    | {
          chat: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          chat?: undefined;
      }
>;
declare const getUsersNotifiedForChatCompletion: (req: Request) => Promise<
    | {
          success: boolean;
          statusCode: number;
          message: string;
          chats: any;
          totalChats: any;
          totalPages: any;
          currentPage: any;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          chats?: undefined;
          totalChats?: undefined;
          totalPages?: undefined;
          currentPage?: undefined;
      }
>;
declare const createChatAndSendMessage: (req: Request) => Promise<
    | {
          chat: any;
          newMessage: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          chat?: undefined;
          newMessage?: undefined;
      }
>;
declare const updateChat: (req: Request) => Promise<
    | {
          chat: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          chat?: undefined;
      }
>;
export {
    getAllChats,
    getUserChats,
    getMultipleUsersChats,
    createChat,
    getStudentEmployerChats,
    updateChat,
    getUserChatsByChatType,
    createChatAndSendMessage,
    getEmployerChats,
    getInstitueAndStudentChats,
    getTeacherStudentChat,
    createGroupChat,
    getTeacherProgramChat,
    getChatWithParticipantIds,
    getUsersNotifiedForChatCompletion,
    exitChatGroup,
    getListOfUsersForGroupCreation,
};
