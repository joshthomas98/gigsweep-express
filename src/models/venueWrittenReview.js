const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the VenueWrittenReview schema
const VenueWrittenReviewSchema = new Schema({
  date_of_performance: { type: Date, default: null },
  venue_name: { type: String, required: true, maxlength: 100, default: null },
  artist_name: { type: String, required: true, maxlength: 100, default: null },
  review: { type: String, default: null }, // TextField in Django becomes String in Mongoose
  rating: { type: Number, default: null },
  is_approved: {
    type: String,
    enum: ["Under review", "Unapproved", "Approved"],
    default: "Under review",
    maxlength: 100,
  },
});

// Create and export the VenueWrittenReview model
const VenueWrittenReview = mongoose.model(
  "VenueWrittenReview",
  VenueWrittenReviewSchema
);

module.exports = VenueWrittenReview;
