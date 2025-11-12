import express, { Express } from 'express';
import setupLogger from './logger';
const cookieParser = require('cookie-parser');
export default (app: Express) => {
    setupLogger(app);
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
};
