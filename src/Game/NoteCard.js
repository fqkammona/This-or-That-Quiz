// NoteCard.js
import React from 'react';
import './NoteCard.css'; // Import the CSS file for styling

function NoteCard({ Qtext, onAnswerClick }) {
  return (
    <div
      className="note-card"
      onClick={onAnswerClick} // Use the passed click handler function
      role="button"
      tabIndex={0}
    >
      <h3>{Qtext}</h3>
    </div>
  );
}

export default NoteCard;
