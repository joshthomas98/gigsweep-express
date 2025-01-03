const Venue = require("../models/Venue");
const VenueNotification = require("../models/VenueNotification");

// Fetch all venues
exports.getVenues = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (error) {
    res.status(500).json({ error: "Error fetching venues" });
  }
};

// Fetch a single venue by ID
exports.getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ error: "Venue not found" });
    res.json(venue);
  } catch (error) {
    res.status(500).json({ error: "Error fetching venue" });
  }
};

// Create a new venue
exports.createVenue = async (req, res) => {
  try {
    const venue = new Venue(req.body);
    await venue.save();
    res.status(201).json(venue);
  } catch (error) {
    res.status(400).json({ error: "Error creating venue" });
  }
};

// Update a venue by ID
exports.updateVenueById = async (req, res) => {
  const { id } = req.params;
  try {
    const venue = await Venue.findByIdAndUpdate(id, req.body, { new: true });
    if (!venue) return res.status(404).json({ error: "Venue not found" });
    res.json(venue);
  } catch (error) {
    res.status(400).json({ error: "Error updating venue" });
  }
};

// Delete a venue by ID
exports.deleteVenueById = async (req, res) => {
  const { id } = req.params;
  try {
    const venue = await Venue.findByIdAndDelete(id);
    if (!venue) return res.status(404).json({ error: "Venue not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting venue" });
  }
};

// Venue sign-in
exports.venueSignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const venue = await Venue.findOne({
      email: email.toLowerCase(),
      password,
    });
    if (!venue) return res.status(404).json({ error: "Invalid credentials" });
    res.json({ id: venue._id });
  } catch (error) {
    res.status(500).json({ error: "Error signing in" });
  }
};

// Fetch all venue notifications
exports.getVenueNotifications = async (req, res) => {
  try {
    const notifications = await VenueNotification.find({
      venue: req.params.id,
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching venue notifications" });
  }
};
