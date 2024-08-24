const express = require('express');
const router = express.Router();
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

router.get('/', (req, res) => {
     const query = 'SELECT * FROM users';

     db.query(query, (err, results) => {
          if (err) {
               return res.status(500).json({ message: 'Database error', error: err });
          }
          return res.status(200).json(results.rows); // Directly send the results array
     });
})

module.exports = router;