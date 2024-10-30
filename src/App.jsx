// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import GetStartedPage from './components/GetStartedPage.jsx';
import SummaryOptionsPage from './components/SummaryOptionsPage.jsx';
import VideoLinkSummaryOptionsPage from './components/VideoLinkSummaryOptionsPage.jsx';
import SummaryPage from './components/SummaryPage.jsx'; // Import the SummaryPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/summary-options" element={<SummaryOptionsPage />} />
        <Route path="/video-link-summary" element={<VideoLinkSummaryOptionsPage />} />
        <Route path="/summary" element={<SummaryPage />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
