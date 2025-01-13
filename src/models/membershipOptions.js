const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the MembershipOptions schema with hardcoded user types
const MembershipOptionsSchema = new Schema({
  membership_id: { type: Number, default: null },
  type_of_user: {
    type: String,
    enum: ["Artist", "Venue"],
    default: null,
  },
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, default: null },
  price: { type: String, default: null, maxlength: 50 },
  disclosure: { type: String, default: null, maxlength: 500 },
  is_active: { type: Boolean, default: true },
});

// Create and export the MembershipOptions model
const MembershipOptions = mongoose.model(
  "MembershipOptions",
  MembershipOptionsSchema
);

module.exports = MembershipOptions;
