const express = require('express');
const router = express.Router();
const cors = require('cors');
const db = require('./db');
require('dotenv').config();
const multer = require('multer');
const path = require('path');

router.use(cors());
router.use(express.static('uploads'));

// Configure Multer for file uploads
const storage = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null, 'uploads/');
     },
     filename: function (req, file, cb) {
          cb(null, file.originalname); // Save photo with its original name
     }
});

const upload = multer({ storage: storage });


// Route to fetch all products
router.get('/', (req, res) => {
     const query = 'SELECT * FROM products';

     db.query(query, (err, results) => {
          if (err) {
               return res.status(500).json({ message: 'Database error', error: err });
          }
          return res.status(200).json(results.rows); // Directly send the results array
     });
});

// Route to add a product
router.post('/add_product', upload.single('photo'), (req, res) => {
     const { product_name, category, description, price, quantity } = req.body;

     if (!product_name || !category || !description || !price || !quantity) {
          return res.status(400).json({ message: 'Please fill in all details' });
     }

     const photoname = req.file.filename;

     const query = 'INSERT INTO products (product_name, description, price, quantity, category, photoname) VALUES ($1, $2, $3, $4, $5, $6)';

     db.query(query, [product_name, description, price, quantity, category, photoname], (err, result) => {
          if (err) {
               return res.status(500).json({ message: 'Database error', error: err });
          }

          res.status(200).json({ message: 'Product added successfully!', productId: result.insertId });
     });
});

module.exports = router;
