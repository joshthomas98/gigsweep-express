const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon"); // Optional: To handle date and time formatting more easily

const ArtistGigSchema = new Schema({
  original_artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    default: null,
  },
  current_artist: { type: Schema.Types.ObjectId, ref: "Artist", default: null },
  previous_artists: [{ type: Schema.Types.ObjectId, ref: "Artist" }],
  date_of_gig: { type: Date, default: null },
  time_of_gig: { type: String, default: null }, // Store as string, but you can change to Date if needed
  duration_of_gig: { type: Number, default: null },
  venue_name: { type: String, maxlength: 100, default: null },
  venue: { type: Schema.Types.ObjectId, ref: "Venue", default: null },
  country_of_venue: {
    type: String,
    maxlength: 100,
    enum: ["England", "Wales", "Scotland", "Northern Ireland"],
    default: null,
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
    default: null,
  },
  type_of_gig: {
    type: String,
    maxlength: 50,
    enum: ["Original Music", "Covers", "Both"],
    default: null,
  },
  type_of_artist: {
    type: String,
    maxlength: 50,
    enum: ["Full band", "Solo artist", "Duo"],
    default: null,
  },
  payment: { type: Number, default: null },
  user_type: {
    type: String,
    maxlength: 50,
    enum: ["Artist", "Venue"],
    default: null,
  },
  num_applications: { type: Number, default: 0 },
  notes_about_gig: { type: String, default: null },
  reason_for_advertising: { type: String, default: null },
  status: {
    type: [String],
    enum: ["Active", "Transferred", "Past"],
    default: ["Active"],
    maxlength: 200,
  },
  transfer_history: { type: String, default: null },
  is_advertised: { type: Boolean, default: false },
  advertised_at: { type: Date, default: null },
});

// Method to update the number of applications
ArtistGigSchema.methods.updateNumApplications = async function () {
  this.num_applications = await this.applications().countDocuments();
  await this.save();
};

// Override save to handle gig state logic
ArtistGigSchema.pre("save", async function (next) {
  // Set the status to "Past" if the gig date is in the past
  if (this.date_of_gig && this.date_of_gig < new Date()) {
    this.status = ["Past"];
  }

  // Handle artist transfer logic
  if (this.isModified("current_artist") && this._id) {
    const previous = await mongoose.model("ArtistGig").findById(this._id);

    if (
      previous &&
      String(previous.current_artist) !== String(this.current_artist)
    ) {
      // Add the previous artist to previous_artists and log the transfer
      this.previous_artists.push(previous.current_artist);
      const transferRecord = `Transferred from ${previous.current_artist} to ${
        this.current_artist
      } on ${new Date().toISOString().split("T")[0]}\n`;
      this.transfer_history = (this.transfer_history || "") + transferRecord;
      this.is_advertised = false; // Gig should no longer be advertised after transfer
    }
  } else if (!this.current_artist) {
    // If no current artist is set, set it to original_artist
    this.current_artist = this.original_artist;
  }

  next();
});

// Advertise a gig
ArtistGigSchema.methods.advertise = async function () {
  this.is_advertised = true;
  this.status = ["advertised"];
  this.advertised_at = new Date();
  await this.save();
};

// Unadvertise a gig
ArtistGigSchema.methods.unadvertise = async function () {
  this.is_advertised = false;
  this.status = ["booked"];
  await this.save();
};

// Transfer a gig to a new artist
ArtistGigSchema.methods.transfer = async function (new_artist) {
  this.current_artist = new_artist;
  this.status = ["transferred"];
  this.is_advertised = false; // After transfer, it's no longer advertised
  await this.save();
};

// Applications virtual property
ArtistGigSchema.virtual("applications", {
  ref: "ArtistGigApplication",
  localField: "_id",
  foreignField: "gig",
});

// Cascade delete related notifications
ArtistGigSchema.pre("remove", async function (next) {
  await mongoose
    .model("VenueNotification")
    .deleteMany({ if_gig_advertised_by_artist: this._id });
  next();
});

// Export the model
const ArtistGig = mongoose.model("ArtistGig", ArtistGigSchema);

module.exports = ArtistGig;
