import express from "express";
import { SignUp } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", SignUp);

export default router;
