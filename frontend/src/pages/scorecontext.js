import React, { createContext, useState, useEffect } from 'react';

// Create the ScoreContext
export const ScoreContext = createContext();

// ScoreProvider Component
export const ScoreProvider = ({ children }) => {
  // Initialize state
  const [scores, setScores] = useState({});

  // Function to update a specific category's score
  const updateScore = (category, percentage) => {
    if (!category || typeof percentage !== 'number' || percentage < 0 || percentage > 100) {
      console.error("Invalid category or percentage value.");
      return;
    }

    // Update state and persist to localStorage
    setScores((prevScores) => {
      const updatedScores = {
        ...prevScores,
        [category]: percentage,
      };
      localStorage.setItem('scores', JSON.stringify(updatedScores));
      return updatedScores;
    });
  };

  // Load scores from localStorage when the component mounts
  useEffect(() => {
    const storedScores = localStorage.getItem('scores');
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  return (
    <ScoreContext.Provider value={{ scores, updateScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

