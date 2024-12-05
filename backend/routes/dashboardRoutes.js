const express = require("express");
const {
  getDashboardData,
  updateQuizScores,
  uploadProfileImage,
} = require("../controllers/dashboardController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/:userId",protect, getDashboardData);

router.post("/update-scores",protect, updateQuizScores);

router.post("/upload-image",protect, uploadProfileImage);

module.exports = router;
