import { Express } from "express";

import { authRouter } from "../mvc/routes";
import { baseRoutes, userRoutes } from "../mvc/routes/routes-strings";

export default (app: Express) => {
  app.use(userRoutes.auth, authRouter);
};
