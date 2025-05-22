const express = require("express");
require("dotenv").config();

console.log("Step 1: Express and dotenv loaded");

const app = express();

app.use(express.json());

console.log("Step 2: Middleware added");

app.get("/", (req, res) => {
  res.status(200).json({ message: "GET request ha" });
});

app.get("/test", (req, res) => {
  res.status(200).json({ message: "This is the /test route" });
});

const PORT = process.env.PORT || 3000;

console.log("Step 3: About to listen on port", PORT);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
