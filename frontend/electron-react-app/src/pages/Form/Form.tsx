import React, { useState } from 'react';

const Form: React.FC = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { input1, input2 });
  };

  return (
    <div className="form-page">
      <h2>Mock Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Input 1:</label>
          <input 
            type="text" 
            value={input1} 
            onChange={(e) => setInput1(e.target.value)} 
          />
        </div>
        <div>
          <label>Input 2:</label>
          <input 
            type="text" 
            value={input2} 
            onChange={(e) => setInput2(e.target.value)} 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form; 