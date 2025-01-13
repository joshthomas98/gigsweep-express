const VenueWrittenReview = require("../models/VenueWrittenReview");

// Get all venue written reviews
exports.getAllVenueWrittenReviews = async (req, res) => {
  try {
    const venueWrittenReviews = await VenueWrittenReview.find();
    res.status(200).json(venueWrittenReviews);
  } catch (error) {
    console.error("Error fetching venue written reviews:", error);
    res.status(500).json({ error: "Failed to fetch venue written reviews" });
  }
};

// Create a new venue written review
exports.createVenueWrittenReview = async (req, res) => {
  try {
    const newReview = new VenueWrittenReview(req.body);
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Error creating venue written review:", error);
    res.status(400).json({ error: "Failed to create venue written review" });
  }
};

// Get a single venue written review by ID
exports.getVenueWrittenReviewById = async (req, res) => {
  try {
    const review = await VenueWrittenReview.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Venue written review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    console.error("Error fetching venue written review:", error);
    res.status(500).json({ error: "Failed to fetch venue written review" });
  }
};

// Update a venue written review by ID
exports.updateVenueWrittenReviewById = async (req, res) => {
  try {
    const updatedReview = await VenueWrittenReview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ error: "Venue written review not found" });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error updating venue written review:", error);
    res.status(400).json({ error: "Failed to update venue written review" });
  }
};

// Delete a venue written review by ID
exports.deleteVenueWrittenReviewById = async (req, res) => {
  try {
    const deletedReview = await VenueWrittenReview.findByIdAndDelete(
      req.params.id
    );
    if (!deletedReview) {
      return res.status(404).json({ error: "Venue written review not found" });
    }
    res.status(204).json(); // No content
  } catch (error) {
    console.error("Error deleting venue written review:", error);
    res.status(500).json({ error: "Failed to delete venue written review" });
  }
};

// Check for profanities in venue written review
exports.checkProfanitiesInVenueReview = async (req, res) => {
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

      const writtenReview = new VenueWrittenReview({
        dateOfPerformance,
        artistName,
        venueName,
        review,
        rating,
        isApproved,
      });

      await writtenReview.save();
      res.status(201).json(writtenReview);
    } else {
      res
        .status(500)
        .json({ error: "Error occurred while checking for profanities." });
    }
  } catch (error) {
    console.error("Error checking profanities or saving the review:", error);
    res
      .status(500)
      .json({ error: "Error checking profanities or saving the review." });
  }
};
