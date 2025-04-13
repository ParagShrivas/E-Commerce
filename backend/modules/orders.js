const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/', (req, res) => { // Use POST if you are passing user_id in the body
     const { user_id } = req.body;

     if (!user_id) {
          return res.status(400).json({ message: 'User ID is required' });
     }

     const query = `
        SELECT 
          orders.product_id,
          orders.quantity,
          orders.total_amount,
          orders.status,
          products.product_name,
          products.description,
          products.photoname
          FROM orders 
          JOIN products ON orders.product_id = products.product_id
          WHERE orders.user_id = $1
    `;

     db.query(query, [user_id], (err, results) => {
          if (err) {
               console.error('Database error:', err);
               return res.status(500).json({ message: 'Database error', error: err });
          }
          res.status(200).json({
               success: true,
               message: 'Cart items fetched successfully',
               data: results.rows,
          });
     });
});

module.exports = router;
