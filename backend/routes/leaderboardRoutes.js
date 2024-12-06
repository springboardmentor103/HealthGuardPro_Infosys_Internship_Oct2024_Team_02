const express = require("express");
const { getLeaderboard } = require("../controllers/dashboardController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, getLeaderboard);

module.exports = router;
