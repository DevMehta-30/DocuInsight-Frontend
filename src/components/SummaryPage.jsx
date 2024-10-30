import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./SummaryPage.css"; // Import the CSS file for styling
import axios from "axios";

function SummaryPage() {
  const location = useLocation();
  const { summary, combinedText } = location.state || {
    summary: "No summary available.",
    combinedText: "No combined text available.",
  };
  const [quiz, setQuiz] = useState([]); // State to store generated quiz

  const handleGenerateQuiz = async () => {
    try {
      // Send the summary text to the backend to generate a quiz
      const response = await axios.post(
        "http://127.0.0.1:5000/generate_quiz",
        { text: combinedText }, // Use summary text as input for quiz generation
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Store the quiz questions in state
      const generatedQuiz = response.data.quiz;
      if (generatedQuiz && generatedQuiz.length > 0) {
        setQuiz(generatedQuiz);
        alert("Quiz generated successfully!");
      } else {
        alert("No questions could be generated from the summary.");
      }
    } catch (error) {
      console.error("Error generating the quiz:", error);
      alert("Error generating the quiz. Please try again.");
    }
  };

  return (
    <div className="summary-page">
      <h1 className="summary-title">Summary</h1>
      <div className="summary-box">
        <p>{summary}</p>
      </div>
      <button className="generate-quiz-button" onClick={handleGenerateQuiz}>
        Generate Quiz
      </button>

      {/* Display the generated quiz if available */}
      {quiz.length > 0 && (
        <div className="quiz-section">
          <h2>Generated Quiz</h2>
          <ul>
            {quiz.map((item, index) => (
              <li key={index}>
                <p>
                  Q{index + 1}: {item.question}
                </p>
                <p>
                  <strong>Answer:</strong> {item.answer}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SummaryPage;
