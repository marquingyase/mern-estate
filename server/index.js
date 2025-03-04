import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

app.listen(process.env.PORT, (req, res) => {
  console.log("Server is running on port 5001");
});
