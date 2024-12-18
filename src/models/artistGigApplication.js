const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the ArtistGigApplication schema
const ArtistGigApplicationSchema = new Schema({
  artist: { type: Schema.Types.ObjectId, ref: "Artist", default: null },
  artist_gig: { type: Schema.Types.ObjectId, ref: "ArtistGig", default: null },
  original_artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    default: null,
  },
  venue: { type: Schema.Types.ObjectId, ref: "Venue", default: null },
  message: { type: String, default: null },
  applied_at: { type: Date, default: Date.now },
  status: {
    type: [String],
    enum: STATUS_CHOICES, // Assuming STATUS_CHOICES is an array like ['Active', 'Past']
    default: ["Active"],
    maxlength: 200,
  },
});

// Middleware to update the number of applications and gig status when saving
ArtistGigApplicationSchema.pre("save", async function (next) {
  // Check if the gig date has passed
  if (this.artist_gig.date_of_gig && this.artist_gig.date_of_gig < new Date()) {
    this.status = ["Past"]; // Set status to "Past"
  }

  await this.artist_gig.updateNumApplications(); // Call the method to update the number of applications
  await this.artist_gig.save(); // Save the artist gig after updating

  next();
});

// Middleware to handle deletion and update the number of applications
ArtistGigApplicationSchema.pre("remove", async function (next) {
  await this.artist_gig.updateNumApplications(); // Update the number of applications
  await this.artist_gig.save(); // Save the artist gig after updating

  next();
});

// Create and export the ArtistGigApplication model
const ArtistGigApplication = mongoose.model(
  "ArtistGigApplication",
  ArtistGigApplicationSchema
);

module.exports = ArtistGigApplication;
