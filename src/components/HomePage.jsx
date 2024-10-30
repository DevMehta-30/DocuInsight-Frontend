import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import logoImage from "../assets/logo.png";
import mainImage from "../assets/main.png";
import UserImage from "../assets/user.png";

function HomePage() {
  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
        <img src={logoImage} alt="DocuInsight Logo" className="logo" />
        <div className="header-right">
          <Link to="/get-started">
            <button className="get-started-button">Get started!</button>
          </Link>
          <img src={UserImage} alt="User account" className="user-image" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>
            From <span className="italic highlight">Content</span><br />
            to <span className="italic highlight">Clarity</span>
          </h1>
          <p>Turn PDFs and videos into bite-sized insights and get answers to your questions with just a click.</p>
          <Link to="/get-started">
            <button className="get-started-button">Get started!</button>
          </Link>
        </div>
        <div className="hero-image">
          <img src={mainImage} alt="Chart" className="chart-image" />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
