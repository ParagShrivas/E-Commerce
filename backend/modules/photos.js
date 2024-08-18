const express = require('express');
const router = express.Router();
const cors = require('cors');
const db = require('./db');
require('dotenv').config();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

router.use(cors());

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle image upload
router.post('/', upload.single('image'), (req, res) => {
    const imageName = req.file.originalname;
    const imagePath = req.file.buffer;
    
    const query = "insert into photos (photo_name,photo_data) values ($1,$2);";
    db.query(query, [imageName, imagePath], (err, result) => {
        if (err) throw err;
        res.send('Image uploaded successfully');
    });

});

// Route to retrieve image by name
router.get('/image/:name', (req, res) => {
    const imageName = req.params.name;

    const query = "SELECT photo_name, photo_data FROM photos WHERE photo_name = $1;";
    db.query(query, [imageName], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Error retrieving image from database.');
        }

        if (result.rows.length > 0) {
            const image = result.rows[0];
            res.setHeader('Content-Type', "image/jpg"); // Set the content type based on the stored MIME type
            res.send(image.photo_data); // Send the binary data directly
        } else {
            res.status(404).send('Image not found');
        }
    });
});

module.exports = router;