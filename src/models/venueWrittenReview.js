const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { IS_APPROVED_CHOICES } = require("./choices/choices");

const VenueWrittenReviewSchema = new Schema({
  date_of_performance: { type: Date, default: null },
  venue_name: { type: String, required: true, maxlength: 100, default: null },
  artist_name: { type: String, required: true, maxlength: 100, default: null },
  review: { type: String, default: null }, // TextField in Django becomes String in Mongoose
  rating: { type: Number, default: null },
  is_approved: {
    type: String,
    enum: IS_APPROVED_CHOICES.map((choice) => choice[0]), // Assuming IS_APPROVED_CHOICES is an array of valid choices like 'Under review'
    default: "Under review",
    maxlength: 100,
    default: null,
  },
});

// Create and export the VenueWrittenReview model
const VenueWrittenReview = mongoose.model(
  "VenueWrittenReview",
  VenueWrittenReviewSchema
);

module.exports = VenueWrittenReview;
