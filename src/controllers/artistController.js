const Artist = require("../models/Artist");
const ArtistGig = require("../models/ArtistGig");
const ArtistGigApplication = require("../models/ArtistGigApplication");
const ArtistWrittenReview = require("../models/ArtistWrittenReview");
const VenueNotification = require("../models/VenueNotification");
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
    res.status(204).send();
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

// Fetch gigs for a specific artist
exports.artistGigsByArtist = async (req, res) => {
  const { artist_id } = req.params;
  try {
    const gigs = await ArtistGig.find({ artist: artist_id });
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching gigs for artist" });
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

// Create a new artist gig
exports.createArtistGig = async (req, res) => {
  try {
    const gig = new ArtistGig(req.body);
    await gig.save();
    if (gig.isAdvertised) {
      notifyVenueOnGigAdvertisement(gig);
    }
    res.status(201).json(gig);
  } catch (error) {
    res.status(400).json({ error: "Error creating artist gig" });
  }
};

// // Notify venue about gig advertisement
// const notifyVenueOnGigAdvertisement = async (gig) => {
//   if (gig.venue) {
//     const message = `The artist ${gig.currentArtist.artistName} has advertised their gig on ${gig.dateOfGig}.`;
//     await VenueNotification.create({
//       venue: gig.venue,
//       message,
//       notificationType: ["GIG_TRANSFER"],
//       ifGigAdvertisedByArtist: gig._id,
//     });
//   }
// };

// Fetch artist gigs by ID
exports.getArtistGigById = async (req, res) => {
  const { id } = req.params;
  try {
    const gig = await ArtistGig.findById(id);
    if (!gig) return res.status(404).json({ error: "Gig not found" });
    res.json(gig);
  } catch (error) {
    res.status(500).json({ error: "Error fetching gig" });
  }
};

// Update artist gig by ID
exports.updateArtistGigById = async (req, res) => {
  const { id } = req.params;
  try {
    const gig = await ArtistGig.findById(id);
    if (!gig) return res.status(404).json({ error: "Gig not found" });

    const wasAdvertised = gig.isAdvertised;
    Object.assign(gig, req.body);
    await gig.save();

    if (!wasAdvertised && gig.isAdvertised) {
      notifyVenueOnGigAdvertisement(gig);
    }
    res.json(gig);
  } catch (error) {
    res.status(400).json({ error: "Error updating gig" });
  }
};

// Delete artist gig by ID
exports.deleteArtistGigById = async (req, res) => {
  const { id } = req.params;
  try {
    const gig = await ArtistGig.findByIdAndDelete(id);
    if (!gig) return res.status(404).json({ error: "Gig not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting gig" });
  }
};

// Search artists based on filters
exports.searchArtists = async (req, res) => {
  const { dateOfGig, genre, typeOfArtist, country } = req.body;
  try {
    const artists = await Artist.find({
      "unavailabilities.date": { $ne: dateOfGig },
      genre,
      typeOfArtist,
      country,
    });
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: "Error searching artists" });
  }
};

// Fetch featured artists
exports.getFeaturedArtists = async (req, res) => {
  try {
    const featuredArtists = await Artist.find({ featuredArtist: true });
    res.json(featuredArtists);
  } catch (error) {
    res.status(500).json({ error: "Error fetching featured artists" });
  }
};

// Fetch all artist gig applications
exports.getArtistGigApplications = async (req, res) => {
  try {
    const applications = await ArtistGigApplication.find();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching applications" });
  }
};

// Create a new artist gig application
exports.createArtistGigApplication = async (req, res) => {
  try {
    const gig = await ArtistGig.findById(req.body.artistGig);
    if (!gig) return res.status(404).json({ error: "Gig not found" });

    const application = new ArtistGigApplication(req.body);
    application.artistGig = gig._id;
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: "Error creating application" });
  }
};

// Check for profanities in written review
exports.checkProfanitiesInReview = async (req, res) => {
  const { dateOfPerformance, artistName, venueName, review, rating } = req.body;

  try {
    // Call Perspective API to check for toxicity in the review
    const apiKey = process.env.PERSPECTIVE_API_KEY;
    const endpoint = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${apiKey}`;

    // Prepare the data for the API request
    const perspectiveData = {
      comment: { text: review },
      requestedAttributes: { TOXICITY: {} },
    };

    // Make the API request to check for profanities
    const response = await axios.post(endpoint, perspectiveData);

    if (response.status === 200) {
      // Extract the toxicity score from the response
      const toxicityScore =
        response.data.attributeScores.TOXICITY.summaryScore.value;

      // Determine whether the review is approved based on the toxicity score
      const isApproved = toxicityScore < 0.5 ? "Approved" : "Unapproved";

      // Create the new review object
      const writtenReview = new ArtistWrittenReview({
        dateOfPerformance,
        artistName,
        venueName,
        review,
        rating,
        isApproved,
      });

      // Save the review to the database
      await writtenReview.save();

      // Return the saved review as a response
      res.json(writtenReview);
    } else {
      // Handle the error if the API response is not successful
      res
        .status(500)
        .json({ error: "Error occurred while checking for profanities." });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    res
      .status(500)
      .json({ error: "Error checking profanities or saving the review." });
  }
};
