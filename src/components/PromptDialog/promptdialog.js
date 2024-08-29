import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './promptdialog.css';

const PromptDialog = ({ open, onClose, onGenerate }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
  });
  const openai = new OpenAIApi(configuration);

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const prompts = [];
      for (let i = 0; i < 10; i++) {
        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [
              { role: 'system', content: 'Generate an Anki flashcard with front and back text based on this input:' },
              { role: 'user', content: input }
            ],
            max_tokens: 100,
        });

        const content = response.data.choices[0].message.content;

        const frontMatch = content.match(/Front:\s*(.*)\s*Back:/);
        const backMatch = content.match(/Back:\s*(.*)/);

        const front = frontMatch ? frontMatch[1].trim() : '';
        const back = backMatch ? backMatch[1].trim() : '';

        if (front && back) {
          prompts.push({
            id: i + 1,
            front,
            back,
          });
        }
      }
      onGenerate(prompts);
      onClose();
    } catch (error) {
      console.error('Error generating cards:', error.response ? error.response.data : error.message);
      setError('Failed to generate cards. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="dialog">
      <div className="dialog-content">
        <h2 className="dialog-title">Enter a Prompt for Flashcards</h2>
        <input
          type="text"
          placeholder="Enter your prompt here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="dialog-input"
        />
        {error && <p className="dialog-error">{error}</p>}
        <div className="dialog-buttons">
          <button 
            onClick={handleGenerate} 
            className="dialog-button generate-button" 
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Cards'}
          </button>
          <button onClick={onClose} className="dialog-button close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptDialog;
