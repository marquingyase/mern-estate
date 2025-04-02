import express from "express";
import {
  addListing,
  addImgs,
  deleteListing,
  updateListing,
} from "../controllers/listing.controller.js";
import { upload } from "../utils/cloudinary.js";
import { middleware } from "../utils/middleware.js";

const router = express.Router();

router.post("/add", middleware, addListing);
router.post("/add-imgs", upload.any("files"), middleware, addImgs);
router.delete("/update/:id", middleware, updateListing);
router.put("/delete/:id", middleware, deleteListing);

export default router;
