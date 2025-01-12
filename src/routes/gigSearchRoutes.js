const express = require("express");
const router = express.Router();
const { gigSearch } = require("../controllers/gigSearchController");

// POST request for gig search
router.post("/search", gigSearch);

module.exports = router;
