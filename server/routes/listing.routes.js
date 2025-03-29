import express from "express";
import { add } from "../controllers/listing.controller.js";
import { upload } from "../utils/cloudinary.js";
import { middleware } from "../utils/middleware.js";

const router = express.Router();

router.post("/add", upload.single("file"), middleware, add);

export default router;