import React, { useState } from 'react';
import './FlashCardComponent.css';

const FlashCard = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flashcard-container" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="flashcard-front">
          {card.front}
        </div>
        <div className="flashcard-back">
          {card.back}
        </div>
      </div>
    </div>
  );
};

const FlashCardComponent = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  if (flashcards.length === 0) {
    return <div>No flashcards available.</div>;
  }

  return (
    <div className="flashcard-wrapper">
      <FlashCard key={currentIndex} card={flashcards[currentIndex]} />
      <div className="flashcard-controls">
        <button onClick={handlePrevious}>Previous</button>
        <span>{`${currentIndex + 1} / ${flashcards.length}`}</span>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default FlashCardComponent;
