import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

// POST request
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);

export default router;
