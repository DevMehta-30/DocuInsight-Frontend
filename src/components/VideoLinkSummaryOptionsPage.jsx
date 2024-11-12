// VideoLinkSummaryOptionsPage.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation for routing
import "./VideoLinkSummaryOptionsPage.css"; // Import the new CSS file
import axios from "axios";

function VideoLinkSummaryOptionsPage() {
  const [fileInputs, setFileInputs] = useState([]); // State for file inputs
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const location = useLocation();
  const [combinedText, setCombinedText] = useState(
    location.state?.transcript || ""
  );

  const handleFileSubmit = async () => {
    if (fileInputs.length > 0) {
      const formData = new FormData();
      fileInputs.forEach((file) => formData.append("files", file));
      setLoading(true);

      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/process_files",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const newText = response.data.text;
        setCombinedText((prevText) => prevText + "\n" + newText);
        alert("Files processed and combined with PDF content!");
      } catch (error) {
        console.error("Error processing the files:", error);
        alert("Error processing the files. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("No files uploaded. Please upload at least one file.");
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
      {!loading && <h1 className="title">What Would You Like to Do?</h1>}
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
          multiple
          onChange={(e) => setFileInputs([...e.target.files])}
        />
        <button className="submit-button" onClick={handleFileSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default VideoLinkSummaryOptionsPage;
