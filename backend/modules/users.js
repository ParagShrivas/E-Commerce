const express = require('express');
const router = express.Router();
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

router.get('/', (req, res) => {
     const query = 'SELECT * FROM public.users';

     db.query(query, (err, results) => {
          if (err) {
               return res.status(500).json({ message: 'Database error', error: err });
          }
          return res.status(200).json(results.rows); // Directly send the results array
     });
})

router.get('/email/:email', (req, res) => {
     const email = req.params.email;

     const query = 'SELECT user_id,fname FROM users WHERE email = $1'; // Use parameterized query

     db.query(query, [email], (err, results) => {
          if (err) {
               return res.status(500).json({ message: 'Database error', error: err });
          }
          return res.status(200).json(results.rows[0]);
     });
});

router.get('/data/:email', (req, res) => {
     const UserEmail = req.params.email;
     const query = 'SELECT * FROM users WHERE email = $1';

     db.query(query, [UserEmail], (err, results) => {
          if (err) {
               return res.status(500).json({ message: 'Database error', error: err });
          }
          return res.status(200).json(results.rows);
     });
})
module.exports = router;