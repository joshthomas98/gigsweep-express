const VenueGig = require("../models/VenueGig");

// Fetch all venue gigs
exports.getVenueGigs = async (req, res) => {
  try {
    const venueGigs = await VenueGig.find();
    res.json(venueGigs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching venue gigs" });
  }
};

// Fetch all gigs for a specific venue
exports.venueGigsByVenue = async (req, res) => {
  const { venue_id } = req.params;
  try {
    const venueGigs = await VenueGig.find({ venue: venue_id });
    res.json(venueGigs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching gigs for venue" });
  }
};

// Create a new venue gig
exports.createNewVenueGig = async (req, res) => {
  try {
    const venueGig = new VenueGig(req.body);
    await venueGig.save();
    res.status(201).json({ message: "New venue gig created" });
  } catch (error) {
    res.status(400).json({ error: "Error creating new venue gig" });
  }
};

// Update a venue gig by ID
exports.updateVenueGigById = async (req, res) => {
  const { id } = req.params;
  try {
    const venueGig = await VenueGig.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!venueGig)
      return res.status(404).json({ error: "Venue gig not found" });
    res.json(venueGig);
  } catch (error) {
    res.status(400).json({ error: "Error updating venue gig" });
  }
};

// Delete a venue gig by ID
exports.deleteVenueGigById = async (req, res) => {
  const { id } = req.params;
  try {
    const venueGig = await VenueGig.findByIdAndDelete(id);
    if (!venueGig)
      return res.status(404).json({ error: "Venue gig not found" });
    res.status(204);
  } catch (error) {
    res.status(500).json({ error: "Error deleting venue gig" });
  }
};

// Applications

// Fetch all Venue Gig Applications
exports.getAllVenueGigApplications = async (req, res) => {
  try {
    const applications = await VenueGigApplication.find().populate("venue_gig");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching venue gig applications" });
  }
};

// Create a new Venue Gig Application
exports.createVenueGigApplication = async (req, res) => {
  const { venue_gig, venue } = req.body;

  try {
    // Validate and fetch the associated VenueGig
    const gig = await VenueGig.findById(venue_gig);
    if (!gig) return res.status(404).json({ error: "Venue gig not found" });

    // Create and save the VenueGigApplication
    const application = new VenueGigApplication({
      venue_gig,
      venue,
    });

    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: "Error creating venue gig application" });
  }
};

// Fetch a single Venue Gig Application by ID
exports.getVenueGigApplicationById = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the VenueGigApplication by ID
    const application = await VenueGigApplication.findById(id).populate(
      "venue_gig"
    );
    if (!application)
      return res.status(404).json({ error: "Venue gig application not found" });

    res.json(application);
  } catch (error) {
    res.status(500).json({ error: "Error fetching venue gig application" });
  }
};

// Update a Venue Gig Application by ID
exports.updateVenueGigApplicationById = async (req, res) => {
  const { id } = req.params;

  try {
    // Update the VenueGigApplication
    const application = await VenueGigApplication.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!application)
      return res.status(404).json({ error: "Venue gig application not found" });

    res.json(application);
  } catch (error) {
    res.status(400).json({ error: "Error updating venue gig application" });
  }
};

// Delete a Venue Gig Application by ID
exports.deleteVenueGigApplicationById = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the VenueGigApplication
    const application = await VenueGigApplication.findByIdAndDelete(id);

    if (!application)
      return res.status(404).json({ error: "Venue gig application not found" });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting venue gig application" });
  }
};
