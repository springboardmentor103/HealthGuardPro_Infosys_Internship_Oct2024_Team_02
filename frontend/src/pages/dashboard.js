import React, { useState, useEffect, useMemo, useContext } from "react";
import { ToastContainer, toast } from "react-toastify"; // Keep this import
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../context/AuthContext";
import "../styles/dashboard.css";
import Confetti from "react-confetti";

const Dashboard = () => {
  const defaultImage =
    "https://res.cloudinary.com/ddfwslkx0/image/upload/v1733317585/images_iwucqp.png";

  const [profileImage, setProfileImage] = useState(defaultImage);
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [scores, setScores] = useState({
    "Physical Fitness": null,
    Nutrition: null,
    "Mental Well-Being": null,
    Lifestyle: null,
    "Bio Markers": null,
  });
  const [showConfetti, setShowConfetti] = useState(false);

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Retrieve full name from localStorage
  const fullName = localStorage.getItem("userFullName") || "User";

  const data = useMemo(
    () => [
      {
        title: "Physical Fitness",
        description: "Overall Score",
        route: "/quiz",
      },
      {
        title: "Nutrition",
        description: "Overall Score",
        route: "/nutritionquiz",
      },
      {
        title: "Mental Well-Being",
        description: "Last week avg scoring",
        route: "/mentalquiz",
      },
      {
        title: "Lifestyle",
        description: "Last week avg scoring",
        route: "/lifestylequiz",
      },
      {
        title: "Bio Markers",
        description: "Last week avg scoring",
        route: "/biomarkersquiz",
        colSpan: true,
      },
      {
        title: "Overall Score",
        description: "Overall Score",
        isBottom: true,
        colSpan: true,
      },
    ],
    []
  );

  const scoreHistory = [
    { id: 1, timeStamp: "2024-11-18 10:00 AM", overallScore: "95%" },
    { id: 2, timeStamp: "2024-11-17 5:00 PM", overallScore: "86%" },
    { id: 3, timeStamp: "2024-11-16 2:30 PM", overallScore: "75%" },
    { id: 4, timeStamp: "2024-11-15 7:38 AM", overallScore: "100%" },
    { id: 5, timeStamp: "2024-11-14 11:30 AM", overallScore: "63%" },
  ];

  const handleViewBoard = (id) => {
    console.log(`View Board clicked for ID: ${id}`);
    // Add navigation or modal logic here
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
      setProfileImage(uploadedImage.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error.message);
      alert("Image upload failed. Please try again.");
    }
  };

  const handleDeleteImage = () => {
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
                  logout(); // Call logout function here
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
      // Simulate a score update
      const randomScore = Math.floor(Math.random() * 101);
      localStorage.setItem(`${title}Score`, randomScore);
      handleScoreUpdate(title); // Update the score dynamically
      navigate(route); // Make sure navigate is called once
    }, 2000);
  };

  /*const retrieveScores = () => {
    const updatedScores = { ...scores };
    Object.keys(scores).forEach((key) => {
      const storedScore = localStorage.getItem(`${key.toLowerCase().replace(/\s/g, '')}Score`);
      updatedScores[key] = storedScore ? parseInt(storedScore, 10) : 0;
    });
    setScores(updatedScores);
  };

  useEffect(() => {
    retrieveScores();
  },[]);*/

  const handleScoreUpdate = (category) => {
    const savedScore = localStorage.getItem(`${category}Score`);
    if (savedScore) {
      setScores((prevScores) => ({
        ...prevScores,
        [category]: parseInt(savedScore, 10),
      }));
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

  useEffect(() => {
    if (localStorage.getItem("showConfetti") === "true") {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, []);

  return (
    <div className="dashboard">
      {loading && (
        <div className="loader-overlay">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "20vh",
            }}
          >
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
          <div
            className="profile-image-background"
            onClick={() => setShowOptions(!showOptions)}
          >
            <img className="profile-image" src={profileImage} alt="Profile" />
          </div>
          <input
            type="file"
            id="file-input"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />
          {showOptions && (
            <div className="profile-options">
              <button
                onClick={() => document.getElementById("file-input").click()}
                className="profile-option-btn"
              >
                Update
              </button>
              <button
                onClick={handleDeleteImage}
                className="profile-option-btn"
              >
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
                  width: `${
                    item.title === "Overall Score"
                      ? overallScore
                      : scores[item.title] || 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="score-history-title">Score History</h3>
      <table className="score-history-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Time Stamp</th>
            <th>Overall Score</th>
            <th>View Board</th>
          </tr>
        </thead>
        <tbody>
          {scoreHistory.slice(0, 5).map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.timeStamp}</td>
              <td>{item.overallScore}</td>
              <td>
                <button
                  className="view-button"
                  onClick={() => handleViewBoard(item.id)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
