// App.js

import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:4000/bfhl', { data });
      setResponse(res.data);
    } catch (error) {
      console.error("Error making the POST request:", error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    try {
      const jsonData = JSON.parse(value);
      setData(jsonData.data || []);
    } catch (error) {
      // Handle the case where the input is not valid JSON yet
      console.error("Invalid JSON input");
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  return (
    <div>
      <h1>BFHL Challenge</h1>
      <textarea
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Enter JSON data'
      ></textarea>
      <button onClick={handleSubmit}>Submit</button>

      <div>
        <h2>Select Data to Display:</h2>
        <label>
          <input
            type="checkbox"
            value="numbers"
            onChange={handleOptionChange}
          />
          Numbers
        </label>
        <label>
          <input
            type="checkbox"
            value="alphabets"
            onChange={handleOptionChange}
          />
          Alphabets
        </label>
        <label>
          <input
            type="checkbox"
            value="highest_lowercase_alphabet"
            onChange={handleOptionChange}
          />
          Highest Lowercase Alphabet
        </label>
      </div>

      {response && (
        <div>
          <h2>Response:</h2>
          <pre>
            {selectedOptions.includes('numbers') && <p>Numbers: {response.numbers.join(', ')}</p>}
            {selectedOptions.includes('alphabets') && <p>Alphabets: {response.alphabets.join(', ')}</p>}
            {selectedOptions.includes('highest_lowercase_alphabet') && <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>}
          </pre>
        </div>
      )}
    </div>
  );
};

export default App;
