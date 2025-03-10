import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";
import { v2 } from "cloudinary";
import { configDotenv } from "dotenv";

configDotenv();
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: "mern-estate",
    public_id: (req, file) =>
      `${file.originalname.split(".").at(0)}-${
        Date.now() + "-" + Math.round(Math.random() * 1e9)
      }`,
    format: (req, file) => path.extname(file.originalname).substring(1),
    transformation: (req, file) => [
      { width: 500, height: 500, crop: "limit" },
      { width: 200, height: 200, crop: "thumb" },
    ],
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // keep images size < 2 MB
  },
});
