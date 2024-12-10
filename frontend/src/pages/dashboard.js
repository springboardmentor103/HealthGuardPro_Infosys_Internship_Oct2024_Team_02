import React, { useState, useEffect, useMemo, useContext,useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";  // Keep this import
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Confetti from "react-confetti";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import endpoints from "../config/apiConfig";
import "../styles/dashboard.css";

const Dashboard = () => {
  const defaultImage =
    "https://res.cloudinary.com/ddfwslkx0/image/upload/v1733317585/images_iwucqp.png";

  const [profileImage, setProfileImage] = useState(defaultImage);
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [scores, setScores] = useState({
    "Physical Fitness": null,
    "Nutrition": null,
    "Mental Well-Being": null,
    "Lifestyle": null,
    "Bio Markers": null,
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentView, setCurrentView] = useState(null);
  const [scoreHistory, setScoreHistory] = useState([]);

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Retrieve full name from localStorage
  const fullName = localStorage.getItem("userName") || "User";
  const { token } = useContext(AuthContext);
  const userId = localStorage.getItem("userId");

  const fetchDashboardData = useCallback(async () => {
    try {
      const response = await axios.get(endpoints.fetchDashboard(userId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        const { quizScores, imageUrl, scoreHistory } = response.data;

        setScores({
          "Physical Fitness": quizScores.physicalFitness || 0,
          "Nutrition": quizScores.nutrition || 0,
          "Mental Well-Being": quizScores.mentalWellBeing || 0,
          "Lifestyle": quizScores.lifestyle || 0,
          "Bio Markers": quizScores.bioMarkers || 0,
        });
        // Set the profile image URL
        setProfileImage(imageUrl || defaultImage);
        setScoreHistory([...scoreHistory].reverse()); // Save fetched history
        // console.log(scoreHistory);
        // Update score history if needed
        // (handle or log scoreHistory as per requirements)
      } else {
        toast.error("Failed to fetch dashboard data.");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error.message);
      toast.error("Error loading dashboard data. Please try again.");
    }
  }, [userId, token]); // Dependencies for useCallback
  
  // Updated useEffect
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]); 

  const formatDate = (timestamp) => {
    // return moment(timestamp).format("YYYY-MM-DD hh:mm A");
    return moment(timestamp).format("hh:mm A DD-MM-YYYY");
  };


  const data = useMemo(() => [
    { title: "Physical Fitness", description: "Fitness Score", route: "/quiz" },
    { title: "Nutrition", description: "Nutrition Score", route: "/nutritionquiz" },
    { title: "Mental Well-Being", description: "Mental Health Score", route: "/mentalquiz" },
    { title: "Lifestyle", description: "Lifestyle Score", route: "/lifestylequiz" },
    { title: "Bio Markers", description: "Health Indicators", route: "/biomarkersquiz", colSpan: true },
    { title: "Overall Score", description: "Combined Results", isBottom: true, colSpan: true },
  ], []);
  



 const handleViewBoard = (index) => {
    if (currentView === index) {
      // Close view and reset current data
      setCurrentView(null);
      fetchDashboardData(); // Reset the scores to the latest
    } else {
      // View specific history
      setCurrentView(index);
      const selectedData = scoreHistory[index].scores;
      setScores({
        "Physical Fitness": selectedData.physicalFitness || 0,
        "Nutrition": selectedData.nutrition || 0,
        "Mental Well-Being": selectedData.mentalWellBeing || 0,
        "Lifestyle": selectedData.lifestyle || 0,
        "Bio Markers": selectedData.bioMarkers || 0,
      });
    }
  };
  

  const renderScoreHistory = () => {
    if (scoreHistory.length < 2) return null; // Don't display if history has less than 2 entries

    const displayedHistory = 
    scoreHistory.length === 5 ? scoreHistory.slice(1, 5) : scoreHistory.slice(1);// Reverse the entire history

    return (
      <div>
        <h3 className="score-history-title">Score History</h3>
        <table className="score-history-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Time Stamp</th>
              <th>Overall Score</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedHistory.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{formatDate(item.timestamp)}</td>
                <td>{Math.round(item.scores.overallScore)}%</td>
                <td>
                  <button
                    className="view-button"
                    onClick={() => handleViewBoard(index+1)}
                  >
                    {currentView === index ? "Close" : "View"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


const handleImageChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "healthguard_pro");

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/ddfwslkx0/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    if (!res.ok) {
      throw new Error("Failed to upload the image.");
    }

    const uploadedImage = await res.json();
    const imageUrl = uploadedImage.secure_url;


    // Send imageUrl to backend
    const payload = {
      userId,
      imageUrl,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(endpoints.uploadImage, payload, config);

    if (response.status === 200) {
      toast.success("Profile image updated successfully!");
      setProfileImage(imageUrl);
      setShowOptions(false);
    } else {
      throw new Error("Failed to send image URL to backend.");
    }
  } catch (error) {
    console.error("Error:", error.message);
    toast.error("Image upload or update failed. Please try again.");
  }
};

  const handleDeleteImage = async() => {
    try{
      const imageUrl = defaultImage;
      const payload = {
        userId,
        imageUrl,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(endpoints.uploadImage, payload, config);

      if (response.status === 200) {
        toast.success("Profile image updated successfully!");
      } else {
        throw new Error("Failed to send image URL to backend.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Image upload or update failed. Please try again.");
    }

    setProfileImage(defaultImage);
    setShowOptions(false);
  };

  const handleLogout = () => {
    toast(
      (t) => (
        <div className="popup">
          <div className="toast-popup">
            <p>Are you sure you want to logout?</p>
            <div className="toast-popup-buttons">
              <button
                className="confirm-button"
                onClick={() => {
                  toast.dismiss(t.id);
                  logout();  // Call logout function here
                  navigate("/login"); // Navigate to login page after logout
                }}
              >
                Confirm
              </button>
              <button
                className="cancel-button"
                onClick={() => toast.dismiss(t.id)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ),
      {
        duration: 9000,
        position: "top-center",
      }
    );
  };
  
  
  const handleCardClick = (route, title) => {
    if (title === "Overall Score") {
      console.log("No action for Overall Score card");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleScoreUpdate(title); // Update the score dynamically
      navigate(route); // Make sure navigate is called once
    }, 2000);
  };

  const handleScoreUpdate = (category) => {
    const savedScore = localStorage.getItem(`${category}Score`);
    // console.log(category);
    // console.log("savedscore: "+savedScore);
    if (savedScore) {
      setScores((prevScores) => ({
        ...prevScores,
        [category]: parseInt(savedScore, 10),
      }));
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Confetti duration

      

    }
  };

  // Calculate Overall Score
  const calculateOverallScore = () => {
    const physicalScore = scores["Physical Fitness"];
    const nutritionScore = scores["Nutrition"];
    const mentalScore = scores["Mental Well-Being"];
    const lifestyleScore = scores["Lifestyle"];
    const biomarkerScore = scores["Bio Markers"];

    // Calculate the sum of all category scores
    const totalScore =
      (physicalScore || 0) +
      (nutritionScore || 0) +
      (mentalScore || 0) +
      (lifestyleScore || 0) +
      (biomarkerScore || 0);

    // Average the score (out of 5 categories)
    const overallScore = totalScore / 5;

    return overallScore;
  };

  const overallScore = calculateOverallScore();

  useEffect(() => {
    // Initialize scores from localStorage for all categories
    data.forEach((item) => {
      handleScoreUpdate(item.title);
    });
  }, [data]);

return (
    <div className="dashboard">
      {loading && (
        <div className="loader-overlay">
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "20vh" }}>
            <CircularProgress color="success" />
            <p style={{ marginTop: "20px" }}>Loading... Please wait</p>
          </Box>
        </div>
      )}

      {showConfetti && <Confetti />}

      <nav className="navbar">
        <div className="logo">
          <a href="/dashboard">HealthGuard Pro</a>
        </div>
        <ul className="nav-links">
          <li>
            <a href="/leaderboard">Leaderboard</a>
          </li>
          <li>
            <div className="parent-container">
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>

      <div className="profile-section">
        <div className="profile-container">
          <div className="profile-image-background" onClick={() => setShowOptions(!showOptions)}>
            <img className="profile-image" src={profileImage} alt="Profile" />
          </div>
          <input type="file" id="file-input" style={{ display: "none" }} accept="image/*" onChange={handleImageChange} />
          {showOptions && (
            <div className="profile-options">
              <button onClick={() => document.getElementById("file-input").click()} className="profile-option-btn">
                Update
              </button>
              <button onClick={handleDeleteImage} className="profile-option-btn">
                Delete
              </button>
            </div>
          )}
          <div className="profile-name-badge">
            <p className="profile-name">{fullName}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-header">
        <h2>
          Health and Wellness
          <br />
          Dashboard
        </h2>
      </div>

      <div className="card-container">
        {data.map((item, index) => (
          <div
            key={index}
            className={`card ${item.colSpan ? "col-span-2" : ""}`}
            onClick={() => handleCardClick(item.route, item.title)}
          >
            <h3>{item.title}</h3>
            <p className="score">
              {item.title === "Overall Score"
                ? `${overallScore.toFixed(0)}%`
                : `${scores[item.title] || 0}%`}
            </p>
            <p>{item.description}</p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${item.title === "Overall Score" ? overallScore : scores[item.title] || 0}%`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

       {renderScoreHistory()}

      <ToastContainer />
    </div>
  );
};

export default Dashboard;


