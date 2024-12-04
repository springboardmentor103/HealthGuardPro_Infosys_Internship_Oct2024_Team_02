const Dashboard = require("../models/Dashboard");

const getDashboardData = async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({ user: req.params.userId });

    if (!dashboard) {
        dashboard = await Dashboard.create({ user: req.user._id });
      return res.status(404).json({ message: "Dashboard data not found" });
    }

    res.status(200).json(dashboard);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard data", error: error.message });
  }
};

const updateQuizScores = async (req, res) => {
  const { userId, quizCategory, score } = req.body;

  try {
    const dashboard = await Dashboard.findOne({ user: userId });

    if (!dashboard) {
        dashboard = await Dashboard.create({ user: req.user._id });
      return res.status(404).json({ message: "Dashboard data not found" });
    }

    dashboard.quizScores[quizCategory] = score;

    const { overallScore, ...quizCategories } = dashboard.quizScores; // Exclude overallScore
    const scores = Object.values(quizCategories).filter((value) => typeof value === "number" && value > 0);

    // Compute average of non-zero quiz scores
    dashboard.quizScores.overallScore = scores.reduce((acc, val) => acc + val, 0) /scores.length;

    dashboard.scoreHistory.push({
      scores: { ...dashboard.quizScores },
    });

    if (dashboard.scoreHistory.length > 5) {
      dashboard.scoreHistory = dashboard.scoreHistory.slice(-5);
    }    

    await dashboard.save();

    res.status(200).json({ message: "Quiz scores updated successfully", dashboard });
  } catch (error) {
    res.status(500).json({ message: "Failed to update quiz scores", error: error.message });
  }
};

const uploadProfileImage = async (req, res) => {
  const { userId, imageUrl } = req.body;

  try {
    const dashboard = await Dashboard.findOne({ user: userId });

    if (!dashboard) {
        dashboard = await Dashboard.create({ user: req.user._id });
      return res.status(404).json({ message: "Dashboard data not found" });
    }

    dashboard.imageUrl = imageUrl;
    await dashboard.save();

    res.status(200).json({ message: "Profile image updated successfully", imageUrl: dashboard.imageUrl });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile image", error: error.message });
  }
};

module.exports = { getDashboardData, updateQuizScores, uploadProfileImage };
