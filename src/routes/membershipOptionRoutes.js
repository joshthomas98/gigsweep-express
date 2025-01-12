const express = require("express");
const router = express.Router();
const {
  getAllMembershipOptions,
  getMembershipOptionById,
  createMembershipOption,
  updateMembershipOptionById,
  deleteMembershipOptionById,
} = require("../controllers/membershipOptionsController");

// Route to fetch all membership options
router.get("/", getAllMembershipOptions);

// Route to fetch a single membership option by ID
router.get("/:id", getMembershipOptionById);

// Route to create a new membership option
router.post("/", createMembershipOption);

// Route to update a membership option by ID
router.put("/:id", updateMembershipOptionById);

// Route to delete a membership option by ID
router.delete("/:id", deleteMembershipOptionById);

module.exports = router;
