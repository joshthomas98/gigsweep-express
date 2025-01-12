const express = require("express");
const router = express.Router();
const {
  getAllArtistWrittenReviews,
  createArtistWrittenReview,
  getArtistWrittenReviewById,
  updateArtistWrittenReviewById,
} = require("../controllers/artistWrittenReviewController");

// Routes for Artist Written Reviews
router.get("/", getAllArtistWrittenReviews);
router.post("/", createArtistWrittenReview);
router.get("/:id", getArtistWrittenReviewById);
router.put("/:id", updateArtistWrittenReviewById);
router.delete(
  "/:id",
  artistWrittenReviewController.deleteArtistWrittenReviewById
);
router.post(
  "/artist_written_review_check_profanities/",
  checkProfanitiesInReview
); // Check for profanities in a review

module.exports = router;
