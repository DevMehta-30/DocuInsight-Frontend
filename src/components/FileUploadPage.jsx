// FileUploadPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function FileUploadPage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Redirect to Summary Options Page
    navigate('/summary-options');
  };

  return (
    <div>
      <h1>Upload a File</h1>
      <input type="file" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default FileUploadPage;
