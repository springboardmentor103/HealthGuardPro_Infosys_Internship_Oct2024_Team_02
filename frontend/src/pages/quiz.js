import React from 'react';
import {data} from '../data/data.js';
import '../styles/quiz.css';
import { useState } from 'react';





function QuizPage() {

    let [index, setIndex] = useState(0); // Current question index
    let [question, setQuestion] = useState(data[index]); // Current question
    let [userAnswers, setUserAnswers] = useState([]); // Array to store user answers
    let [selectedOption, setSelectedOption] = useState(null); // Track selected option
    let [totalScore, setTotalScore] = useState(0); // Track total score


    const handleOptionClick = (option, score) => {
        // Find the index of the current question's answer in userAnswers array
        const existingAnswerIndex = userAnswers.findIndex((ans) => ans.questionId === question.id);
    
        if (existingAnswerIndex !== -1) {
          // If answer already exists, update it
          const updatedAnswers = [...userAnswers];
          const oldScore = updatedAnswers[existingAnswerIndex].score;
          updatedAnswers[existingAnswerIndex] = { questionId: question.id, answer: option, score };
    
          // Update total score: subtract old score and add new score
          setTotalScore((prevScore) => prevScore - oldScore + score);
          setUserAnswers(updatedAnswers);
        } else {
          // If it's a new answer, add to the userAnswers array and update score
          setUserAnswers((prevAnswers) => [
            ...prevAnswers,
            { questionId: question.id, answer: option, score },
          ]);
          setTotalScore((prevScore) => prevScore + score);
        }
    
        // Set the selected option (allow only one option selected at a time)
        setSelectedOption(option);
      };
    
      const incrementIndex = () => {
        setIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          if (newIndex < data.length) {
            setQuestion(data[newIndex]); // Update question
            setSelectedOption(null); // Reset selected option for the next question
            return newIndex;
          } else {
            console.log('Final User Answers:', userAnswers);
            console.log('Final Total Score:', totalScore);
            return prevIndex;
          }
        });
      };


 return (
    <div className="question-card">
    <div className="title-space">
      <h1 className="title">HealthGuard Pro</h1>
    </div><div className='box-sizing'></div>
    <div className="box-crt">
      <h2 className="subtitle">Physical Fitness</h2>
      <div className='box-sizing'></div>
      <p className="question-text">
        {index + 1}. {question.question}
      </p><div className='box-sizing'></div>
      <div className="options">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            className={`option-button ${selectedOption === option.text ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option.text, option.score)} // Handle option click
          >
            {option.text}
          </button>
        ))}
      </div>
      {/* Adjust the button text */}
      <button className="submit-button" onClick={incrementIndex}>
        {index + 1 === data.length ? 'SUBMIT' : 'NEXT'}
      </button>
      
    
    </div>
  </div>
  );
}

export default QuizPage;
