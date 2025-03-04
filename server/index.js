import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

configDotenv();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

//APIS
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error ";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
