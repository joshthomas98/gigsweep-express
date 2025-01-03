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
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting venue gig" });
  }
};

// Fetch all Venue Gig Applications
exports.getAllVenueGigApplications = async (req, res) => {
  try {
    const applications = await VenueGigApplication.find().populate("venue_gig");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching venue gig applications" });
  }
};

// Fetch Venue Gig Applications for a specific venue (based on venue ID)
exports.getVenueGigApplicationsByVenueId = async (req, res) => {
  try {
    const applications = await VenueGigApplication.find({
      venue: req.params.venueId,
    });
    if (!applications)
      return res
        .status(404)
        .json({ error: "No applications found for this venue" });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching venue gig applications" });
  }
};

// Create a new Venue Gig Application
exports.createVenueGigApplication = async (req, res) => {
  const { venue_gig, venue } = req.body;

  try {
    const gig = await VenueGig.findById(venue_gig);
    if (!gig) return res.status(404).json({ error: "Venue gig not found" });

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

// Update a Venue Gig Application by venue user ID
exports.updateVenueGigApplication = async (req, res) => {
  const { venueId, applicationId } = req.params;

  try {
    const application = await VenueGigApplication.findOneAndUpdate(
      { _id: applicationId, venue: venueId },
      req.body,
      { new: true }
    );

    if (!application)
      return res.status(404).json({ error: "Venue gig application not found" });
    res.json(application);
  } catch (error) {
    res.status(400).json({ error: "Error updating venue gig application" });
  }
};

// Delete a Venue Gig Application by venue user ID
exports.deleteVenueGigApplication = async (req, res) => {
  const { venueId, applicationId } = req.params;

  try {
    const application = await VenueGigApplication.findOneAndDelete({
      _id: applicationId,
      venue: venueId,
    });

    if (!application)
      return res.status(404).json({ error: "Venue gig application not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting venue gig application" });
  }
};
