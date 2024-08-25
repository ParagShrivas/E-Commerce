const express = require('express');
const router = express.Router();
const db = require('./db');
router.post('/show', async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({
            success: false,
            message: "User not found"
        });
    }

    try {
        
        const result = await db.query(
            'SELECT * FROM cart WHERE user_id = $1',
            [user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: true,
                message: 'No items found in cart',
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Cart items fetched successfully',
            data: result.rows
        });

    } catch (err) {
        
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch the response"
        });
    }
});


router.post('/add', async(req, res)=>{

    const {user_id, product_id, quantity=1} = req.body;
    
    // if info obtained 
    if(!user_id || !product_id){
        return res.status(400).json({
            success:false,
            message: "Failed to obtain info"
        })
    }
   
    try{
        // if already exists
        const existing = await db.query(
            'SELECT product_id FROM cart WHERE user_id = $1 AND product_id = $2',
            [user_id, product_id]
        );
        
        
        if (existing.rows.length > 0) {
            return res.status(409).json({
                success: false,  
                message: 'Product already exists in cart'
            });
        }
        
        // if product is invalid 
        const product = await db.query('SELECT product_id FROM Products WHERE product_id = $1', [product_id])
        if(product.rows.length ==0 ){
            return res.status(404).json({
                success:false, 
                message: "Enter valid product"
            })
        }
        
        // making entry to db
        try{
            const AddToCart= await db.query( 'INSERT INTO Cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING product_id, quantity',[user_id, product_id, quantity])
            return res.status(201).json({
                success: true,
                message: 'Product added to cart',
                data: AddToCart.rows[0]
            });


        } catch (err){
            console.error(err);
            return res.status(500).json({
                success:false,
                message:"failed to record entry to cart"
            })
        }

    } catch (err){
        return res.status(500).json({
            success:false,
            message:"Problem occured while adding product to cart"
        })

    }

})

router.post('/remove', async(req, res)=>{
    const {user_id, product_id, quantity=1} = req.body;
    // if info obtained 
    if(!user_id || !product_id){
        return res.status(400).json({
            success:false,
            message: "Failed to obtain info"
        })
    }
   
    try{
        // removing entry
        const result = await db.query(
            'DELETE FROM Cart WHERE user_id = $1 AND product_id = $2 RETURNING *',
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
        success:true,
        message:"Successfully removed from cart"
      })

    } catch (err){
        return res.status(500).json({
            success:false,
            message:"Problem occured while deleting product from cart"
        })

    }
})
module.exports =router;