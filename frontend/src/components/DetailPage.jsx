import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css_file/ProductDetails.css';
import Navbar from './Navbar';
import Footer from './Footer';

export default function DetailPage() {
     const { id } = useParams();  // Get the product ID from the route
     const [quantity, setQuantity] = useState(1);
     const [product, setProduct] = useState(null);  // Store product data

     useEffect(() => {
          // Fetch product details by ID
          const fetchProduct = async () => {
               try {
                    const response = await fetch(`http://localhost:1500/products/detail/${id}`);
                    const data = await response.json();
                    setProduct(data);
               } catch (error) {
                    console.error('Error fetching product:', error);
               }
          };

          fetchProduct();
     }, [id]);

     if (!product) {
          return <p>Loading...</p>;  // Display a loading state
     }

     if (quantity < 1) {
          setQuantity(1);
     }

     return (
          <>
               <Navbar />
               <div className='product_page'>
                    <img src={`http://localhost:1500/products/${product.photoname}`} alt={product.name} />
                    <div className="product_details">
                         <p>{product.product_name}</p>
                         <div className="stars">
                              {/* Add your rating display logic here */}
                              <i className='bx bxs-star' ></i>
                              <i className='bx bxs-star' ></i>
                              <i className='bx bxs-star' ></i>
                              <i className='bx bxs-star' ></i>
                              <i className='bx bx-star' ></i>
                         </div>
                         <div className="price">
                              <h3>₹ {product.price}</h3>
                         </div>
                         <div className="color-price">
                              <div className="color-option">
                                   <span className="color">Colour:</span>
                                   <div className="circles">
                                        <span class="color-circle blue active" id="blue"></span>
                                        <span class="color-circle pink " id="pink"></span>
                                        <span class="color-circle yellow " id="yellow"></span>
                                   </div>
                              </div>
                         </div>
                         <br />
                         <p>Description : </p>
                         <p>{product.description}</p>
                         <div class="quantity-control">
                              <p>Quantity : </p>
                              <button class="quantity-btn" id="decrease" onClick={() => setQuantity(prevQuantity => prevQuantity - 1)}>-</button>
                              <input
                                   type="number"
                                   name="quantity"
                                   id="quantity-input"
                                   value={quantity}
                                   onChange={(e) => setQuantity(e.target.value)}
                                   disabled
                              />
                              <button class="quantity-btn" id="increase" onClick={() => setQuantity(prevQuantity => prevQuantity + 1)}>+</button>
                         </div>
                         <div className="button">
                              <div className="button-layer"></div>
                              <button>Add To Cart</button>
                         </div>
                    </div>
               </div>
               <Footer />
          </>
     );
}
