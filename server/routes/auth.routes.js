import express from "express";
import { signIn, signUp, googleSignIn, logout } from "../controllers/auth.controller.js";

const router = express.Router();

// POST request
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/google", googleSignIn);
router.get("/logout", logout);

export default router;
