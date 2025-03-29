import express from "express";
import { configDotenv } from "dotenv";
import morgan from "morgan";
import { db as mongodb } from "./utils/db.js";
import userRouter from "./routes/user.routes.js";
import listingRouter from "./routes/listing.routes.js";
import authRouter from "./routes/auth.routes.js";
import { errorMiddleware } from "./utils/error.js";
import cors from "cors";
import cookieParser from "cookie-parser";

configDotenv();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Connect to MongoDB
mongodb();

//APIS
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

// Error handling middleware
app.use(errorMiddleware);
