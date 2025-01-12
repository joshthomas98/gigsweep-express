const ContactQuery = require("../models/contactQuery");

// Fetch all contact queries
exports.getAllContactQueries = async (req, res) => {
  try {
    const contactQueries = await ContactQuery.find();
    res.status(200).json(contactQueries);
  } catch (error) {
    res.status(500).json({ error: "Error fetching contact queries" });
  }
};

// Create a new contact query
exports.createContactQuery = async (req, res) => {
  try {
    const query = new ContactQuery(req.body);
    await query.save();
    res.status(201).json({ id: query._id, ...req.body });
  } catch (error) {
    res.status(400).json({ error: "Error creating contact query" });
  }
};

// Fetch a specific contact query by ID
exports.getContactQueryById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await ContactQuery.findById(id);
    if (!query) return res.status(404).json({ error: "Query not found" });

    res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ error: "Error fetching contact query" });
  }
};

// Update a contact query by ID
exports.updateContactQueryById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await ContactQuery.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!query) return res.status(404).json({ error: "Query not found" });

    res.status(200).json(query);
  } catch (error) {
    res.status(400).json({ error: "Error updating contact query" });
  }
};

// Delete a contact query by ID
exports.deleteContactQueryById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await ContactQuery.findByIdAndDelete(id);
    if (!query) return res.status(404).json({ error: "Query not found" });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting contact query" });
  }
};
