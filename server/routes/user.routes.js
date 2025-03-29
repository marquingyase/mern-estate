import express from "express";
import { updateUser, deleteUser } from "../controllers/user.controller.js";
import { upload } from "../utils/cloudinary.js";
import { middleware } from "../utils/middleware.js";

const router = express.Router();

router.put("/update-user/:id", upload.single("file"), middleware, updateUser);
router.delete("/delete-user/:id",  middleware, deleteUser);

export default router;
