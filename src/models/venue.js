const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {
  UK_COUNTRY_CHOICES,
  UK_COUNTY_CHOICES,
  ACT_TYPES,
  USER_TYPES,
} = require("./choices/choices");

const VenueSchema = new Schema({
  venue_name: { type: String, required: true, maxlength: 100, default: null },
  email: { type: String, required: true, maxlength: 100, default: null },
  password: { type: String, required: true, maxlength: 50, default: null },
  phone_number: { type: String, required: true, maxlength: 20, default: null },
  address: { type: String, required: true, default: null },
  postcode: { type: String, required: true, maxlength: 20, default: null },
  bio: { type: String, default: null },
  country: {
    type: String,
    required: true,
    maxlength: 50,
    default: null,
    enum: UK_COUNTRY_CHOICES.map((choice) => choice[0]),
  },
  county: {
    type: String,
    required: true,
    maxlength: 100,
    default: null,
    enum: UK_COUNTY_CHOICES.map((choice) => choice[0]),
  },
  image: { type: String, default: null },
  type_of_act: {
    type: String,
    required: true,
    maxlength: 100,
    default: null,
    enum: ACT_TYPES.map((choice) => choice[0]),
  },
  user_type: {
    type: String,
    required: true,
    maxlength: 50,
    default: null,
    enum: USER_TYPES.map((choice) => choice[0]),
  },
  facebook: { type: String, maxlength: 200, default: null },
  twitter: { type: String, maxlength: 200, default: null },
  youtube: { type: String, maxlength: 200, default: null },
  venue_membership_type: { type: Number, required: true, default: null },
});

const Venue = mongoose.model("Venue", VenueSchema);

module.exports = Venue;
