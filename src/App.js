import React, { useState } from 'react';
import { Questions } from './Questions';
import './App.css';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [majorCounts, setMajorCounts] = useState({ BME: 0, ECE: 0 });

  const currentQuestion = Questions[currentQuestionIndex];

  const handleAnswerButtonClick = (major) => {
    setMajorCounts((prevCounts) => ({ ...prevCounts, [major]: prevCounts[major] + 1 }));
  
    const isMajor = major === currentQuestion.correctAnswer;
    if (isMajor) {
      setScore(score + 1);
    }
  
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < Questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
    }
  };

  const handleReset = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowScore(false);
    setMajorCounts({ BME: 0, ECE: 0 });
  };

  return (
    <div className='app'>
      {showScore ? (
        <div className='score-section'>
          <div className='major-count'>BME: {majorCounts.BME}</div>
          <div className='major-count'>ECE: {majorCounts.ECE}</div>
          <button onClick={handleReset}>Play again</button>
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestionIndex + 1}</span>/{Questions.length}
            </div>
            <div className='question-text'>{currentQuestion.Qtext}</div>
          </div>
          <div className='answer-section'>
            {currentQuestion.Aoptions.map((option) => (
              <button
                key={option.Atext}
                onClick={() => handleAnswerButtonClick(option.major)}
              >
                {option.Atext}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;