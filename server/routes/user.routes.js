import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { upload } from "../utils/cloudinary.js";
import { middleware } from "../utils/middleware.js";

const router = express.Router();

router.put("/update-user/:id", upload.single("file"), middleware, updateUser);

export default router;
