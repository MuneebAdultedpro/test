import express from "express";
import { Request, Response } from "express";
import { userRoutes } from "../routes-strings";
const router = express.Router();

const userLogin = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    token: "here is the token",
  });
};

router.get(userRoutes?.login, userLogin);

export default router;
