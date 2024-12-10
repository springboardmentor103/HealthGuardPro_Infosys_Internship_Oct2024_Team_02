const Dashboard = require("../models/Dashboard");

const getLeaderboard = async (req, res) => {
  try {
    const dashboards = await Dashboard.find({})
      .populate("user", "name email") 
      .sort({ "quizScores.overallScore": -1 }) 
      .limit(10); 

    const userDashboard = await Dashboard.findOne({ user: req.user._id })
      .populate("user", "name email")
      .lean(); // Convert the Mongoose object to plain JS 

    if (!userDashboard) {
      return res.status(404).json({ message: "User dashboard not found" });
    }

    const allDashboards = await Dashboard.find({})
      .populate("user", "name email")
      .sort({ "quizScores.overallScore": -1 });

    const userRank =
      allDashboards.findIndex(
        (dashboard) => dashboard.user._id.toString() === req.user._id.toString()
      ) + 1;

    // Add the user's rank to the response
    const leaderboard = dashboards.map((dashboard, index) => ({
      rank: index + 1,
      name: dashboard.user.name,
      image: dashboard.imageUrl,
      overallScore: dashboard.quizScores.overallScore,
    }));

    const userData = {
      rank: userRank,
      name: userDashboard.user.name,
      image: userDashboard.imageUrl,
      overallScore: userDashboard.quizScores.overallScore,
    };

    res.status(200).json({ leaderboard, userData });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leaderboard", error: error.message });
  }
};

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

    if (dashboard.scoreHistory.length > 6) {
      dashboard.scoreHistory = dashboard.scoreHistory.slice(-6);
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

module.exports = { getLeaderboard,getDashboardData, updateQuizScores, uploadProfileImage };
