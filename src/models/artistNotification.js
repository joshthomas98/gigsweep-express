const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the ArtistNotification schema
const ArtistNotificationSchema = new Schema(
  {
    artist: { type: Schema.Types.ObjectId, ref: "Artist", required: true },
    message: { type: String, required: true },
    is_read: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
  },
  {
    // Add ordering by created_at in descending order
    timestamps: { createdAt: "created_at", updatedAt: false },
  }
);

// Create and export the ArtistNotification model
const ArtistNotification = mongoose.model(
  "ArtistNotification",
  ArtistNotificationSchema
);

module.exports = ArtistNotification;
