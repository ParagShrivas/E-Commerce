const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcrypt');

// Login route
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const data = await db.query('SELECT password FROM users WHERE email = $1', [email]);

        if (data.rows.length > 0) {
            const storedPassword = data.rows[0].password;

            // Compare the provided password with the stored password
            const passwordMatch = await bcrypt.compare(password, storedPassword);
            if (passwordMatch) {
                console.log('Login Successful');
                return res.status(202).json({
                    message: 'Login successfully',
                });
            } else {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Error during login', error });
    }
});

// Register a new user
router.post('/register/user', async (req, res) => {
    const { fname, lname, email, password, password2 } = req.body;

    let errors = [];

    if (!fname || !lname || !email || !password || !password2) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    if (password !== password2) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if the email is already registered
        const emailCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (emailCheck.rows.length > 0) {
            return res.status(401).json({ message: 'Email already registered' });
        } else {
            const newUser = await db.query(
                'INSERT INTO users (fname, lname, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id, email',
                [fname, lname, email, hashedPassword]
            );
            console.log(newUser.rows);
            return res.status(201).json({
                message: 'You are now registered. Please log in',
            });
        }
    } catch (error) {
        console.log('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }

});

module.exports = router;
