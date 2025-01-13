const ArtistGig = require("../models/ArtistGig");

// Fetch all artist gigs
exports.getArtistGigs = async (req, res) => {
  try {
    const artistGigs = await ArtistGig.find();
    res.json(artistGigs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching artist gigs" });
  }
};

// Fetch gigs for a specific artist
exports.artistGigsByArtist = async (req, res) => {
  const { artist_id } = req.params;
  try {
    const artistGigs = await ArtistGig.find({ artist: artist_id });
    res.json(artistGigs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching gigs for artist" });
  }
};

// Create a new artist gig
exports.createArtistGig = async (req, res) => {
  try {
    const artistGig = new ArtistGig(req.body);
    await artistGig.save();
    res.status(201).json(artistGig);
  } catch (error) {
    res.status(400).json({ error: "Error creating artist gig" });
  }
};

// Fetch artist gig by ID
exports.getArtistGigById = async (req, res) => {
  const { id } = req.params;
  try {
    const artistGig = await ArtistGig.findById(id);
    if (!artistGig) return res.status(404).json({ error: "Gig not found" });
    res.json(artistGig);
  } catch (error) {
    res.status(500).json({ error: "Error fetching gig" });
  }
};

// Update artist gig by ID
exports.updateArtistGigById = async (req, res) => {
  const { id } = req.params;
  try {
    const artistGig = await ArtistGig.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!artistGig) return res.status(404).json({ error: "Gig not found" });
    res.json(artistGig);
  } catch (error) {
    res.status(400).json({ error: "Error updating gig" });
  }
};

// Delete artist gig by ID
exports.deleteArtistGigById = async (req, res) => {
  const { id } = req.params;
  try {
    const artistGig = await ArtistGig.findByIdAndDelete(id);
    if (!artistGig) return res.status(404).json({ error: "Gig not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting gig" });
  }
};

// Applications

// Fetch all Artist Gig Applications (with optional venue_id filtering)
exports.getAllArtistGigApplications = async (req, res) => {
  const { venue_id } = req.query;
  try {
    const filter = venue_id ? { venue: venue_id } : {};
    const applications = await ArtistGigApplication.find(filter).populate(
      "artist_gig"
    );
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching artist gig applications" });
  }
};

// Fetch a single Artist Gig Application by id
exports.getArtistGigApplicationById = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await ArtistGigApplication.findById(id);
    if (!application)
      return res
        .status(404)
        .json({ error: "Artist gig application not found" });
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: "Error fetching artist gig application" });
  }
};

// Create a new Artist Gig Application
exports.createArtistGigApplication = async (req, res) => {
  const { artist_gig, artist } = req.body;

  try {
    const gig = await ArtistGig.findById(artist_gig);
    if (!gig) return res.status(404).json({ error: "Artist gig not found" });

    const application = new ArtistGigApplication({
      artist_gig,
      artist,
    });

    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: "Error creating artist gig application" });
  }
};

// Update an Artist Gig Application by id
exports.updateArtistGigApplicationById = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await ArtistGigApplication.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!application)
      return res
        .status(404)
        .json({ error: "Artist gig application not found" });
    res.json(application);
  } catch (error) {
    res.status(400).json({ error: "Error updating artist gig application" });
  }
};

// Delete an Artist Gig Application by id
exports.deleteArtistGigApplicationById = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await ArtistGigApplication.findByIdAndDelete(id);
    if (!application)
      return res
        .status(404)
        .json({ error: "Artist gig application not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting artist gig application" });
  }
};
