const express = require('express');
const cors = require('cors');
require('dotenv').config();

const Auth = require('./modules/Auth');
const products = require('./modules/products');
const users = require('./modules/users');
const cart = require('./modules/cart')
const wishlist = require('./modules/wishlist')
const place_order = require('./modules/place_order')

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/login', Auth);
app.use('/products', products);
app.use('/users', users);
app.use('/cart', cart);
app.use('/wishlist', wishlist);
app.use('/place_order', place_order);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});