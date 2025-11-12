import { Request } from 'express';
declare const getChatMessages: (req: Request) => Promise<
    | {
          messages: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          messages?: undefined;
      }
>;
export declare const sendPushNotificationForChatParticipents: (
    chat: any,
    message: any
) => Promise<void>;
declare const sendMessage: (req: Request) => Promise<
    | {
          newMessage: any;
          chat: any;
          message: string;
          statusCode: number;
          success: boolean;
      }
    | {
          success: boolean;
          statusCode: number;
          message: any;
          newMessage?: undefined;
          chat?: undefined;
      }
>;
export { getChatMessages, sendMessage };
