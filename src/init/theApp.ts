import express, { Express } from "express";
import setupLogger from "./logger";
export default (app: Express) => {
  setupLogger(app);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
