const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/show', async (req, res) => {

    const { user_id } = req.body;

    // Check if user_id is present
    if (!user_id) {
        return res.status(400).json({
            success: false,
            message: "User not found"
        });
    }

    try {
        // Fetch cart items from the database
        const result = await db.query(
            `SELECT 
                cart.product_id,
                cart.quantity,
                cart.added_date,
                products.product_name,
                products.description,
                products.price,
                products.photoname
            FROM 
                cart
            JOIN 
                products ON cart.product_id = products.product_id
            WHERE 
                cart.user_id = $1`,
            [user_id]
        );

        // Check if there are no items in the cart
        if (result.rows.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No items found in cart',
                data: []
            });
        }

        // Return the cart items
        return res.status(200).json({
            success: true,
            message: 'Cart items fetched successfully',
            data: result.rows
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch the response"
        });
    }
});




router.post('/addToCart', async (req, res) => {
    const { user_id, product_id, quantity = 1 } = req.body;

    // Validate if all required fields are present
    if (!user_id || !product_id) {
        return res.status(400).json({
            success: false,
            message: "User ID, Product ID, and quantity are required"
        });
    }

    try {
        // Check if product is already in the user's cart
        const existing = await db.query(
            'SELECT product_id FROM cart WHERE user_id = $1 AND product_id = $2',
            [user_id, product_id]
        );

        if (existing.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'Product already exists in the cart'
            });
        }

        // Verify if the product exists in the product table
        const product = await db.query('SELECT product_id FROM Products WHERE product_id = $1', [product_id]);
        if (product.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        // Add product to the cart
        const addToCart = await db.query(
            'INSERT INTO Cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
            [user_id, product_id, quantity]
        );

        // Return success response
        return res.status(201).json({
            success: true,
            message: 'Product added to cart',
            data: addToCart.rows[0]
        });
    } catch (err) {
        console.error('Error occurred while adding to cart:', err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


router.delete('/remove', async (req, res) => {
    const { user_id, product_id } = req.body;
    // if info obtained 
    if (!user_id || !product_id) {
        return res.status(400).json({
            success: false,
            message: "Enter user_id and product_id"
        })
    }

    try {
        // removing entry
        const result = await db.query(
            'DELETE FROM Cart WHERE user_id = $1 AND product_id = $2',
            [user_id, product_id]
        );

        // if no record found
        if (result.rowCount === 0) {
            return res.status(400).json({
                success: false,
                message: 'Item not found in cart'
            });
        }

        return res.status(200).json({
            success: true,
            message: "Successfully removed from cart"
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Problem occured while deleting product from cart"
        })

    }
})



router.post('/change_quantity', async (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    // Validate required parameters and quantity
    if (!user_id || !product_id || quantity == null) {
        return res.status(400).json({
            success: false,
            message: "user_id, product_id, and quantity are required"
        });
    }

    if (quantity <= 0) {
        return res.status(400).json({
            success: false,
            message: "Quantity must be a positive number"
        });
    }

    try {
        // Update quantity in the Cart table
        const result = await db.query(
            'UPDATE cart SET quantity = $3 WHERE user_id = $1 AND product_id = $2 RETURNING *',
            [user_id, product_id, quantity]
        );

        // Check if the item was found and updated
        if (result.rowCount > 0) {
            return res.status(200).json({
                success: true,
                message: 'Item quantity updated successfully',
                data: result.rows[0]
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart'
            });
        }

    } catch (err) {
        console.error('Error updating item quantity:', err);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating item quantity'
        });
    }
});


module.exports = router;