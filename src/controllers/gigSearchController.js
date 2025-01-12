const ArtistGig = require("../models/artistGig");
const VenueGig = require("../models/venueGig");

// Gig Search Controller
exports.gigSearch = async (req, res) => {
  const { date_of_gig, country_of_venue, genre_of_gig, type_of_gig, payment } =
    req.body;

  try {
    // Filter ArtistGigs with additional condition is_advertised: true
    const artistGigs = await ArtistGig.find({
      date_of_gig,
      country_of_venue,
      genre_of_gig,
      type_of_gig,
      payment: { $gte: payment }, // Payment should be greater than or equal
      is_advertised: true, // Only advertised gigs
    });

    // Filter VenueGigs
    const venueGigs = await VenueGig.find({
      date_of_gig,
      country_of_venue,
      genre_of_gig,
      type_of_gig,
      payment: { $gte: payment }, // Payment should be greater than or equal
    });

    // Send response
    res.status(200).json({
      artist_gigs: artistGigs,
      venue_gigs: venueGigs,
    });
  } catch (error) {
    console.error("Error searching gigs:", error);
    res.status(500).json({ error: "Error searching gigs" });
  }
};
