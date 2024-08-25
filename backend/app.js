const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// POST request handler
app.post('/bfhl', (req, res) => {
  const { data } = req.body;
  
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));
  const highestLowercaseAlphabet = alphabets
    .filter(char => char === char.toLowerCase())
    .sort()
    .pop() || "";

  const response = {
    is_success: true,
    user_id: "jayadeep_200408",
    email: "jayadeepchenchugari@gmail.com",
    roll_number: "21BCE9238",
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
  };

  res.status(200).json(response);
});

// GET request handler
app.get('/bfhl', (req, res) => {
  res.json({
    operation_code: 1
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
