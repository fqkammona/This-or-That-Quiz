import React, { useState, useEffect } from 'react';
import Scoreboard from './Scoreboard';
import NoteCard from './NoteCard';
import { Questions } from './Questions';
import { handleAnswer, resetGame, selectRandomQuestions } from './GameLogic';
import './Game.css';
/* IMPLEMENT SCORING per major
so cse: 3 questions me:5 questions
they pick 3 questions cse and 2 ME questions then the score would be
100% cse and 40% ME */
function Game() {
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [usedQuestionsIndices, setUsedQuestionsIndices] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [majorCounts, setMajorCounts] = useState({ BME: 0, ECE: 0, CHEM: 0, ME: 0, CEE: 0, CSE: 0 });

  useEffect(() => {
    // Initial selection of random questions
    const { selectedQuestions, updatedUsedQuestionsIndices } = selectRandomQuestions([], Questions);
    setSelectedQuestions(selectedQuestions);
    setUsedQuestionsIndices(updatedUsedQuestionsIndices);
  }, []);

  const handleReset = () => {
    const resetValues = resetGame();
    setScore(resetValues.score);
    setShowScore(false); // Ensure this is reset to false
    setMajorCounts(resetValues.majorCounts);
    setUsedQuestionsIndices([]); // Clear the used questions on reset

    // Re-select questions upon reset
    const { selectedQuestions, updatedUsedQuestionsIndices } = selectRandomQuestions([], Questions);
    setSelectedQuestions(selectedQuestions);
    setUsedQuestionsIndices(updatedUsedQuestionsIndices);
  };

  const handleQuestionClick = (questionIndex) => {
    const question = selectedQuestions[questionIndex];
    const originalIndex = Questions.findIndex(q => q.Qtext === question.Qtext);
    const { newMajorCounts, newScore } = handleAnswer(Questions[originalIndex], majorCounts);
    setMajorCounts(newMajorCounts);
    setScore(score + newScore);
    
    // Refresh the questions after one is selected
    if (usedQuestionsIndices.length + 1 < Questions.length) { // Check if there are still questions left
      const { selectedQuestions, updatedUsedQuestionsIndices } = selectRandomQuestions(usedQuestionsIndices, Questions);
      setSelectedQuestions(selectedQuestions);
      setUsedQuestionsIndices(updatedUsedQuestionsIndices);
    } else {
      setShowScore(true); // Show the scoreboard if all questions have been used
    }
  };

  return (
    <div className='game'>
      {showScore ? (
        <Scoreboard majorCounts={majorCounts} onReset={handleReset} />
      ) : (
        <>
          <div className='question-section'>
            <div className='question-text'>THIS OR THAT</div>
            {selectedQuestions.map((question, index) => (
              <NoteCard
                key={index}
                Qtext={question.Qtext}
                onAnswerClick={() => handleQuestionClick(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Game;
