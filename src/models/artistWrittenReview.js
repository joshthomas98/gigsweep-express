const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { IS_APPROVED_CHOICES } = require("../models/choices/choices");

// Define the ArtistWrittenReview schema
const ArtistWrittenReviewSchema = new Schema({
  date_of_performance: { type: Date, default: null },
  artist_name: { type: String, required: true, maxlength: 100, default: null },
  venue_name: { type: String, required: true, maxlength: 100, default: null },
  review: { type: String, default: null }, // TextField in Django becomes String in Mongoose
  rating: { type: Number, default: null },
  is_approved: {
    type: String,
    enum: IS_APPROVED_CHOICES.map((choice) => choice[0]),
    default: "Under review",
    maxlength: 100,
    default: null,
  },
});

// Create and export the ArtistWrittenReview model
const ArtistWrittenReview = mongoose.model(
  "ArtistWrittenReview",
  ArtistWrittenReviewSchema
);

module.exports = ArtistWrittenReview;
