const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const users = {};
async function SendMail(email) {

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        secure: true,
        port: 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(1000, 9999).toString();

    // Create JWT token with the OTP, which expires in 5 minutes
    const token = jwt.sign({ otp }, process.env.JWT_SECRET, { expiresIn: '5m' });
    // console.log(token);

    // Store the token associated with the email
    users[email] = { token };

    // Send OTP email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Verification Code',
        text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            //  console.log('Failed to send OTP')
            return true;
        }
        // console.log('OTP sent successfully');
        return false;
    });

}
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
                if (SendMail(email)) {
                    return res.status(202).json({ message: 'OTP Successfully send in you mail' });
                }
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

// OTP Verification route
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    const user = users[email];
    try {
        // Retrieve the stored token for the email
        const userToken = users[email]?.token;
        if (!userToken) {
            return res.status(400).json({ message: 'OTP expired or not sent' });
        }

        // Verify the JWT token and extract the OTP
        const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
        if (decoded.otp == otp) {
            return res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            return res.status(401).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error during OTP verification:', error);
    }
});

module.exports = router;