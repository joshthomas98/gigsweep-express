const MembershipOption = require("../models/MembershipOption");

// Fetch all membership options
exports.getAllMembershipOptions = async (req, res) => {
  try {
    const membershipOptions = await MembershipOption.find();
    res.json(membershipOptions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching membership options" });
  }
};

// Fetch a single membership option by ID
exports.getMembershipOptionById = async (req, res) => {
  const { id } = req.params;

  try {
    const membershipOption = await MembershipOption.findById(id);
    if (!membershipOption) {
      return res.status(404).json({ error: "Membership option not found" });
    }
    res.json(membershipOption);
  } catch (error) {
    res.status(500).json({ error: "Error fetching membership option" });
  }
};

// Create a new membership option
exports.createMembershipOption = async (req, res) => {
  try {
    const membershipOption = new MembershipOption(req.body);
    await membershipOption.save();
    res.status(201).json(membershipOption);
  } catch (error) {
    res.status(400).json({ error: "Error creating membership option" });
  }
};

// Update a membership option by ID
exports.updateMembershipOptionById = async (req, res) => {
  const { id } = req.params;

  try {
    const membershipOption = await MembershipOption.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!membershipOption) {
      return res.status(404).json({ error: "Membership option not found" });
    }

    res.json(membershipOption);
  } catch (error) {
    res.status(400).json({ error: "Error updating membership option" });
  }
};

// Delete a membership option by ID
exports.deleteMembershipOptionById = async (req, res) => {
  const { id } = req.params;

  try {
    const membershipOption = await MembershipOption.findByIdAndDelete(id);
    if (!membershipOption) {
      return res.status(404).json({ error: "Membership option not found" });
    }

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: "Error deleting membership option" });
  }
};
