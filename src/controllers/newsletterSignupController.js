const e = require("cors");
const NewsletterSignup = require("../models/NewsletterSignup");

// Fetch all newsletter signups
exports.getAllNewsletterSignups = async (req, res) => {
  try {
    const newsletterSignups = await NewsletterSignup.find();
    res.status(200).json(newsletterSignups);
  } catch (error) {
    res.status(500).json({ error: "Error fetching newsletter signups" });
  }
};

// Fetch specific newsletter signup by its ID
exports.getIndividualNewsletterSignupById = async (req, res) => {
  const { id } = req.params;
  try {
    const newsletterSignup = await NewsletterSignup.findById(id);
    if (!newsletterSignup) {
      return res.status(404).json({ error: "Newsletter signup not found" });
    }
    res.status(200).json(newsletterSignup);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error finding the requested newsletter signup" });
  }
};

// Create new newsletter signup document
exports.createNewNewsletterSignup = async (req, res) => {
  try {
    const newsletterSignup = new NewsletterSignup(req.body);
    await newsletterSignup.save();
    res.status(201).json(newsletterSignup);
  } catch (error) {
    res.status(400).json({ error: "Error creating newsletter signup" });
  }
};

// Update newsletter signup document
exports.updateNewsletterSignup = async (req, res) => {
  const { id } = req.params;
  try {
    const newsletterSignup = await NewsletterSignup.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!newsletterSignup)
      return res.status(404).json({
        error:
          "The newsletter signup instance you're attempting to update doesn't exist",
      });
    res.status(200).json(newsletterSignup);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating newsletter signup document" });
  }
};

// Delete newsletter signup document
exports.deleteNewsletterSignup = async (req, res) => {
  const { id } = req.params;
  try {
    const newsletterSignup = await NewsletterSignup.findByIdAndDelete(id);
    if (!newsletterSignup)
      return res
        .status(404)
        .json({ error: "Newsletter signup document doesn't exist" });
    res.status(204);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting newsletter signup document" });
  }
};
