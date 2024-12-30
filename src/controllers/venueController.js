const Venue = require("../models/venue");

// Fetch all venues
exports.getVenues = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch {
    res.status(500).json({ error: "Error fetching venues" });
  }
};

// Fetch a single venue by ID
exports.getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ error: "Venue not found" });
  } catch (error) {
    res.status(500).json({ error: "Error fetching venue" });
  }
};

// Create a new venue
exports.createNewVenue = async (req, res) => {
  try {
    const venue = await Venue.create(req.body);
    res.status(201).json({ message: "New venue user created" });
  } catch (error) {
    res.status(400).json({ error: "Error creating new venue user" });
  }
};
