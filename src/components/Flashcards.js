import React, { useState } from 'react';

const FlashCard = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        width: '100%',
        height: '200px',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        perspective: '1000px',
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        transition: 'transform 0.6s',
        transformStyle: 'preserve-3d',
        transform: isFlipped ? 'rotateY(180deg)' : '',
      }}>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          border: '1px solid #ddd',
          borderRadius: '8px',
        }}>
          {card.front}
        </div>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          border: '1px solid #ddd',
          borderRadius: '8px',
        }}>
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
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <FlashCard
        key={currentIndex}
        card={flashcards[currentIndex]}
      />
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handlePrevious}>Previous</button>
        <span>{`${currentIndex + 1} / ${flashcards.length}`}</span>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default FlashCardComponent;