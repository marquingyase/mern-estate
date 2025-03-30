import express from "express";
import { updateUser, deleteUser, getUserListing } from "../controllers/user.controller.js";
import { upload } from "../utils/cloudinary.js";
import { middleware } from "../utils/middleware.js";

const router = express.Router();

router.put("/update-user/:id", upload.single("file"), middleware, updateUser);
router.delete("/delete-user/:id",  middleware, deleteUser);
router.get("/listings/:id",  middleware, getUserListing);

export default router;
