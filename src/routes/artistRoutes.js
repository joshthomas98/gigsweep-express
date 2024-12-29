const express = require("express");
const router = express.Router();
const {
  getArtists,
  getArtistById,
  createArtist,
  artistSignIn,
  artistGigsByArtist,
  searchArtists,
  searchBarArtists,
  createArtistGig,
  getArtistGigById,
  updateArtistGigById,
  deleteArtistGigById,
  getArtistGigApplications,
  createArtistGigApplication,
  checkProfanitiesInReview,
  updateArtistById,
  deleteArtistById,
  getFeaturedArtists,
} = require("../controllers/artistController");

router.get("/", getArtists); // List all artists
router.get("/:id", getArtistById); // Get artist details by ID
router.post("/", createArtist); // Create new artist
router.post("/validate", artistSignIn); // Artist sign-in
router.get("/:artist_id/gigs", artistGigsByArtist); // Gigs by artist
router.post("/gigs", createArtistGig); // Create a new artist gig
router.get("/gigs/:id", getArtistGigById); // Get a gig by ID
router.put("/gigs/:id", updateArtistGigById); // Update artist gig by ID
router.delete("/gigs/:id", deleteArtistGigById); // Delete artist gig by ID
router.post("/search", searchArtists); // Search artists (advanced)
router.get("/search", searchBarArtists); // Search bar functionality
router.post("/review/profanity-check", checkProfanitiesInReview); // Check for profanities in a review
router.get("/featured", getFeaturedArtists); // Get featured artists

// Additional routes for updating and deleting an artist
router.put("/:id", updateArtistById); // Update an artist by ID
router.delete("/:id", deleteArtistById); // Delete an artist by ID

// Artist gig applications
router.get("/gig-applications", getArtistGigApplications); // Get all artist gig applications
router.post("/gig-applications", createArtistGigApplication); // Create a new gig application

module.exports = router;
