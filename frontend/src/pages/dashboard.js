import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import "../styles/dashboard.css";
import "../styles/leaderboard.css"

const Dashboard = () => {
    const defaultImage =
    "https://s3-alpha-sig.figma.com/img/c0e7/2200/9b7eed5a0b793d813121bca45fc43ee2?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OwfOV0P~uf4ij8la9d04ln9gQbHZhqWiw0bPdEylOtCxHJE7EiqATTtdo0jj2oVNi1mOkipbYuqad6eYh3n3sKZkiV0iK5pX3tgKM7jkT81zI9qUJxWuFYZ7AyDBLRUfwynyLx9CI5UDZQhBS8D13bko1j-Gw2BPi8dkWhD48a7cG7IWpsVYihMSkPSXbOveXLOQ4VOnYymKQDayjr7s1CAyzXqM5qxcSXzPm1CNa1jpfDAsyuWfJixAaXCh6XL8cV3tjoAqX15z~5jskduSo5n6K1F0AKlndo4f7cqaaAotBFjnLo9LTEZc~xTBbsCCURT7oE2VnOkOKWKOIuwK4Q__";
  
  const [profileImage, setProfileImage] = useState(defaultImage);
  const [showOptions, setShowOptions] = useState(false); 

  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu open/close
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState); // Toggle the state
  };

  // to close ham
  

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
  

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false); 
  // const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);
  
  const handleDeleteImage = () => {
    setProfileImage(defaultImage); 
    setShowOptions(false); 
  };

  const handleLogout = () => {
    toast(
      (t) => (
        <div className="toast-popup">
          <p>Are you sure you want to logout ?</p>
          <div className="toast-popup-buttons">
            <button
              className="confirm-button"
              onClick={() => {
                toast.dismiss(t.id); 
                  
              }}
            >
              <Link to="/login">Confirm</Link>
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
      {/*  
      <nav className="navbar">
        <div className="logo">
          <a href="/">HealthGuard Pro</a>
        </div>
        <div className='close-nav'>
        <div className={`app-container ${isMenuOpen ? "menu-open" : ""}`}>
        <ul className="nav-links">
          <li>
            <a href="/">Take Test</a>
          </li>
          <li>
          <Link to="/leaderboard">Leaderboard</Link>
            
          </li>
          <li>
            <div className="parent-container">
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
          </li>
        </ul>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? "✖" : "☰"}
      </div>
      </div>
      
      </nav>
   */}

<header className="header-lead">
        <h1 className="logo">HealthGuard Pro</h1>
        <nav>
          {/* Hamburger Icon for Mobile */}
          <div className="hamburger" onClick={toggleMenu}>
            <svg clip-rule="evenodd"   width="25" height="25"  fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 15.75c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z" fill-rule="nonzero"/></svg>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          {/* Navbar Menu */}
          <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <button className="close-ham" onClick={closeMenu} ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
            </button>
            <button className="navbar-button"><Link to="/quiz">Take Test</Link></button>
            <button className="navbar-button"><Link to="/leaderboard">Leaderboard</Link></button>
            <button className="navbar-button logout-button" onClick={handleLogout}>LogOut</button>
          </div>
        </nav>
      </header>








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
