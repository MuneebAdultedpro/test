import express from "express";
import { userRoutes } from "../routes-strings";
const router = express.Router();

router.get(userRoutes?.login, () => "hello");

export default router;
