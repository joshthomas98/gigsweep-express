const express = require("express");
const router = express.Router();
const venueWrittenReviewController = require("../controllers/venueWrittenReviewController");

// Routes for Venue Written Reviews
router.get("/", venueWrittenReviewController.getAllVenueWrittenReviews);
router.post("/", venueWrittenReviewController.createVenueWrittenReview);
router.get("/:id", venueWrittenReviewController.getVenueWrittenReviewById);
router.put("/:id", venueWrittenReviewController.updateVenueWrittenReviewById);
router.delete(
  "/:id",
  venueWrittenReviewController.deleteVenueWrittenReviewById
);
router.post(
  "/venue_written_review_check_profanities/",
  checkProfanitiesInReview
); // Check for profanities in a review

module.exports = router;
