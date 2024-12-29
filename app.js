const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 8000;

// Connect to the database
connectDB();

// Use CORS middleware - (You can configure CORS options here if needed)
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Basic route to check if API is connected
app.get("/signin", (req, res) => {
  res.json({ message: "React and Express are connected!" });
});

// Import routes
const artistRouter = require("./src/routes/artistRoutes");

// Use the routes for the "/artists" path
app.use("/artists", artistRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
