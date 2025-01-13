const express = require("express");
const router = express.Router();
const {
  getAllVenueWrittenReviews,
  createVenueWrittenReview,
  getVenueWrittenReviewById,
  updateVenueWrittenReviewById,
  deleteVenueWrittenReviewById,
  checkProfanitiesInVenueReview,
} = require("../controllers/venueWrittenReviewController");

// Routes for Venue Written Reviews
router.get("/", getAllVenueWrittenReviews);
router.post("/", createVenueWrittenReview);
router.get("/:id", getVenueWrittenReviewById);
router.put("/:id", updateVenueWrittenReviewById);
router.delete("/:id", deleteVenueWrittenReviewById);
router.post(
  "/venue_written_review_check_profanities/",
  checkProfanitiesInVenueReview
); // Check for profanities in a review

module.exports = router;
