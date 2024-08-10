const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv").config();

const Auth = require('./models/Auth');

const app = express();
const port = process.env.PORT

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/login', Auth);


// Start the server
app.listen(port, () => {
     console.log(`Server is running on port ${port}`);
});
