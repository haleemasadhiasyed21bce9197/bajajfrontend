import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      const parsedData = JSON.parse(jsonInput);
      const response = await axios.post('https://bfhl-api.herokuapp.com/bfhl', parsedData);
      setResponseData(response.data);
    } catch (err) {
      setError('Invalid JSON input or server error');
    }
  };
  const renderResponseData = () => {
    if (!responseData) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = responseData;
    return (
      <div>
        {selectedOptions.includes('Numbers') && (
          <div>
            <h3>Numbers:</h3>
            <p>{numbers.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Alphabets') && (
          <div>
            <h3>Alphabets:</h3>
            <p>{alphabets.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div>
            <h3>Highest lowercase alphabet:</h3>
            <p>{highest_lowercase_alphabet.join(', ')}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BFHL API Frontend</h1>
      <textarea 
        value={jsonInput} 
        onChange={handleInputChange} 
        placeholder="Enter JSON data here"
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p className="error">{error}</p>}

      {responseData && (
        <div>
          <h2>Select Data to Display:</h2>
          <div>
            <input 
              type="checkbox" 
              value="Alphabets" 
              onChange={handleOptionChange} 
            /> Alphabets
            <input 
              type="checkbox" 
              value="Numbers" 
              onChange={handleOptionChange} 
            /> Numbers
            <input 
              type="checkbox" 
              value="Highest lowercase alphabet" 
              onChange={handleOptionChange} 
            /> Highest lowercase alphabet
          </div>
          {renderResponseData()}
        </div>
      )}
    </div>
  );
}

export default App;
