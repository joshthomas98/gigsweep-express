const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the NewsletterSignup schema
const NewsletterSignupSchema = new Schema({
  email: { type: String, required: true, maxlength: 200 },
});

// Create and export the NewsletterSignup model
const NewsletterSignup = mongoose.model(
  "NewsletterSignup",
  NewsletterSignupSchema
);

module.exports = NewsletterSignup;
