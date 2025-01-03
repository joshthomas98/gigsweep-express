const Unavailability = require("../models/Unavailability");

// Fetch all unavailabilities
exports.getAllUnavailabilities = async (req, res) => {
  try {
    const unavailabilities = await Unavailability.find();

    // Convert dates to desired timezone if needed
    const formattedUnavailabilities = unavailabilities.map((item) => ({
      ...item._doc,
      date: item.date.toLocaleDateString("en-US"), // Adjust to desired format/timezone
    }));

    res.json(formattedUnavailabilities);
  } catch (error) {
    res.status(500).json({ error: "Error fetching unavailabilities" });
  }
};

// Create a new unavailability
exports.createUnavailability = async (req, res) => {
  try {
    const unavailability = new Unavailability(req.body);
    await unavailability.save();
    res.status(201).json(unavailability);
  } catch (error) {
    res.status(400).json({ error: "Error creating unavailability" });
  }
};

// Fetch unavailabilities by artist ID
exports.getUnavailabilitiesByArtistId = async (req, res) => {
  const { id } = req.params;
  try {
    const unavailabilities = await Unavailability.find({ artist_id: id });
    if (!unavailabilities.length)
      return res.status(404).json({ error: "No unavailabilities found" });

    res.json(unavailabilities);
  } catch (error) {
    res.status(500).json({ error: "Error fetching unavailabilities" });
  }
};

// Update an unavailability by ID
exports.updateUnavailabilityById = async (req, res) => {
  const { id } = req.params;
  try {
    const unavailability = await Unavailability.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!unavailability)
      return res.status(404).json({ error: "Unavailability not found" });

    res.json(unavailability);
  } catch (error) {
    res.status(400).json({ error: "Error updating unavailability" });
  }
};

// Delete an unavailability by ID
exports.deleteUnavailabilityById = async (req, res) => {
  const { id } = req.params;
  try {
    const unavailability = await Unavailability.findByIdAndDelete(id);

    if (!unavailability)
      return res.status(404).json({ error: "Unavailability not found" });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting unavailability" });
  }
};
