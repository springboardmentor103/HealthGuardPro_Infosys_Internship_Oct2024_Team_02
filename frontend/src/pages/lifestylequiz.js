import React, { useState } from 'react';
import { data } from '../data/lifedata.js';
import '../styles/quiz.css';

function LifestyleQuizPage() {
  const categories = Object.keys(data);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const currentCategory = categories[currentCategoryIndex];
  const questions = data[currentCategory];
  const question = questions[index];

  const handleOptionClick = (option, score) => {
    setErrorMessage('');
    const existingAnswerIndex = userAnswers.findIndex((ans) => ans.questionId === question.id);

    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...userAnswers];
      const oldScore = updatedAnswers[existingAnswerIndex].score;
      updatedAnswers[existingAnswerIndex] = { questionId: question.id, answer: option, score };

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
      setErrorMessage('Please answer this question before proceeding.');
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
          console.log('Final User Answers:', userAnswers);
          console.log('Final Total Score:', totalScore);
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
      </div>
    </div>
  );
}

export default LifestyleQuizPage;
