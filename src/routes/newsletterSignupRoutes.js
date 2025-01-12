const express = require("express");
const router = express.Router();
const {
  getAllNewsletterSignups,
  getIndividualNewsletterSignupById,
  createNewNewsletterSignup,
  updateNewsletterSignup,
  deleteNewsletterSignup,
} = require("../controllers/newsletterSignupController");

// Route to fetch all membership options
router.get("/", getAllNewsletterSignups);

// Route to fetch a single membership option by ID
router.get("/:id", getIndividualNewsletterSignupById);

// Route to create a new membership option
router.post("/", createNewNewsletterSignup);

// Route to update a membership option by ID
router.put("/:id", updateNewsletterSignup);

// Route to delete a membership option by ID
router.delete("/:id", deleteNewsletterSignup);

module.exports = router;
