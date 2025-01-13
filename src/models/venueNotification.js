const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the VenueNotification schema
const VenueNotificationSchema = new Schema(
  {
    venue: { type: Schema.Types.ObjectId, ref: "Venue", required: true },
    message: { type: String, required: true },
    notification_type: {
      type: [String],
      enum: [
        "GIG_TRANSFER",
        "VENUE_ADVERTISED_GIG",
        "GENERAL_GIGSWEEP_UPDATES",
        "TEST",
      ],
      required: true,
    },
    if_gig_advertised_by_artist: { type: Number, default: null },
    if_venue_made_gig: { type: Number, default: null },
    is_read: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
  },
  {
    // Add ordering by created_at in descending order
    timestamps: { createdAt: "created_at", updatedAt: false },
  }
);

// Create and export the VenueNotification model
const VenueNotification = mongoose.model(
  "VenueNotification",
  VenueNotificationSchema
);

module.exports = VenueNotification;
