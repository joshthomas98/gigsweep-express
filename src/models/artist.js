const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const {
  GENRE_CHOICES,
  UK_COUNTRY_CHOICES,
  UK_COUNTY_CHOICES,
  ARTIST_TYPES,
  USER_TYPES,
} = require("../models/choices/choices");

const artistSchema = new Schema({
  artist_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: true },
  bio: { type: String },
  summary: { type: String },
  genre: {
    type: String,
    enum: GENRE_CHOICES.map((choice) => choice[0]), // Extract the first element for enum
    required: true,
  },
  country: {
    type: String,
    enum: UK_COUNTRY_CHOICES.map((choice) => choice[0]),
    required: true,
  },
  county: {
    type: String,
    enum: UK_COUNTY_CHOICES.map((choice) => choice[0]),
    required: true,
  },
  type_of_artist: {
    type: String,
    enum: ARTIST_TYPES.map((choice) => choice[0]),
    required: true,
  },
  user_type: {
    type: String,
    enum: USER_TYPES.map((choice) => choice[0]),
    required: true,
  },
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
