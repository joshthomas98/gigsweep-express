const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  artist_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: true },
  bio: { type: String },
  summary: { type: String },
  genre: {
    type: String,
    enum: GENRE_CHOICES,
    required: true,
  },
  country: { type: String, enum: UK_COUNTRY_CHOICES, required: true },
  county: { type: String, enum: UK_COUNTY_CHOICES, required: true },
  type_of_artist: { type: String, enum: ARTIST_TYPES, required: true },
  user_type: { type: String, enum: USER_TYPES, required: true },
  image: { type: String },
  featured_artist: { type: Boolean, default: false },
  facebook: { type: String },
  twitter: { type: String },
  youtube: { type: String },
  artist_membership_type: { type: Number, required: true },
  upcoming_gigs: [{ type: Schema.Types.Mixed }],
  gigging_distance: [{ type: String }],
});

const Artist = mongoose.model("Artist", artistSchema);
module.exports = Artist;
