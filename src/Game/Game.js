import React, { useState } from 'react';
import Scoreboard from './Scoreboard';
import { Questions } from './Questions';
import { handleAnswer, getNextQuestionIndex, resetGame } from './GameLogic';
import './Game.css';

function Game() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [majorCounts, setMajorCounts] = useState({ BME: 0, ECE: 0 });

  const currentQuestion = Questions[currentQuestionIndex];

  const handleAnswerButtonClick = (major) => {
    const { newMajorCounts, newScore } = handleAnswer(currentQuestion, major, majorCounts, score);
    setMajorCounts(newMajorCounts);
    setScore(newScore);

    const { nextQuestionIndex, showScore } = getNextQuestionIndex(currentQuestionIndex, Questions.length);
    setCurrentQuestionIndex(nextQuestionIndex);
    setShowScore(showScore);
  };

  const handleReset = () => {
    const resetValues = resetGame();
    setScore(resetValues.score);
    setCurrentQuestionIndex(resetValues.currentQuestionIndex);
    setShowScore(resetValues.showScore);
    setMajorCounts(resetValues.majorCounts);
  };

  return (
    <div className='game'>
      {showScore ? (
        <Scoreboard
          majorCounts={majorCounts}
          onReset={handleReset}
        />
      ) : (
        <>
          <div className='question-section'>
            <div className='question-text' >{currentQuestion.Qtext}</div>
            <div className='question-count'>
              <span>Question {currentQuestionIndex + 1}</span>/{Questions.length}
            </div>
          </div>
          <div className='answer-section'>
            {currentQuestion.Aoptions.map((option, index) => (
              <button
                key={index}
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

export default Game;
