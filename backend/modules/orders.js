const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/:user_id', (res, req) => {
     const user_id = req.params.user_id;

     const query = 'SELECT order_id,product_id,total_amount FROM users WHERE user_id = $1'; 

     db.query(query, [user_id], (err, results) => {
          if (err) {
               return res.status(500).json({ message: 'Database error', error: err });
          }
          return res.status(200).json(results.rows);
     });
})

module.exports = router;