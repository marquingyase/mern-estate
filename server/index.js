import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

app.listen(5001, (req, res) => {
  console.log("Server is running on port 5001");
});
