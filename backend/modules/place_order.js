const express = require('express');
const router = express.Router();
const db = require('./db');
const sendOrderConfirmationEmail = require('./sendMail'); // Ensure this is correctly implemented

router.post('/', async (req, res) => {
    const { userId, products, billingAddress, paymentMethod, recipientEmail } = req.body;
    console.log(recipientEmail);

    // Validate required fields
    if (!userId || !products || products.length === 0 || !billingAddress || !paymentMethod) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Extract product IDs from the products array
    const productIds = products.map(product => product.productId);

    try {
        // Query to get product names and prices
        const productQuery = `
            SELECT product_id, product_name, price FROM products WHERE product_id = ANY($1::int[])
        `;

        const productResult = await db.query(productQuery, [productIds]);

        // Check if all products were found
        if (productResult.rows.length === 0 || productResult.rows.length < products.length) {
            return res.status(404).json({ message: 'Some or all products not found for the given IDs' });
        }

        // Create a map of product details for easy access
        const productDetailsMap = {};
        productResult.rows.forEach(product => {
            productDetailsMap[product.product_id] = {
                name: product.product_name,
                price: product.price
            };
        });

        // Prepare values for order insertion
        const placeholders = products
            .map((_, i) => `($${i * 6 + 1}, $${i * 6 + 2}, $${i * 6 + 3}, $${i * 6 + 4}, $${i * 6 + 5}, $${i * 6 + 6})`)
            .join(', ');

        // Prepare the SQL query for inserting orders
        const query = `
            INSERT INTO orders (user_id, product_id, quantity, total_amount, billing_address, payment_method)
            VALUES ${placeholders}
            RETURNING order_id
        `;

        // Flatten the values to match the placeholders
        const values = products.flatMap(({ productId, quantity }) => {
            const product = productDetailsMap[productId];
            if (!product) {
                throw new Error(`Product with ID ${productId} not found in the database.`);
            }
            return [
                userId,
                productId,
                quantity,
                product.price * quantity, // Calculate total amount
                JSON.stringify(billingAddress),
                paymentMethod,
            ];
        });

        // Execute the query to insert the order
        const result = await db.query(query, values);
        const orderIds = result.rows.map(row => row.order_id);

        // Clear the user's cart
        await db.query(`DELETE FROM cart WHERE user_id = $1`, [userId]);

        // Send order confirmation email
        if (recipientEmail) {
            const productDetails = products.map(product => ({
                name: productDetailsMap[product.productId].name,
                quantity: product.quantity,
                totalAmount: productDetailsMap[product.productId].price * product.quantity // Calculate total amount
            }));
            await sendOrderConfirmationEmail(recipientEmail, orderIds.join(', '), productDetails);
        }

        // Respond to the client
        res.status(201).json({
            message: 'Order placed successfully',
            orderIds
        });
    } catch (err) {
        console.error('Error placing order:', err);
        res.status(500).json({ message: 'Failed to place order', error: err.message });
    }
});

module.exports = router;
