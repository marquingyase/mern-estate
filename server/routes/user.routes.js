import express from "express";
import { uploadImage } from "../controllers/user.controller.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

router.put("/upload-image", upload.single("file"), uploadImage);

export default router;
