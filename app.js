const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 8000;

// Connect to the database
connectDB();

// Use CORS middleware
app.use(cors());

app.get("/signin", (req, res) => {
  res.json({ message: "React and Express are connected!" });
});

app.listen(PORT, () => console.log("Server is running on port 8000"));
