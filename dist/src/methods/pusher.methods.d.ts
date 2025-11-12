import Pusher from 'pusher';
declare const pusherClient: Pusher;
export declare const realTimeEventForChatMessage: (
    inCommingChat: any,
    message: any,
    isNewChat?: boolean
) => Promise<void>;
export default pusherClient;
