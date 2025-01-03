const express = require("express");
const router = express.Router();
const {
  getAllUnavailabilities,
  createUnavailability,
  getUnavailabilitiesByArtistId,
  updateUnavailabilityById,
  deleteUnavailabilityById,
} = require("../controllers/unavailabilityController");

// Unavailabilities CRUD Routes
router.get("/", getAllUnavailabilities); // Fetch all unavailabilities
router.post("/", createUnavailability); // Create a new unavailability
router.get("/:id", getUnavailabilitiesByArtistId); // Fetch unavailabilities by artist ID
router.put("/:id", updateUnavailabilityById); // Update an unavailability by ID
router.delete("/:id", deleteUnavailabilityById); // Delete an unavailability by ID

module.exports = router;
