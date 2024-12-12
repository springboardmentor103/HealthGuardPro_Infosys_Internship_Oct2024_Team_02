import React, { useState, useEffect,useContext } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import endpoints from "../config/apiConfig";
import AuthContext from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import "../styles/leaderboard.css";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  // Toggle menu visibility
  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);
  const closeMenu = () => setIsMenuOpen(false);

  // Handle logout functionality
  const handleLogout = () => {
    setShowToast(true);
  };

  const confirmLogout = () => {
    setShowToast(false);
    navigate("/login"); // Redirect to the login page
  };

  const cancelLogout = () => {
    setShowToast(false);
  };

  // Fetch leaderboard data on component mount
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(endpoints.leaderboard, {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with the token as needed
          },
        });
        const { leaderboard, userData } = response.data;
        setLeaderboardData(leaderboard);
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching leaderboard data", error);
        toast.error("Failed to load leaderboard data.");
      }
    };

    fetchLeaderboard();
  }, []);

  // Ensure leaderboard is ready
  if (!leaderboardData.length || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="leaderboard-container">
      {/* Header */}
      <header className="header">
        <h1 className="logo">HealthGuard Pro</h1>
        <nav>
          <div className="hamburger" onClick={toggleMenu}>
            {/* Hamburger SVG */}
          </div>
          <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
            <button className="close-ham" onClick={closeMenu}>
              {/* Close Icon */}
            </button>
            <Link to="/" className="nav-button">Dashboard</Link>
            <button className="logut-button" onClick={handleLogout}>Logout</button>
          </div>
        </nav>
      </header>

      {/* Top Section */}
      <div className="top-section">
        {/* Background Image */}
        <img
          src="https://res.cloudinary.com/ddfwslkx0/image/upload/v1733582960/how-quickly-can-you-get-in-shape-expert-insights-and-tips_zchdhg.webp"
          alt="Park Background"
          className="background-image"
        />
        <div className="blur-overlay"></div>
        <div className="top-user">
          <img
            src={userData.image}
            alt={userData.name}
            className="top-profile-image"
          />
          <h2 className="top-name">{userData.name}</h2>
          <p className="top-rank">#{userData.rank}</p>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="leaderboard-list">
        <div className="list-header">
          <h3>Leaderboard</h3>
          <h3>Rank</h3>
        </div>
        {leaderboardData.slice(0, 11).map((user) => ( // Display top 10, excluding the current user (index 0)
          <div className="list-item" key={user.rank}>
            <div className="user-info">
              <img
                src={user.image}
                alt={user.name}
                className="list-profile-image"
              />
              <p className="user-name">{user.name}</p>
            </div>
            <p className="user-rank">{user.rank}</p>
          </div>
        ))}
      </div>

      {showToast && (
        <div className="Toastify__toast-container">
          <div className="Toastify__toast">
            <div className="toast-popup">
              <p>Are you sure you want to logout?</p>
              <div className="toast-popup-buttons">
                <button className="confirm-button" onClick={confirmLogout}>
                  Confirm
                </button>
                <button className="cancel-button" onClick={cancelLogout}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
