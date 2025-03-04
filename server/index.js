import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import userRouter from "./routes/user.routes.js";

configDotenv();
const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

//APIS
app.use("/api/user", userRouter);

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
