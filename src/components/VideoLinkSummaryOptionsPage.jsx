// VideoLinkSummaryOptionsPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import './VideoLinkSummaryOptionsPage.css'; // Import the new CSS file

function VideoLinkSummaryOptionsPage() {
  const [videoLink, setVideoLink] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleVideoSubmit = () => {
    if (videoLink) {
      alert('Video link submitted: ' + videoLink);
      // Handle further actions like processing the video link
    } else {
      alert('Please enter a video link.');
    }
  };

  const handleSummarizeClick = () => {
    navigate('/summary'); // Redirect to the Summary Page
  };

  return (
    <div className="summary-options-page">
      <h1 className="title">What Would You Like to Do?</h1>
      <div className="button-container">
        <button className="action-button" onClick={handleSummarizeClick}>
          Summarize Content
        </button>
      </div>
      <p className="or-line">OR</p>
      <div className="video-link-container">
        <h2>Upload file</h2>
        <input 
          type="file" 
          onChange={(e) => setVideoLink(e.target.value)} 
        />
        <button className="submit-button" onClick={handleVideoSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default VideoLinkSummaryOptionsPage;
