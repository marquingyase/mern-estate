import express from "express";
import { signIn, signUp, googleSignIn } from "../controllers/auth.controller.js";

const router = express.Router();

// POST request
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/google", googleSignIn);

export default router;
