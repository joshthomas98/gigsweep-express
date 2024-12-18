const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema
const UnavailabilitySchema = new Schema({
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  }, // ForeignKey to Artist
  date: {
    type: Date,
    required: true,
  }, // DateField
  status: {
    type: String,
    default: "Unavailable",
    maxlength: 50,
  },
  reason: {
    type: String,
    maxlength: 150,
    default: null,
  },
});

// Handle cascading delete for ForeignKey (on_delete=models.CASCADE)
ArtistSchema.pre("remove", async function (next) {
  try {
    // Delete related unavailability documents
    await Unavailability.deleteMany({ artist: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

// Create and export the model
const Unavailability = mongoose.model("Unavailability", UnavailabilitySchema);
module.exports = Unavailability;
