const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the VenueGigApplication schema
const venueGigApplicationSchema = new Schema(
  {
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
      default: null,
    },
    venue_gig: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VenueGig",
      required: true,
      default: null,
    },
  },
  { timestamps: true }
);

// Save hook to increment the number of applications for the venue gig when a new application is created
venueGigApplicationSchema.pre("save", async function (next) {
  if (!this.isNew) return next(); // Only increment when the document is new

  try {
    const venueGig = await mongoose.model("VenueGig").findById(this.venue_gig);
    if (venueGig) {
      venueGig.num_applications += 1; // Increment the num_applications field
      await venueGig.save();
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Delete hook to decrement the number of applications when an application is deleted
venueGigApplicationSchema.pre("remove", async function (next) {
  try {
    const venueGig = await mongoose.model("VenueGig").findById(this.venue_gig);
    if (venueGig) {
      venueGig.num_applications -= 1; // Decrement the num_applications field
      await venueGig.save();
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Create a custom method for string representation
venueGigApplicationSchema.methods.toString = function () {
  return `${this.artist} applied for ${this.venue_gig}`;
};

// Define the VenueGigApplication model
const VenueGigApplication = mongoose.model(
  "VenueGigApplication",
  venueGigApplicationSchema
);

module.exports = VenueGigApplication;
