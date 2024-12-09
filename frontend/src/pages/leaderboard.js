import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/leaderboard.css";

const leaderboardData = [
  { name: "Aurelia T. Voss", rank: 1, image: "https://res.cloudinary.com/ddfwslkx0/image/upload/v1733584479/Kayla-Person_lmw1h6.jpg", isTop: true },
  { name: "Jaxon Y. Sterling", rank: 2, image: "https://res.cloudinary.com/ddfwslkx0/image/upload/v1733584645/depositphotos_202216884-stock-photo-portrait-year-old-man-relaxing_kncf04.webp" },
  { name: "Kael C. Mercer", rank: 3, image: "https://res.cloudinary.com/ddfwslkx0/image/upload/v1733584703/woman-mobile-camera-home-emotion-person-selfie-blogger-phone-smartphone-photo_yvpbn8.jpg" },
  { name: "Maren X. Kline", rank: 4, image: "https://res.cloudinary.com/ddfwslkx0/image/upload/v1733584577/pexels-photo-1239291_vthw6f.jpg" },
  { name: "Dario P. Keane", rank: 5, image: "https://res.cloudinary.com/ddfwslkx0/image/upload/v1733584780/-Type-Of-Person-_spm1x7.webp" },
];

const Leaderboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);
  const closeMenu = () => setIsMenuOpen(false);

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
  

  const filteredData = leaderboardData
    .filter((user) => !user.isTop)
    .map((user, index) => ({ ...user, rank: index + 2 }));

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
            src={leaderboardData[0].image}
            alt={leaderboardData[0].name}
            className="top-profile-image"
          />
          <h2 className="top-name">{leaderboardData[0].name}</h2>
          <p className="top-rank">#1</p>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="leaderboard-list">
        <div className="list-header">
          <h3>Leaderboard</h3>
          <h3>Rank</h3>
        </div>
        {filteredData.map((user) => (
          <div className="list-item" key={user.rank}>
            <div className="user-info">
              <img src={user.image} alt={user.name} className="list-profile-image" />
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
    
