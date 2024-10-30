import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Navbar from './Navbar';
import Footer from './Footer';
import '../css_file/Cart.css';
import Dash_Alert from '../components/Dash_Alert';

export default function Cart() {
     const [cartProducts, setCartProducts] = useState([]);
     const [alert, setAlert] = useState(null);
     const user_id = localStorage.getItem('user_id');

     const showAlert = (message) => {
          setAlert({ msg: message });
          setTimeout(() => {
               setAlert(null);
          }, 5000);
     };

     useEffect(() => {
          document.title = 'Shopping Cart | Dream mall';
     }, []);

     // Fetch cart data
     useEffect(() => {
          const fetchCartProducts = async () => {
               try {
                    const response = await fetch(`http://localhost:1500/cart/show`, {
                         method: 'POST',
                         body: JSON.stringify({ user_id }),
                         headers: {
                              'Content-Type': 'application/json',
                         },
                    });

                    if (!response.ok) {
                         console.error('Error fetching products:', response.message);
                         showAlert('Error fetching cart products. Please try again later.');
                         return;
                    }

                    const data = await response.json();
                    if (Array.isArray(data.data)) {
                         setCartProducts(data.data);
                    } else {
                         console.error('Expected an array but got:', data);
                         showAlert('Failed to load cart products.');
                    }
               } catch (error) {
                    console.error('Error fetching products:', error);
                    showAlert('Error fetching cart products. Please try again later.');
               }
          };

          fetchCartProducts();
     }, [user_id]);

     // Handle quantity changes for each product
     const handleQuantityChange = (product_id, newQuantity) => {
          // Update the local state with the new quantity
          setCartProducts((prevProducts) =>
               prevProducts.map((product) =>
                    product.product_id === product_id
                         ? { ...product, quantity: Math.max(1, newQuantity) } // Ensure quantity is at least 1
                         : product
               )
          );

          // Send updated quantity to the server
          if (newQuantity > 1) {
               const changeQuantity = async () => {
                    try {
                         const response = await fetch(`http://localhost:1500/cart/change_quantity`, {
                              method: 'POST',
                              body: JSON.stringify({ user_id, product_id, quantity: newQuantity }),
                              headers: {
                                   'Content-Type': 'application/json',
                              },
                         });

                         if (!response.ok) {
                              console.error('Error updating product quantity');
                              showAlert('Error updating product quantity. Please try again later.');
                         }
                    } catch (error) {
                         console.error('Error updating product quantity:', error);
                         showAlert('Error updating product quantity. Please try again later.');
                    }
               };
               changeQuantity();
               // Call the async function
          }
     };


     // Remove item from cart
     const removeFromCart = async (product_id) => {
          try {
               const response = await fetch(`http://localhost:1500/cart/remove`, {
                    method: 'DELETE',
                    body: JSON.stringify({ user_id, product_id }),
                    headers: {
                         'Content-Type': 'application/json',
                    },
               });
               if (response.ok) {
                    setCartProducts(cartProducts.filter(item => item.product_id !== product_id));
                    showAlert('Product removed from cart successfully.');
               } else {
                    showAlert('Failed to remove product from cart.');
               }
          } catch (error) {
               console.error('Error removing product:', error);
               showAlert('Error removing product. Please try again later.');
          }
     };

     // Calculate the total cart amount
     const calculateTotalAmount = () => {
          return cartProducts.reduce((total, product) => {
               return total + (product.price * product.quantity);
          }, 0);
     };

     return (
          <>
               <Navbar />
               <Dash_Alert alert={alert} />
               <div className="Cart">
                    <div className="cart-title">
                         <h3>Shopping Cart</h3>
                    </div>
                    {cartProducts.length === 0 ? (
                         <div className="cart-not-found-container">
                              <img className="shopping-img" src="/img/shopping.png" alt="" />
                              <h2 className="shopping-message">Uh-oh, Your Cart is Empty</h2>
                              <Link to="/" className="home-link">
                                   Continue Shopping
                              </Link>
                         </div>
                    ) : (
                         <div className="cartItems">
                              {cartProducts.map((product, index) => (
                                   <div key={index} className="cartItem">
                                        <Link to={`/product/detail/${product.product_id}/${encodeURIComponent(product.product_name)}`}
                                             target='_blank' className='link' style={{ width: '100px' }}>
                                             <div className="main-images">
                                                  <img className="img active" src={`http://localhost:1500/products/${product.photoname}`} alt={product.name} />
                                             </div>
                                        </Link>
                                        <div className="product-info">
                                             <p>{product.product_name}</p>
                                             <p> ₹ {product.price}.00</p>
                                             <span className='quant'>
                                                  <div className="quantity-control meter">
                                                       <button
                                                            className="quantity-btn"
                                                            id="decrease"
                                                            onClick={() => handleQuantityChange(product.product_id, product.quantity - 1)}
                                                       >
                                                            -
                                                       </button>
                                                       <input
                                                            type="number"
                                                            name="quantity"
                                                            id="quantity-input"
                                                            value={product.quantity}
                                                            onChange={(e) => handleQuantityChange(product.product_id, (e.target.value))}
                                                       />
                                                       <button
                                                            className="quantity-btn"
                                                            id="increase"
                                                            onClick={() => handleQuantityChange(product.product_id, product.quantity + 1)}
                                                       >
                                                            +
                                                       </button>
                                                  </div>
                                                  <button className='manage-btn'>
                                                       <i style={{ color: 'red' }} className="fa-regular fa-trash-can"
                                                            onClick={() => removeFromCart(product.product_id)}></i>
                                                  </button>
                                             </span>
                                        </div>
                                   </div>
                              ))}
                              {/* Total Amount Section */}
                              <div className="cart-total">
                                   <h4>Total Amount: ₹ {calculateTotalAmount()}.00</h4>
                              </div>

                              {/* Buy Now Button */}
                              <div className="buy-now">
                                   <div className="button">
                                        <div className="button-layer"></div>
                                        <button>Proceed to Buy</button>
                                   </div>
                              </div>
                         </div>
                    )}
               </div>
               <br />
               <Footer />
          </>
     );
}
