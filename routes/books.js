const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/books.html'));
});

router.get('/data', (req, res) => {
  const sql = `
    SELECT 
      title,
      authors,
      rating,
      date_read,
      review
    FROM all_data
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
      return;
    }

    res.json(results);
  });
});

module.exports = router;
