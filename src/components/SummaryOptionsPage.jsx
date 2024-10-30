// SummaryOptionsPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./SummaryOptionsPage.css";

function SummaryOptionsPage() {
  const [videoLink, setVideoLink] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [combinedText, setCombinedText] = useState(location.state?.text || "");
  console.log(combinedText);
  // useEffect(() => {
  //   if (location.state && location.state.file) {
  //     setFileInput(location.state.file);
  //   }
  // }, [location.state]);

  const handleVideoSubmit = async () => {
    if (videoLink) {
      try {
        // Fetch the transcript of the video from the backend
        const response = await axios.post(
          "http://127.0.0.1:5000/summarize_youtube",
          { url: videoLink },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // Combine PDF text with video transcript
        const videoTranscript = response.data.transcript;
        setCombinedText((prevText) => prevText + "\n" + videoTranscript);
        alert("Video link submitted and combined with PDF content!");
      } catch (error) {
        console.error("Error processing the video link:", error);
        alert("Error processing the video link. Please try again.");
      }
    } else {
      alert("Please enter a video link.");
    }
  };

  const handleSummarizeClick = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/summarize",
        { content: combinedText },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Navigate to SummaryPage with the summary
      navigate("/summary", {
        state: { summary: response.data.summary, combinedText: combinedText },
      });
    } catch (error) {
      console.error("Error cannot summarize the content", error);
      alert("Error cannot summarize the content. Please try again.");
    }
  };

  return (
    <div className="summary-options-page">
      <h1 className="title">What Would You Like to Do?</h1>
      <div className="button-container">
        <button className="action-button" onClick={handleSummarizeClick}>
          Summarize Content
        </button>
      </div>
      <div className="or-line">OR</div>
      <div className="video-link-container">
        <h2>Combined summary of PDF and Video</h2>
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
    </div>
  );
}

export default SummaryOptionsPage;
