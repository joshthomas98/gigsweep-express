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
const artistWrittenReviewRouter = require("./src/routes/artistWrittenReviewRoutes");
const gigSearchRouter = require("./src/routes/gigSearchRoutes");
const membershipOptionRouter = require("./src/routes/membershipOptionRoutes");
const newsletterSignupRouter = require("./src/routes/newsletterSignupRoutes");
const unavailabilityRouter = require("./src/routes/unavailabilityRoutes");
const venueRouter = require("./src/routes/venueRoutes");
const venueWrittenReviewRouter = require("./src/routes/venueWrittenReviewRoutes");

// Use the routes for the "/artists" path
app.use("/artists", artistRouter);
app.use("/artist_written_reviews", artistWrittenReviewRouter);
app.use("/gig_search", gigSearchRouter);
app.use("/membershipoptions", membershipOptionRouter);
app.use("/newslettersignups", newsletterSignupRouter);
app.use("/unavailabilities", unavailabilityRouter);
app.use("/venues", venueRouter);
app.use("/venue_written_reviews", venueWrittenReviewRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
