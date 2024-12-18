const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VenueGigSchema = new Schema({
  venue: {
    type: Schema.Types.ObjectId,
    ref: "Venue",
    default: null,
  },
  date_of_gig: { type: Date, default: null },
  time_of_gig: { type: String, default: null }, // Stored as string, but you can change to Date if needed
  duration_of_gig: { type: Number, default: null },
  country_of_venue: {
    type: String,
    maxlength: 100,
    enum: UK_COUNTRY_CHOICES,
    default: null,
  },
  genre_of_gig: {
    type: String,
    maxlength: 50,
    enum: GENRE_CHOICES,
    default: null,
  },
  type_of_gig: { type: String, maxlength: 50, enum: ACT_TYPES, default: null },
  artist_type: {
    type: String,
    maxlength: 50,
    enum: ARTIST_TYPES,
    default: null,
  },
  payment: { type: Number, default: null },
  user_type: { type: String, maxlength: 50, enum: USER_TYPES, default: null },
  num_applications: { type: Number, default: 0 },
  description: { type: String, default: null },

  // New fields for handling advertised gigs
  is_advertised: { type: Boolean, default: false },
  advertised_at: { type: Date, default: null },

  // Whether a gig slot needs an artist
  artist_needed: { type: Boolean, default: false },

  // Genre and artist type needed if advertising
  required_genre: {
    type: String,
    maxlength: 50,
    enum: GENRE_CHOICES,
    default: null,
  },
  required_artist_type: {
    type: String,
    maxlength: 50,
    enum: ARTIST_TYPES,
    default: null,
  },

  // Applications open until date
  applications_open_until: { type: Date, default: null },
});

// Increment the number of applications
VenueGigSchema.methods.incrementNumApplications = async function () {
  this.num_applications += 1;
  await this.save();
};

// Decrement the number of applications
VenueGigSchema.methods.decrementNumApplications = async function () {
  if (this.num_applications > 0) {
    this.num_applications -= 1;
    await this.save();
  }
};

// Override save to handle advertised gigs
VenueGigSchema.pre("save", async function (next) {
  if (this.is_advertised && !this.advertised_at) {
    this.advertised_at = new Date();
  }
  next();
});

// Advertise a gig
VenueGigSchema.methods.advertise = async function () {
  this.is_advertised = true;
  this.advertised_at = new Date();
  await this.save();
};

// Unadvertise a gig
VenueGigSchema.methods.unadvertise = async function () {
  this.is_advertised = false;
  await this.save();
};

// Export the model
const VenueGig = mongoose.model("VenueGig", VenueGigSchema);

module.exports = VenueGig;
