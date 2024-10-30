// VideoLinkPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SummaryOptionsPage.css'; // Import the same CSS for styling

function VideoLinkPage() {
  const [videoLink, setVideoLink] = useState('');
  const navigate = useNavigate();

  const handleVideoSubmit = () => {
    if (videoLink) {
      // Redirect to Summary Options Page if the video link is provided
      navigate('/summary-options');
    } else {
      alert('Please enter a video link.');
    }
  };

  const handleSummarizeClick = () => {
    navigate('/summary'); // Redirect to the Summary Page
  };

  return (
    <div className="summary-options-page">
      <h1 className="title">Enter Video Link</h1>
      <div className="video-link-container">
        <input
          type="text"
          placeholder="Paste video link here..."
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
        <button className="submit-button" onClick={handleVideoSubmit}>
          Submit
        </button>
      </div>
      <div className="button-container">
        <button className="action-button" onClick={handleSummarizeClick}>
          Summarize Content
        </button>
      </div>
    </div>
  );
}

export default VideoLinkPage;
