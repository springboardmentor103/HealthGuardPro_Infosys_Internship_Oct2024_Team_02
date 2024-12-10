import React, { useState } from "react";
import "../styles/leaderboard.css";
import { Link } from "react-router-dom";

const leaderboardData = [
  {
    name: "Aurelia T. Voss",
    rank: 1,
    image:
      "https://s3-alpha-sig.figma.com/img/e194/5bc4/4c5180626eb8769c6ad7e0e1db14be8b?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ye8QK1mTNN6JZ63DVr6lfQ9YUo15EpUQqkUM8lNblCu0LqZIGaiEzYckz~~FxCKg7CjyCDauRO3WTcXY8Z0HXO5ea3IgzfhgWM8p9ZuWdLs3CxgmzuEmoqR4eUUffN~zhLb8sC7rq7Dw74-tp~LLaqebTyFWsa~hTYpLkpzwJH0B6DgJn2mutwGXMUnlqOC6zPyIdzKnLQ~7uZQXIJkH4nLZqBYdrVspoLroevwLrMMdG1BCKyL5B9Kvv9NXgFjDM95zBtSEytf0ZOPMVh5X52meK4nHAsVYHqvGKiopGDmJlXI4lEBu86H~pqxK-ii1toO-GEGRffsqkT5vl~ToAA__",
    isTop: true,
  },
  {
    name: "Jaxon Y. Sterling",
    rank: 2,
    image:
      "https://s3-alpha-sig.figma.com/img/7d54/0dbe/b03e7c0778fdb82ed345a21a7fed8df4?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DuSa-8NOuX1roxMSQxE5qI0eWcolwaVNIY9wZg4hI2UP5dN80Lbl1oxGJykj9MYXSBKCklFc0zKReNv5c-EIXzRzq9G15uG4Q9sSQQ-6kfEI7DO~b07pZj3bgHbxmSXOul7N~fqJG-ksraFBysX-LpDdEFjziI-2SS6f-nJEkWXl9k716mEYlZT8g2KermOZjRxjsFMHU87lBG1dOtof-KSOf-~hQg1ITqOLC--9AuS1-tRkQexTETKOW0NGAJfXd3B15engeR7o8jSHNxyQuQzQ4tgu2A6nV~9QO8qxE-BxGdnZ6s7SU0i5VmwtAM2wqNTqfGuk9uL6ZLhFdLUFpQ__",
  },
  {
    name: "Kael C. Mercer",
    rank: 3,
    image:
      "https://s3-alpha-sig.figma.com/img/e194/5bc4/4c5180626eb8769c6ad7e0e1db14be8b?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ye8QK1mTNN6JZ63DVr6lfQ9YUo15EpUQqkUM8lNblCu0LqZIGaiEzYckz~~FxCKg7CjyCDauRO3WTcXY8Z0HXO5ea3IgzfhgWM8p9ZuWdLs3CxgmzuEmoqR4eUUffN~zhLb8sC7rq7Dw74-tp~LLaqebTyFWsa~hTYpLkpzwJH0B6DgJn2mutwGXMUnlqOC6zPyIdzKnLQ~7uZQXIJkH4nLZqBYdrVspoLroevwLrMMdG1BCKyL5B9Kvv9NXgFjDM95zBtSEytf0ZOPMVh5X52meK4nHAsVYHqvGKiopGDmJlXI4lEBu86H~pqxK-ii1toO-GEGRffsqkT5vl~ToAA__",
  },
  {
    name: "Maren X. Kline",
    rank: 4,
    image:
      "https://s3-alpha-sig.figma.com/img/c0e7/2200/9b7eed5a0b793d813121bca45fc43ee2?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OwfOV0P~uf4ij8la9d04ln9gQbHZhqWiw0bPdEylOtCxHJE7EiqATTtdo0jj2oVNi1mOkipbYuqad6eYh3n3sKZkiV0iK5pX3tgKM7jkT81zI9qUJxWuFYZ7AyDBLRUfwynyLx9CI5UDZQhBS8D13bko1j-Gw2BPi8dkWhD48a7cG7IWpsVYihMSkPSXbOveXLOQ4VOnYymKQDayjr7s1CAyzXqM5qxcSXzPm1CNa1jpfDAsyuWfJixAaXCh6XL8cV3tjoAqX15z~5jskduSo5n6K1F0AKlndo4f7cqaaAotBFjnLo9LTEZc~xTBbsCCURT7oE2VnOkOKWKOIuwK4Q__",
  },
  {
    name: "Dario P. Keane",
    rank: 5,
    image:
      "https://s3-alpha-sig.figma.com/img/4ec9/25dd/847c76b187d8b3a8cf5811d5c166f706?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Fi8uOBYbcMllVkWXXAygVUlVhNfExH5FC2A1jEf-oHmWSHAsZlpe01kYrRoWXPRxHjw7P3xVACgOj5C4v7punQnyMgdV~5ZQE2I~K-aVJe4Tbg1QkAwLpVCskFBaSMZYXE7i2LPgWLkOSYRRajPGqaovk3DY9YaQqV8Kl0mzd-izuizjdLcPxVJd8v1qZ9HvfXvb-8~OuhsPPvVp55b9hB7IFuzJ4TSlojv7uk7QmByoJK4jVLtoxbepF84a78wKjFoSeMx6OBVFebhw1~bulr1vtCNCS2ZtvoCIUnwbxL0RjGiAwmyxDCzNn6MHvGT8sD~CJljK-AZAi5cwhWEg6A__",
  },
];

const Leaderboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);

  const filteredData = leaderboardData
    .filter((user) => !user.isTop)
    .map((user, index) => ({ ...user, rank: index + 2 })); // Start from rank 2
  const closeMenu = () => setIsMenuOpen(false); // Function to close the menu

  return (
    <div className="leaderboard-container">
      {/* Header */}
      <header className="header">
        <h1 className="logo">HealthGuard Pro</h1>
        <nav>
          {/* Hamburger Icon for Mobile */}
          <div className="hamburger" onClick={toggleMenu}>
            <svg
              clip-rule="evenodd"
              width="25"
              height="25"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m21 15.75c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z"
                fill-rule="nonzero"
              />
            </svg>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          {/* Navbar Menu */}
          <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
            <button className="close-ham" onClick={closeMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
              </svg>
            </button>

            <button className="nav-button">
              <Link to="/">DashBoard</Link>
            </button>
            <button className="nav-button logout-button">
              <Link to="*">Logout</Link>
            </button>
          </div>
        </nav>
      </header>

      {/* Top Section */}
      <div className="top-section">
        {/* Background Image */}
        <img
          src="https://s3-alpha-sig.figma.com/img/98d3/ca01/1baa592b8cb8f08b29efa9356a908d0e?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BGpZMYUWZrMc0~WYDNIFeXmrLyb11L2bQ6oATGyOfipPCtRkmhJHva8Ay5ufvWfX-J2VONn4ySUm6gi9ZcYjDiuOSn~mwiBbd2DrUwHCE7Ou30r4USOxYcSBPI8WiZGVd5nz-S60HHEcaXGRG6RMy0TpA4CZb7gLtndFcTRjctqqFGiRiIfg3xAa7oyr945MIIfXHmxVy0ucZsYFcRvOfXeRHRHs~wXC5eRsuBtWL8tWCqWgCjHYF5RBkxBStjqxf5CFbV1OAIjFSx6vSaYppfwawfKMtfYbIqxKLjHGWhnHCoIRYAz-7hJcntX-xhdzwog0XqNyxehngW96TCy~nA__"
          alt="Park Background"
          className="background-image"
        />
        {/* Blurry Overlay */}
        <div className="blur-overlay"></div>
        {/* Top User Profile */}
        <div className="top-user">
          <img
            src={leaderboardData[0].image}
            alt={leaderboardData[0].name}
            className="top-profile-image"
          />
          <h2 className="top-name">
            {leaderboardData[0].name}
            <spam>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g clip-path="url(#clip0_273_4377)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.79702 1.05089C8.39687 0.523157 7.60351 0.523157 7.20336 1.05089L6.21064 2.36012C5.9923 2.64807 5.63559 2.79582 5.27759 2.7466L3.64987 2.52279C2.99375 2.43258 2.43277 2.99357 2.52298 3.64969L2.74678 5.27741C2.796 5.63541 2.64825 5.99212 2.3603 6.21045L1.05107 7.20318C0.52334 7.60333 0.52334 8.39669 1.05107 8.79684L2.3603 9.78956C2.64825 10.0079 2.796 10.3646 2.74678 10.7226L2.52298 12.3503C2.43277 13.0064 2.99375 13.5674 3.64987 13.4772L5.27759 13.2534C5.63559 13.2042 5.9923 13.352 6.21064 13.6399L7.20336 14.9491C7.60351 15.4769 8.39687 15.4769 8.79702 14.9491L9.78975 13.6399C10.0081 13.352 10.3648 13.2042 10.7228 13.2534L12.3505 13.4772C13.0066 13.5674 13.5676 13.0064 13.4774 12.3503L13.2536 10.7226C13.2044 10.3646 13.3521 10.0079 13.6401 9.78956L14.9493 8.79684C15.477 8.39669 15.477 7.60333 14.9493 7.20317L13.6401 6.21045C13.3521 5.99211 13.2044 5.63541 13.2536 5.27741L13.4774 3.64969C13.5676 2.99357 13.0066 2.43258 12.3505 2.52279L10.7228 2.7466C10.3648 2.79582 10.0081 2.64807 9.78975 2.36012L8.79702 1.05089ZM11.2734 6.87378C11.664 6.48326 11.664 5.85009 11.2734 5.45957C10.8829 5.06904 10.2498 5.06904 9.85923 5.45957L7.26634 8.05246L6.50678 7.2929C6.11625 6.90238 5.48309 6.90238 5.09256 7.2929C4.70204 7.68343 4.70204 8.31659 5.09256 8.70712L6.55923 10.1738C6.74677 10.3613 7.00112 10.4667 7.26634 10.4667C7.53155 10.4667 7.78591 10.3613 7.97344 10.1738L11.2734 6.87378Z"
                    fill="#12904D"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_273_4377">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </spam>
          </h2>

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
    </div>
  );
};

export default Leaderboard;
