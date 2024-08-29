import React, { useState } from 'react';
import FlashCardComponent from './components/Flashcards';
import PromptDialog from './components/PromptDialog';

const App = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGenerate = (newFlashcards) => {
    setFlashcards(newFlashcards);
    setIsDialogOpen(false);
  };

  return (
    <div style={{ 
      textAlign: 'center', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '20px'
    }}>
      <h1>AI Powered Anki Cards</h1>
      
      <div style={{ marginBottom: '20px', width: '100%', maxWidth: '600px' }}>
        <FlashCardComponent flashcards={flashcards} />
      </div>
      
      <button 
        onClick={() => setIsDialogOpen(true)}
        style={{
          backgroundColor: '#0081c9',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Open Prompt Dialog
      </button>
      
      <PromptDialog 
        open={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        onGenerate={handleGenerate}
      />
    </div>
  );
};

export default App;