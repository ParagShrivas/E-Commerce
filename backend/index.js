const express = require('express');
const cors = require('cors');
require('dotenv').config();

const Auth = require('./modules/Auth');
const products = require('./modules/products');
const users = require('./modules/users');

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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});