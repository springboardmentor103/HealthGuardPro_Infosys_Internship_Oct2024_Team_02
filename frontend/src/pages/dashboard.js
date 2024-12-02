import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import "../styles/dashboard.css";
// import { Navigate } from 'react-router-dom';

const Dashboard = () => {
    const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLdIEENaWqGZV9kxR871g9p6ywGNnqvbyd3z-3MoYMi-Fc6WZvtU7wE68_RHCBINkRjl4&usqp=CAU";
  
  const [profileImage, setProfileImage] = useState(defaultImage);
  const [showOptions, setShowOptions] = useState(false); 
  const navigate = useNavigate();
  const data = [
    { title: "Physical Fitness", score: "95%", description: "Overall Score" },
    { title: "Nutrition", score: "95%", description: "Overall Score" },
    {
      title: "Mental Well-Being",
      score: "95%",
      description: "Last week avg scoring",
    },
    { title: "Lifestyle", score: "95%", description: "Last week avg scoring" },
    {
      title: "Bio Markers",
      score: "95%",
      description: "Last week avg scoring",
      isBottom: true,
    },
    {
      title: "Overall Score",
      score: "75%",
      description: "Overall Score",
      isBottom: true,
    },
  ];

  const scoreHistory = [
    { id: 1, timeStamp: "2024-11-18 10:00 AM", overallScore: "95%" },
    { id: 2, timeStamp: "2024-11-17 5:00 PM", overallScore: "86%" },
    { id: 3, timeStamp: "2024-11-16 2:30 PM", overallScore: "75%" },
  ];

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return; 
    const data = new FormData(); 
    data.append("file", file);
    data.append("upload_preset", "healthguard_pro");
  
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/ddfwslkx0/image/upload", {
        method: "POST",
        body: data,
      });
  
      if (!res.ok) {
        throw new Error("Failed to upload the image. Please check your Cloudinary credentials and preset.");
      }
  
      const uploadedImage = await res.json();
      setProfileImage(uploadedImage.secure_url); 
      console.log("Uploaded Image URL:", uploadedImage.secure_url); 
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
        <div className="toast-popup">
          <p>Are you sure you want to logout?</p>
          <div className="toast-popup-buttons">
            <button
              className="confirm-button"
              onClick={() => {
                toast.dismiss(t.id); 
                navigate('/');
                  
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
      ),
      {
        duration: 9000, 
        position: "top-center",
      }
    );
  };

  return (
    <div className="dashboard">
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
              <button className="logout-button" onClick={handleLogout}>Logout</button>
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
              <button onClick={() => document.getElementById("file-input").click()} className="profile-option-btn">
                Update
              </button>
              <button onClick={handleDeleteImage} className="profile-option-btn">
                Delete
              </button>
            </div>
          )}
          <div className="profile-name-badge">
            <p className="profile-name">Jack</p>
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
            className={`card ${
              item.title === "Bio Markers"
                ? "bio-markers"
                : item.title === "Overall Score"
                ? "overall-score"
                : ""
            }`}
            key={index}
          >
            <h3>{item.title}</h3>
            <p className="score">{item.score}</p>
            <p>{item.description}</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: item.score }}></div>
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
          {scoreHistory.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.timeStamp}</td>
              <td>{item.overallScore}</td>
              <td>
                <button className="view-button">View</button>
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
