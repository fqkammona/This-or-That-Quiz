import React from 'react';
import './Scoreboard.css';

function Scoreboard({ majorCounts, onReset }) {
  // Calculate total answers for percentage calculation
  const totalAnswers = Object.values(majorCounts).reduce((acc, count) => acc + count, 0);
  
  // Create an array of majors with their counts and percentages
  const majorPercentages = Object.entries(majorCounts).map(([major, count]) => ({
    major,
    count,
    percentage: totalAnswers > 0 ? (count / totalAnswers * 100).toFixed(2) : 0,
  }));

  // Sort the majors by percentage in descending order
  majorPercentages.sort((a, b) => b.percentage - a.percentage);

  return (
    <div className='score-section'>
      {majorPercentages.map(({ major, percentage }) => (
        <div key={major} className='major-count'>
          {major}: {percentage}%
        </div>
      ))}
      <button onClick={onReset}>Play again</button>
    </div>
  );
}

export default Scoreboard;
