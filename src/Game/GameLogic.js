// Updated handleAnswer to accommodate multiple majors per question
export const handleAnswer = (currentQuestion, majorCounts) => {
  const newMajorCounts = { ...majorCounts };
  currentQuestion.Major.forEach(major => {
    if (newMajorCounts.hasOwnProperty(major)) {
      newMajorCounts[major] += 1;
    }
  });

  // Assuming each question answered increases the score
  const newScore = 1; // Adjust based on your scoring logic

  return { newMajorCounts, newScore };
};

export const selectRandomQuestions = (usedQuestionsIndices, allQuestions) => {
  let availableQuestions = allQuestions.filter((_, index) => !usedQuestionsIndices.includes(index));
  const selectedQuestions = [];
  const updatedUsedQuestionsIndices = [...usedQuestionsIndices];

  for (let i = 0; i < 2; i++) {
    if (availableQuestions.length === 0) {
      // Optional: Handle the scenario where all questions have been used
      break; // Or reset availableQuestions and updatedUsedQuestionsIndices if you want to start over
    }
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions.splice(randomIndex, 1)[0];
    const originalIndex = allQuestions.findIndex(question => question === selectedQuestion);
    updatedUsedQuestionsIndices.push(originalIndex);
    selectedQuestions.push(selectedQuestion);
  }

  return {
    selectedQuestions,
    updatedUsedQuestionsIndices,
  };
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
      majorCounts: { BME: 0, ECE: 0, CHEM: 0, ME: 0, CEE: 0, CSE: 0 },
    };
  };
  