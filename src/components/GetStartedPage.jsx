// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./GetStartedPage.css";
// import axios from "axios";

// function GetStartedPage() {
//   const [fileInputs, setFileInputs] = useState([]); // Store multiple files
//   const navigate = useNavigate();

//   const handleFileChange = (event) => {
//     setFileInputs([...event.target.files]); // Set the array of files
//   };

//   const handleFileSubmit = async () => {
//     if (fileInputs.length > 0) {
//       const formData = new FormData();
//       fileInputs.forEach((file) => formData.append("files", file)); // Append each file

//       try {
//         const response = await axios.post(
//           "http://127.0.0.1:5000/process_files",
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         // Navigate to SummaryOptionsPage with the combined text from all files
//         navigate("/summary-options", { state: { text: response.data.text } });
//       } catch (error) {
//         console.error("Error processing the files:", error);
//         alert("Error processing the files. Please try again.");
//       }
//     } else {
//       alert("No files uploaded. Please upload at least one file.");
//     }
//   };

//   const handleVideoSubmit = () => {
//     navigate("/video-link-summary"); // Navigate to video link summary page
//   };

//   return (
//     <div className="get-started-page">
//       <h1>Get Started</h1>
//       <div className="box-container">
//         <div className="box upload-file">
//           <h2>Upload Files</h2>
//           <input type="file" multiple onChange={handleFileChange} />{" "}
//           {/* Allow multiple files */}
//           <button className="submit-button" onClick={handleFileSubmit}>
//             Submit
//           </button>
//         </div>
//         <div className="box video-link">
//           <h2>Enter Video Link</h2>
//           <input type="text" placeholder="Paste video link here..." />
//           <button className="submit-button" onClick={handleVideoSubmit}>
//             Submit
//           </button>
//         </div>
//         <div className="box generate-quiz">
//           <h2>Generate Quiz</h2>
//           <input type="text" placeholder="Enter quiz details..." />
//           <button className="generate-button">Generate</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GetStartedPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GetStartedPage.css";
import axios from "axios";
import Spinner from "./Spinner"; // Import the spinner component

function GetStartedPage() {
  const [fileInputs, setFileInputs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFileInputs([...event.target.files]);
  };

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
        navigate("/summary-options", { state: { text: response.data.text } });
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

  const handleVideoSubmit = () => {
    navigate("/video-link-summary");
  };

  return (
    <div className="get-started-page">
      <h1>Get Started</h1>
      {loading ? (
        <Spinner /> // Display the spinner component when loading
      ) : (
        <div className="box-container">
          <div className="box upload-file">
            <h2>Upload Files</h2>
            <input type="file" multiple onChange={handleFileChange} />
            <button className="submit-button" onClick={handleFileSubmit}>
              Submit
            </button>
          </div>
          <div className="box video-link">
            <h2>Enter Video Link</h2>
            <input type="text" placeholder="Paste video link here..." />
            <button className="submit-button" onClick={handleVideoSubmit}>
              Submit
            </button>
          </div>
          <div className="box generate-quiz">
            <h2>Generate Quiz</h2>
            <input type="text" placeholder="Enter quiz details..." />
            <button className="generate-button">Generate</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetStartedPage;
