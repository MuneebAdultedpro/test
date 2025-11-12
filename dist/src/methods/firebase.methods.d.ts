import admin from 'firebase-admin';
export declare const verifyFirebaseToken: (
    req: any,
    res: any,
    next: any
) => Promise<any>;
export declare const firebaseDB: admin.firestore.Firestore;
export declare const postFcmToken: (req: any, res: any) => Promise<void>;
export declare const sendPushNotifications: (
    tokens: any,
    title: any,
    message: any,
    truncate: boolean,
    type: any,
    extreData?: {}
) => Promise<void>;
