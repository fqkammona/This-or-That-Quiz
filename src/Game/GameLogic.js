// gameLogic.js

// Function to update major counts and score
export const handleAnswer = (currentQuestion, major, majorCounts, score) => {
    const newMajorCounts = {
      ...majorCounts,
      [major]: majorCounts[major] + 1,
    };
  
    const newScore = major === currentQuestion.correctAnswer ? score + 1 : score;
  
    return { newMajorCounts, newScore };
  };
  
  // Function to determine if the game should show the score or move to the next question
  export const getNextQuestionIndex = (currentQuestionIndex, totalQuestions) => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    const showScore = nextQuestionIndex >= totalQuestions;
    return { nextQuestionIndex, showScore };
  };
  
  // Reset game logic
  export const resetGame = () => {
    return {
      score: 0,
      currentQuestionIndex: 0,
      showScore: false,
      majorCounts: { BME: 0, ECE: 0 },
    };
  };
  