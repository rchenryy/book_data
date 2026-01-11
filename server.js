require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Routes
app.use('/', require('./routes/index'));
app.use('/books', require('./routes/books'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
