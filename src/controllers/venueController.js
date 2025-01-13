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
    res.status(204);
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

// Fetch notifications for a specific venue
exports.getVenueNotifications = async (req, res) => {
  const { venue_id } = req.params; // Get the venue_id from the route parameters

  try {
    // Fetch notifications for the venue using venue_id
    const notifications = await VenueNotification.find({ venue: venue_id });

    // If no notifications are found, return 404
    if (!notifications.length) {
      return res.status(404).json({ error: "No notifications found" });
    }

    // Return the notifications directly in the response
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching venue notifications" });
  }
};

// Search for Venues profiles in search bar
exports.searchVenues = async (req, res) => {
  const query = req.query.q || ""; // Get query parameter, default to an empty string

  try {
    const venues = await Venue.find({
      venue_name: { $regex: query, $options: "i" }, // Case-insensitive search
    });
    res.status(200).json(venues); // Respond with matching venues
  } catch (error) {
    console.error("Error searching venues:", error);
    res.status(500).json({ error: "Error searching venues" });
  }
};
