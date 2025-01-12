const express = require("express");
const router = express.Router();
const {
  getArtists,
  getArtistById,
  createArtist,
  updateArtistById,
  deleteArtistById,
  artistSignIn,
  searchBarArtists,
  searchArtists,
} = require("../controllers/artistController");

const {
  getArtistGigs,
  artistGigsByArtist,
  createArtistGig,
  getArtistGigById,
  updateArtistGigById,
  deleteArtistGigById,
  getAllArtistGigApplications,
  getArtistGigApplicationById,
  createArtistGigApplication,
  updateArtistGigApplicationById,
  deleteArtistGigApplicationById,
} = require("../controllers/artistGigController");

const {
  getFeaturedArtists,
} = require("../controllers/featuredArtistController");

// Artists CRUD Routes
router.get("/", getArtists); // Fetch all artists
router.get("/:id", getArtistById); // Fetch a single artist by ID
router.post("/", createArtist); // Create a new artist
router.put("/:id", updateArtistById); // Update an artist by ID
router.delete("/:id", deleteArtistById); // Delete an artist by ID

// Authentication and Search
router.post("/validate", artistSignIn); // Artist sign-in
router.get("/search", searchBarArtists); // Search bar functionality
router.post("/artist_search", searchArtists); // Search artists (advanced)

// Artist Gigs
router.get("/gigs", getArtistGigs); // Fetch all artist gigs
router.get("/:artist_id/gigs", artistGigsByArtist); // Fetch gigs for a specific artist
router.post("/gigs", createArtistGig); // Create a new artist gig
router.get("/gigs/:id", getArtistGigById); // Fetch artist gig by ID
router.put("/gigs/:id", updateArtistGigById); // Update artist gig by ID
router.delete("/gigs/:id", deleteArtistGigById); // Delete artist gig by ID

// Artist Gig Applications
router.get("/gigapplications", getAllArtistGigApplications); // Fetch all artist gig applications
router.get("/gigapplications/:artistId", getArtistGigApplicationById); // Fetch applications by artist user ID
router.post("/gigapplications", createArtistGigApplication); // Create a new gig application
router.put(
  "/gigapplications/:artistId/:applicationId",
  updateArtistGigApplicationById
); // Update a gig application
router.delete(
  "/gigapplications/:artistId/:applicationId",
  deleteArtistGigApplicationById
); // Delete a gig application

// Featured Artists
router.get("/featuredartists", getFeaturedArtists); // Fetch all featured artists

// Route for searching for artists in search bar
router.get("/artists/search", searchArtists);

module.exports = router;
