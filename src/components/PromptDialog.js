import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

const PromptDialog = ({ open, onClose, onGenerate }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const configuration = new Configuration({
    apiKey: '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'
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

        // Extract front and back using regex
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

  const dialogStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  };

  const contentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '600px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#333',
    textAlign: 'center',
  };

  const inputStyle = {
    width: '80%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '16px',
    textAlign: 'center',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  };

  const buttonStyle = {
    backgroundColor: '#0081c9',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  };

  const closeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ccc',
  };

  const errorStyle = {
    color: 'red',
    marginBottom: '10px',
  };

  return (
    <div style={dialogStyle}>
      <div style={contentStyle}>
        <h2 style={titleStyle}>Enter a Prompt for Flashcards</h2>
        <input
          type="text"
          placeholder="Enter your prompt here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={inputStyle}
        />
        {error && <p style={errorStyle}>{error}</p>}
        <div style={buttonContainerStyle}>
          <button 
            onClick={handleGenerate} 
            style={buttonStyle} 
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Cards'}
          </button>
          <button onClick={onClose} style={closeButtonStyle}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptDialog;
