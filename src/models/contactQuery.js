const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the ContactQuery schema
const ContactQuerySchema = new Schema(
  {
    name: { type: String, maxlength: 100, default: null },
    email: { type: String, maxlength: 200, default: null },
    phone: { type: String, maxlength: 100, default: null },
    message: { type: String, default: null },
  },
  {
    // Add createdAt timestamp for when the document is created
    timestamps: { createdAt: "created_at", updatedAt: false },
  }
);

// Create and export the ContactQuery model
const ContactQuery = mongoose.model("ContactQuery", ContactQuerySchema);

module.exports = ContactQuery;
