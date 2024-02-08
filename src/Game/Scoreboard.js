// Scoreboard.js
import React from 'react';

function Scoreboard({ majorCounts, onReset }) {
  return (
    <div className='score-section'>
      <div className='major-count'>BME: {majorCounts.BME}</div>
      <div className='major-count'>ECE: {majorCounts.ECE}</div>
      <button onClick={onReset}>Play again</button>
    </div>
  );
}

export default Scoreboard;
