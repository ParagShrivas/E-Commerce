const express = require('express');
const router = express.Router();
const db = require('./db');
require('dotenv').config();

router.get('/userLike/:email', async (req, res) => {
     const email = req.params.email;

     try {
          const query1 = 'SELECT user_id FROM users WHERE email = $1';
          const result1 = await db.query(query1, [email]);

          if (result1.rows.length === 0) {
               return res.status(404).json({ message: 'User not found' });
          }

          const user_id = result1.rows[0].user_id;

          const query2 = `select * from wishlist where user_id = $1`;
          const result2 = await db.query(query2, [user_id]);

          res.status(200).json(result2.rows);

     } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Database error', error: err });
     }
});

// Add or remove a product from the wishlist
router.post('/:email/:product_id', async (req, res) => {
     const email = req.params.email;
     const product_id = req.params.product_id;
     const { liked } = req.body; // Expecting { liked: true } or { liked: false }

     try {
          // Query to get the user_id based on the email
          const query1 = 'SELECT user_id FROM users WHERE email = $1';
          const result1 = await db.query(query1, [email]);

          if (result1.rows.length === 0) {
               return res.status(404).json({ message: 'User not found' });
          }

          const user_id = result1.rows[0].user_id;

          if (liked) {
               // Insert the product into the wishlist
               const query2 = 'INSERT INTO wishlist (user_id, product_id) VALUES ($1, $2)';
               await db.query(query2, [user_id, product_id]);
               return res.status(200).json({ message: 'Product added to wishlist successfully!' });
          } else {
               // Remove the product from the wishlist
               const query3 = 'DELETE FROM wishlist WHERE user_id = $1 AND product_id = $2';
               const result = await db.query(query3, [user_id, product_id]);

               if (result.rowCount === 0) {
                    return res.status(404).json({ message: 'Product not found in wishlist' });
               }

               return res.status(200).json({ message: 'Product removed from wishlist successfully!' });
          }

     } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Database error', error: err });
     }
});

router.get('/:email', async (req, res) => {
     const email = req.params.email;

     try {
          const query1 = 'SELECT user_id FROM users WHERE email = $1';
          const result1 = await db.query(query1, [email]);

          if (result1.rows.length === 0) {
               return res.status(404).json({ message: 'User not found' });
          }

          const user_id = result1.rows[0].user_id;

          const query2 = `select wishlist.product_id,products.product_name,products.description,products.price,products.photoname,wishlist.added_date
                         from wishlist inner join products 
                         on wishlist.product_id = products.product_id 
                         where wishlist.user_id = $1`;
          const result2 = await db.query(query2, [user_id]);

          res.status(200).json(result2.rows);

     } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Database error', error: err });
     }
});

router.post('/delete/:email/:product_id', async (req, res) => {
     const email = req.params.email;
     const product_id = req.params.product_id;

     try {
          // Query to get the user_id based on the email
          const query1 = 'SELECT user_id FROM users WHERE email = $1';
          const result1 = await db.query(query1, [email]);

          if (result1.rows.length === 0) {
               return res.status(404).json({ message: 'User not found' });
          }

          const user_id = result1.rows[0].user_id;

          console.log('User ID:', user_id);
          console.log('Product ID:', product_id);
          // Delete the product from the wishlist
          const query2 = `DELETE FROM wishlist WHERE user_id = $1 AND product_id = $2`; // Corrected placeholders
          await db.query(query2, [user_id, product_id]);

          res.status(200).json({ message: 'Product deleted from wishlist successfully!' });

     } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Database error', error: err });
     }
});


module.exports = router;