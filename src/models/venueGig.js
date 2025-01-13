const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {
  GENRE_CHOICES,
  UK_COUNTRY_CHOICES,
  ACT_TYPES,
  ARTIST_TYPES,
  USER_TYPES,
} = require("./choices/choices");

const VenueGigSchema = new Schema({
  venue: {
    type: Schema.Types.ObjectId,
    ref: "Venue",
    default: null,
  },
  date_of_gig: { type: Date, default: undefined },
  time_of_gig: { type: String, default: undefined },
  duration_of_gig: { type: Number, default: undefined },
  country_of_venue: {
    type: String,
    enum: ["England", "Wales", "Scotland", "Northern Ireland"],
    default: undefined,
  },
  genre_of_gig: {
    type: String,
    maxlength: 50,
    enum: [
      "Rock",
      "Pop",
      "Jazz",
      "Country",
      "Hip Hop",
      "R&B",
      "Electronic",
      "Classical",
      "Reggae",
      "Metal",
      "Folk",
      "Blues",
      "World Music",
    ],
    default: undefined,
  },
  type_of_gig: {
    type: String,
    maxlength: 50,
    enum: ["Original Music", "Covers", "Both"],
    default: undefined,
  },
  artist_type: {
    type: String,
    maxlength: 50,
    enum: ["Full band", "Solo artist", "Duo"],
    default: undefined,
  },
  payment: { type: Number, default: undefined },
  user_type: {
    type: String,
    maxlength: 50,
    enum: ["Artist", "Venue"],
    default: undefined,
  },
  num_applications: { type: Number, default: 0 },
  description: { type: String, default: undefined },

  is_advertised: { type: Boolean, default: false },
  advertised_at: { type: Date, default: undefined },

  artist_needed: { type: Boolean, default: false },

  required_genre: {
    type: String,
    maxlength: 50,
    enum: [
      "Rock",
      "Pop",
      "Jazz",
      "Country",
      "Hip Hop",
      "R&B",
      "Electronic",
      "Classical",
      "Reggae",
      "Metal",
      "Folk",
      "Blues",
      "World Music",
    ],
    default: undefined,
  },
  required_artist_type: {
    type: String,
    maxlength: 50,
    enum: ["Full band", "Solo artist", "Duo"],
    default: undefined,
  },

  applications_open_until: { type: Date, default: undefined },
});

// Increment the number of applications atomically
VenueGigSchema.methods.incrementNumApplications = async function () {
  this.num_applications += 1;
  await this.save();
};

// Decrement the number of applications atomically
VenueGigSchema.methods.decrementNumApplications = async function () {
  if (this.num_applications > 0) {
    this.num_applications -= 1;
    await this.save();
  }
};

// Override save to handle advertised gigs
VenueGigSchema.pre("save", async function (next) {
  if (this.is_advertised && !this.advertised_at) {
    this.advertised_at = new Date(); // ensure advertised_at is set
  }
  next();
});

// Advertise a gig
VenueGigSchema.methods.advertise = async function () {
  this.is_advertised = true;
  this.advertised_at = new Date(); // ensure advertised_at is set
  await this.save();
};

// Unadvertise a gig
VenueGigSchema.methods.unadvertise = async function () {
  this.is_advertised = false;
  this.advertised_at = undefined; // make sure to unset it when unadvertised
  await this.save();
};

// Export the model
const VenueGig = mongoose.model("VenueGig", VenueGigSchema);

module.exports = VenueGig;
