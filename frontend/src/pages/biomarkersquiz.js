import React, { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { data } from '../data/biodata.js'; // Make sure you have your data structure here
import endpoints from '../config/apiConfig';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import '../styles/quiz.css';

function BiomarkerQuizPage() {
  const categories = Object.keys(data);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const currentCategory = categories[currentCategoryIndex];
  const questions = data[currentCategory];
  const question = questions[index];

  const { token } = useContext(AuthContext);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (showPopup) {
      document.body.classList.add('popup-active');
    } else {
      document.body.classList.remove('popup-active');
    }
  }, [showPopup]);

  const handleOptionClick = (option, score) => {
    setErrorMessage('');
    const existingAnswerIndex = userAnswers.findIndex((ans) => ans.questionId === question.id);
  
    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...userAnswers];
      const oldScore = updatedAnswers[existingAnswerIndex].score;
      updatedAnswers[existingAnswerIndex] = { questionId: question.id, answer: option, score };
  
      setTotalScore((prevScore) => {
        const newScore = prevScore - oldScore + score;
        return newScore;
      });
      setUserAnswers(updatedAnswers);
    } else {
      setUserAnswers((prevAnswers) => [
        ...prevAnswers,
        { questionId: question.id, answer: option, score },
      ]);
      setTotalScore((prevScore) => {
        const newScore = prevScore + score;
        return newScore;
      });
    }
  
    setSelectedOption(option);
  };
  
  const incrementIndex = async () => {
    if (!selectedOption) {
      setErrorMessage('Please answer this question before proceeding.');
      return;
    }

    const newIndex = index + 1;
    if (newIndex < questions.length) {
      setSelectedOption(null);
      setIndex(newIndex);
    } else if (currentCategoryIndex + 1 < categories.length) {
      setCurrentCategoryIndex((prevCategoryIndex) => prevCategoryIndex + 1);
      setIndex(0);
    } else {
      // Final calculation and API call
      const totalPossibleScore = categories.reduce(
        (acc, category) => acc + data[category].length * 10, // Each question is worth 10 marks
        0
      );

      const scoreObtained = userAnswers.reduce((acc, answer) => acc + answer.score, 0);
      const percentage = Math.floor((scoreObtained / totalPossibleScore) * 100);

      localStorage.setItem('Bio MarkersScore', percentage);

      const payload = {
        userId,
        quizCategory: 'bioMarkers',
        score: percentage,
      };

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        const response = await axios.post(endpoints.updateScores, payload, config);

        if (response.status === 200) {
          toast.success('Score submitted successfully!');
        } else {
          toast.error('Failed to submit score to the backend.');
        }
      } catch (error) {
        console.error('Error during API call:', error);
        toast.error('An error occurred while submitting the score.');
      }

      setShowPopup(true);
            localStorage.setItem("quizCompleted", "true");


      setTimeout(() => {
        navigate('/'); // Navigate to the dashboard page
      }, 2000);
    }
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
              className={`option-button ${selectedOption === option.text ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option.text, option.score)}
            >
              {option.text}
            </button>
          ))}
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="submit-button" onClick={incrementIndex}>
          {index + 1 === questions.length && currentCategoryIndex + 1 === categories.length
            ? 'SUBMIT'
            : 'NEXT'}
        </button>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{
              width: `${(totalScore / (categories.length * questions.length * 10)) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {showPopup && (
        <div className="congratulations-popup">
          <div className="popup-content">
            <h2>Congratulations!</h2>
            <p>You have completed the quiz!</p>
            <img src="https://cdn-icons-png.flaticon.com/128/7480/7480607.png" alt="Celebration" />
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default BiomarkerQuizPage;

