const ArtistWrittenReview = require("../models/artistWrittenReview");

// Get all artist written reviews
exports.getAllArtistWrittenReviews = async (req, res) => {
  try {
    const artistWrittenReviews = await ArtistWrittenReview.find();
    res.status(200).json(artistWrittenReviews);
  } catch (error) {
    console.error("Error fetching artist written reviews:", error);
    res.status(500).json({ error: "Failed to fetch artist written reviews" });
  }
};

// Create a new artist written review
exports.createArtistWrittenReview = async (req, res) => {
  try {
    const newReview = new ArtistWrittenReview(req.body);
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Error creating artist written review:", error);
    res.status(400).json({ error: "Failed to create artist written review" });
  }
};

// Get a single artist written review by ID
exports.getArtistWrittenReviewById = async (req, res) => {
  try {
    const review = await ArtistWrittenReview.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Artist written review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    console.error("Error fetching artist written review:", error);
    res.status(500).json({ error: "Failed to fetch artist written review" });
  }
};

// Update an artist written review by ID
exports.updateArtistWrittenReviewById = async (req, res) => {
  try {
    const updatedReview = await ArtistWrittenReview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ error: "Artist written review not found" });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error updating artist written review:", error);
    res.status(400).json({ error: "Failed to update artist written review" });
  }
};

// Delete an artist written review by ID
exports.deleteArtistWrittenReviewById = async (req, res) => {
  try {
    const deletedReview = await ArtistWrittenReview.findByIdAndDelete(
      req.params.id
    );
    if (!deletedReview) {
      return res.status(404).json({ error: "Artist written review not found" });
    }
    res.status(204).json(); // No content
  } catch (error) {
    console.error("Error deleting artist written review:", error);
    res.status(500).json({ error: "Failed to delete artist written review" });
  }
};

// Check for profanities in written review
exports.checkProfanitiesInReview = async (req, res) => {
  const { dateOfPerformance, artistName, venueName, review, rating } = req.body;

  try {
    const apiKey = process.env.PERSPECTIVE_API_KEY;
    const endpoint = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${apiKey}`;

    const perspectiveData = {
      comment: { text: review },
      requestedAttributes: { TOXICITY: {} },
    };

    const response = await axios.post(endpoint, perspectiveData);

    if (response.status === 200) {
      const toxicityScore =
        response.data.attributeScores.TOXICITY.summaryScore.value;
      const isApproved = toxicityScore < 0.5 ? "Approved" : "Unapproved";

      const writtenReview = new ArtistWrittenReview({
        dateOfPerformance,
        artistName,
        venueName,
        review,
        rating,
        isApproved,
      });

      await writtenReview.save();
      res.json(writtenReview);
    } else {
      res
        .status(500)
        .json({ error: "Error occurred while checking for profanities." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error checking profanities or saving the review." });
  }
};
