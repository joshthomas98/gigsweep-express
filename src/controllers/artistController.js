const Artist = require("../models/artist");
const ArtistWrittenReview = require("../models/artistWrittenReview");
const axios = require("axios");

// Fetch all artists
exports.getArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: "Error fetching artists" });
  }
};

// Fetch a single artist by ID
exports.getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ error: "Artist not found" });
    res.json(artist);
  } catch {
    res.status(500).json({ error: "Error fetching artist" });
  }
};

// Create a new artist
exports.createArtist = async (req, res) => {
  try {
    const artist = new Artist(req.body);
    await artist.save();
    res.status(201).json(artist);
  } catch (error) {
    res.status(400).json({ error: "Error creating artist" });
  }
};

// Update an artist by ID
exports.updateArtistById = async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await Artist.findByIdAndUpdate(id, req.body, { new: true });
    if (!artist) return res.status(404).json({ error: "Artist not found" });
    res.json(artist);
  } catch (error) {
    res.status(400).json({ error: "Error updating artist" });
  }
};

// Delete an artist by ID
exports.deleteArtistById = async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await Artist.findByIdAndDelete(id);
    if (!artist) return res.status(404).json({ error: "Artist not found" });
    res.status(204);
  } catch (error) {
    res.status(500).json({ error: "Error deleting artist" });
  }
};

// Artist sign-in
exports.artistSignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const artist = await Artist.findOne({
      email: email.toLowerCase(),
      password,
    });
    if (!artist) return res.status(404).json({ error: "Invalid credentials" });
    res.json({ id: artist._id });
  } catch (error) {
    res.status(500).json({ error: "Error signing in" });
  }
};

// Search artists for the search bar
exports.searchBarArtists = async (req, res) => {
  const { query } = req.query; // Assuming the query param is passed as 'query'
  try {
    const artists = await Artist.find({
      $text: { $search: query },
    });
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: "Error searching artists" });
  }
};

// Artist search function
exports.searchArtists = async (req, res) => {
  const { date_of_gig, genre, type_of_artist, country } = req.body;

  try {
    // Build the query dynamically based on the parameters
    let query = {
      genre: genre,
      type_of_artist: type_of_artist,
      country: country,
    };

    // If a date_of_gig is provided, exclude artists with unavailability on that date
    if (date_of_gig) {
      query.unavailabilities = { $not: { $elemMatch: { date: date_of_gig } } };
    }

    // Fetch artists based on the query
    const artists = await Artist.find(query);

    // Return the filtered artists as a JSON response
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: "Error searching for artists" });
  }
};

// Search for Artists profiles in search bar
exports.searchArtists = async (req, res) => {
  const query = req.query.q || ""; // Get query parameter, default to an empty string

  try {
    const artists = await Artist.find({
      artist_name: { $regex: query, $options: "i" }, // Case-insensitive search
    });
    res.status(200).json(artists); // Respond with matching artists
  } catch (error) {
    console.error("Error searching artists:", error);
    res.status(500).json({ error: "Error searching artists" });
  }
};
