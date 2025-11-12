import mongoose from 'mongoose';

type IDBType = {};
type ISchemaType = typeof mongoose.Schema;

interface IUser {
    name: String;
    email: String;
    mobile: String;
    password: String;
}

interface CareerPath {
    keyword: string;
    value: string;
    count: number;
    whyChoose?: string; // Optional property
}

export { IDBType, ISchemaType, IUser, CareerPath };
