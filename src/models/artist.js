const mongoose = require("mongoose");
const { Schema } = mongoose;

const artistSchema = new Schema({
  artist_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: true },
  bio: { type: String },
  summary: { type: String },
  genre: {
    type: String,
    enum: ["GENRE_1", "GENRE_2", "GENRE_3"],
    required: true,
  },
  country: { type: String, enum: ["UK", "US", "Other"], required: true },
  county: { type: String },
  type_of_artist: { type: String, enum: ["Type1", "Type2"], required: true },
  user_type: { type: String, enum: ["Admin", "Artist"], required: true },
  image: { type: String },
  featured_artist: { type: Boolean, default: false },
  facebook: { type: String },
  twitter: { type: String },
  youtube: { type: String },
  artist_membership_type: { type: Number },
  upcoming_gigs: [{ type: Schema.Types.Mixed }],
  gigging_distance: [{ type: String }],
});

const Artist = mongoose.model("Artist", artistSchema);
module.exports = Artist;
