const express = require("express");
const router = express.Router();
const {
  getVenues,
  getVenueById,
  createVenue,
  updateVenueById,
  deleteVenueById,
  venueSignIn,
  getVenueNotifications,
  searchVenues,
} = require("../controllers/venueController");

const {
  getVenueGigs,
  venueGigsByVenue,
  createNewVenueGig,
  updateVenueGigById,
  deleteVenueGigById,
  getAllVenueGigApplications,
  getVenueGigApplicationsByVenueId,
  createVenueGigApplication,
  updateVenueGigApplicationById,
  deleteVenueGigApplicationById,
} = require("../controllers/venueGigController");

// Venues CRUD Routes
router.get("/", getVenues); // Fetch all venues
router.get("/:id", getVenueById); // Fetch a single venue by ID
router.post("/", createVenue); // Create a new venue
router.put("/:id", updateVenueById); // Update a venue by ID
router.delete("/:id", deleteVenueById); // Delete a venue by ID

// Authentication
router.post("/validate", venueSignIn); // Venue sign-in

// Notifications
router.get("/:id/notifications", getVenueNotifications); // Fetch notifications for a venue

// Venue Gigs
router.get("/gigs", getVenueGigs); // Fetch all venue gigs
router.get("/:venue_id/gigs", venueGigsByVenue); // Fetch gigs for a specific venue
router.post("/gigs", createNewVenueGig); // Create a new venue gig
router.put("/gigs/:id", updateVenueGigById); // Update a venue gig by ID
router.delete("/gigs/:id", deleteVenueGigById); // Delete a venue gig by ID

// Venue Gig Applications
router.get("/gigapplications", getAllVenueGigApplications); // Fetch all venue gig applications
router.get("/:venue_id/gigapplications", getVenueGigApplicationsByVenueId); // Fetch applications by venue ID
router.post("/gigapplications", createVenueGigApplication); // Create a new gig application
router.put("/gigapplications/:id", updateVenueGigApplicationById); // Update a gig application by ID
router.delete("/gigapplications/:id", deleteVenueGigApplicationById); // Delete a gig application by ID

// Route for searching venues in search bar
router.get("/venues/search", searchVenues);

module.exports = router;
