const Artist = require("../models/artist");

// Fetch all featured artists
exports.getFeaturedArtists = async (req, res) => {
  try {
    const featuredArtists = await Artist.find({ featured_artist: true });
    res.json(featuredArtists);
  } catch (error) {
    res.status(500).json({ error: "Error fetching featured artists" });
  }
};
