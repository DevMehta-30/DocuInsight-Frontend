import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./SummaryOptionsPage.css";
import Spinner from "./Spinner"; // Import the spinner component

function SummaryOptionsPage() {
  const [videoLink, setVideoLink] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const location = useLocation();
  const [combinedText, setCombinedText] = useState(location.state?.text || "");

  const handleVideoSubmit = async () => {
    if (videoLink) {
      setLoading(true); // Start loading when video submit begins
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/summarize_youtube",
          { url: videoLink },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const videoTranscript = response.data.transcript;
        setCombinedText((prevText) => prevText + "\n" + videoTranscript);
        alert("Video link submitted and combined with PDF content!");
      } catch (error) {
        console.error("Error processing the video link:", error);
        alert("Error processing the video link. Please try again.");
      } finally {
        setLoading(false); // Stop loading once API call finishes
      }
    } else {
      alert("Please enter a video link.");
    }
  };

  const handleSummarizeClick = async () => {
    setLoading(true); // Start loading when summarization begins
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
      navigate("/summary", {
        state: { summary: response.data.summary, combinedText: combinedText },
      });
    } catch (error) {
      console.error("Error cannot summarize the content", error);
      alert("Error cannot summarize the content. Please try again.");
    } finally {
      setLoading(false); // Stop loading once API call finishes
    }
  };

  return (
    <div className="summary-options-page">
      {!loading && <h1 className="title">What Would You Like to Do?</h1>}{" "}
      {/* Conditionally render title */}
      {loading ? (
        <Spinner /> // Display spinner when loading
      ) : (
        <div>
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
      )}
    </div>
  );
}

export default SummaryOptionsPage;
