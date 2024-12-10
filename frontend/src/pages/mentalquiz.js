import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { data } from "../data/mentaldata.js"; // Assuming this is the mental wellness quiz data
import "../styles/quiz.css";
import Confetti from "react-confetti";

function MentalwellQuizPage() {
  const categories = Object.keys(data);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const currentCategory = categories[currentCategoryIndex];
  const questions = data[currentCategory];
  const question = questions[index];

  useEffect(() => {
    if (showPopup) {
      document.body.classList.add("popup-active");
    } else {
      document.body.classList.remove("popup-active");
    }
  }, [showPopup]);

  const handleOptionClick = (option, score) => {
    setErrorMessage("");
    const existingAnswerIndex = userAnswers.findIndex(
      (ans) => ans.questionId === question.id
    );

    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...userAnswers];
      const oldScore = updatedAnswers[existingAnswerIndex].score;
      updatedAnswers[existingAnswerIndex] = {
        questionId: question.id,
        answer: option,
        score,
      };

      setTotalScore((prevScore) => prevScore - oldScore + score);
      setUserAnswers(updatedAnswers);
    } else {
      setUserAnswers((prevAnswers) => [
        ...prevAnswers,
        { questionId: question.id, answer: option, score },
      ]);
      setTotalScore((prevScore) => prevScore + score);
    }

    setSelectedOption(option);
  };

  const incrementIndex = () => {
    if (!selectedOption) {
      setErrorMessage("Please answer this question before proceeding.");
      return;
    }

    setIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex < questions.length) {
        setSelectedOption(null);
        return newIndex;
      } else {
        if (currentCategoryIndex + 1 < categories.length) {
          setCurrentCategoryIndex((prevCategoryIndex) => prevCategoryIndex + 1);
          setIndex(0);
        } else {
          // Calculate the Total Possible Score and Score Obtained
          const totalPossibleScore = categories.reduce(
            (acc, category) => acc + data[category].length * 10, // Each question is worth 10 marks
            0
          );

          const scoreObtained = userAnswers.reduce(
            (acc, answer) => acc + answer.score, // Sum of scores for each correct answer
            0
          );

          // Calculate percentage using the formula: (Score Obtained / Total Possible Score) * 100
          const percentage = Math.floor(
            (scoreObtained / totalPossibleScore) * 100
          ); // Rounded to the nearest integer

          // Save the final score in localStorage
          localStorage.setItem("mentalScore", percentage);

          // Add this line to set the confetti flag
          localStorage.setItem("showConfetti", "true");

          setShowPopup(true);
          setShowConfetti(true);

          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            navigate("/"); // Navigate to the dashboard page
          }, 2000);
        }
        return prevIndex;
      }
    });
  };

  return (
    <div className="question-card">
      <div className="title-space">
        <h1 className="title">HealthGuard Pro</h1>
      </div>
      <div className="box-crt">
        <h2 className="subtitle">{currentCategory}</h2>
        <p className="question-text">
          {index + 1}. {question.question}
        </p>
        <div className="options">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              className={`option-button ${
                selectedOption === option.text ? "selected" : ""
              }`}
              onClick={() => handleOptionClick(option.text, option.score)}
            >
              {option.text}
            </button>
          ))}
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="submit-button" onClick={incrementIndex}>
          {index + 1 === questions.length &&
          currentCategoryIndex + 1 === categories.length
            ? "SUBMIT"
            : "NEXT"}
        </button>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{
              width: `${
                (totalScore / (categories.length * questions.length * 10)) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>

      {showPopup && (
        <div className="congratulations-popup">
          <div className="popup-content">
            <h2>Congratulations!</h2>
            <p>You have completed the quiz!</p>

            <img
              src="https://cdn-icons-png.flaticon.com/128/7480/7480607.png"
              alt="Celebration"
            />
          </div>
        </div>
      )}

``      <ToastContainer />
    </div>
  );
}

export default MentalwellQuizPage;
