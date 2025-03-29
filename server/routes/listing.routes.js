import express from "express";
import { add, addImgs } from "../controllers/listing.controller.js";
import { upload } from "../utils/cloudinary.js";
import { middleware } from "../utils/middleware.js";

const router = express.Router();

router.post("/add", middleware, add);
router.post("/add-imgs", upload.any("files"), middleware, addImgs);

export default router;