import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import '../css_file/order.css';
import Dash_Alert from '../components/Dash_Alert';
import { PropagateLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

export default function Order() {
     const [selectedOption, setSelectedOption] = useState('');
     const [cartItems, setCartItems] = useState([]);
     const [alert, setAlert] = useState(null);
     const user_id = localStorage.getItem('user_id');
     const email = localStorage.getItem('email');
     const navigate = useNavigate();

     const handleRadio = (e) => {
          setSelectedOption(e.target.value);
     }
     const showAlert = (message) => {
          setAlert({ msg: message });
          setTimeout(() => {
               setAlert(null);
          }, 5000);
     };

     // Fetch cart data
     useEffect(() => {
          const fetchCartItems = async () => {
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
                         setCartItems(data.data);
                    } else {
                         console.error('Expected an array but got:', data);
                         showAlert('Failed to load cart products.');
                    }
               } catch (error) {
                    console.error('Error fetching products:', error);
                    showAlert('Error fetching cart products. Please try again later.');
               }
          };

          fetchCartItems();
     }, [user_id]);

     // Calculate the total cart amount
     const calculateTotalAmount = () => {
          return cartItems.reduce((total, product) => {
               return total + (product.price * product.quantity);
          }, 0);
     };

     const [formData, setFormData] = useState({
          firstName: '',
          lastName: '',
          email: '',
          street: '',
          city: '',
          zip: '',
          state: '',
          phone: '',
     });

     // Handle input changes
     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({
               ...prevData,
               [name]: value,
          }));
     };

     const [loading, setLoading] = useState(false); // Add loading state

     const handlePlaceOrder = async (e) => {
          e.preventDefault(); // Prevent page refresh
          const products = cartItems.map(item => ({
               productId: item.product_id,
               quantity: item.quantity,
               totalAmount: item.price * item.quantity, // Calculating total amount for each product
          }));

          const userId = user_id;
          const paymentMethod = "COD"
          setLoading(true); // Start loading

          try {
               const response = await fetch('http://localhost:1500/place_order/', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                         userId,
                         products,
                         billingAddress: formData,
                         paymentMethod,
                         recipientEmail: email
                    }),
               });

               const data = await response.json();
               if (response.ok) {
                    setTimeout(() => {
                         setLoading(false); // End loading state
                         showAlert('Order placed successfully!');
                    }, 2000);
                    navigate('/thanks_page', { state: { orderNumber: data.orderIds } });
               } else {
                    console.error('Order placement failed:', data.message);
                    showAlert(`Order placement failed: ${data.message}`); // Show error message to user
               }
          } catch (error) {
               console.error('Error placing order:', error);
               showAlert('An error occurred while placing the order. Please try again.'); // User feedback on error
          }
     };

     return (
          <>
               <Navbar />
               <Dash_Alert alert={alert} />
               <div className='order_page'>
                    {loading && (
                         <div className="overlay">
                              <PropagateLoader />
                         </div>
                    )}
                    {/* Address */}
                    <div className="address">
                         <h3>Delivery information</h3>
                         <span>
                              <input type="text" name="firstName" placeholder="First name" value={formData.firstName} onChange={handleChange} required />
                              <input type="text" name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleChange} required />
                         </span><br />
                         <input type="email" name="email" id='email' placeholder="Email" value={formData.email} onChange={handleChange} required /><br />
                         <span>
                              <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} required />
                              <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                              <input type="number" name="zip" placeholder="Zip Code" value={formData.zip} onChange={handleChange} required />
                              <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
                         </span><br />
                         <input type="number" name="phone" id='ph_number' placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                    </div>

                    {/* Cart Total */}
                    <div className='total_amount'>
                         <h3>Cart Total</h3>
                         <div className='amount'>
                              <p>Subtotal </p>
                              <p>₹{calculateTotalAmount().toLocaleString('en-IN')}.00</p>
                         </div>
                         <hr style={{ width: '100%', margin: '10px auto', border: '1px solid #382b2b' }} />
                         <div className='amount'>
                              <p>DeliveryFee</p>
                              <p>₹00</p>
                         </div>
                         <hr style={{ width: '100%', margin: '10px auto', border: '1px solid #382b2b' }} />
                         <div className='amount'>
                              <b>Total </b>
                              <b>₹{calculateTotalAmount().toLocaleString('en-IN')}.00</b>
                         </div>
                         <h3>Payment Method</h3>
                         <div className="payment-option">
                              <label className="custom-radio">
                                   <input
                                        type="radio"
                                        value="COD"
                                        checked={selectedOption === 'COD'}
                                        onChange={handleRadio}
                                   />
                                   <span className="radio-circle"></span>
                                   COD (Cash On Delivery)
                                   <img
                                        src="/img/cod.png"
                                        alt="Payment Logo"
                                        width="40px"
                                        height="30px"
                                        style={{ marginLeft: '10px', verticalAlign: 'middle' }} // Add spacing and align with text
                                   />
                              </label>
                              <label className="custom-radio">
                                   <input
                                        type="radio"
                                        value="UPI"
                                        checked={selectedOption === 'UPI'}
                                        onChange={handleRadio}
                                   />
                                   <span className="radio-circle"></span>
                                   UPI (Paytm, GPay, PhonePe...)
                                   <img
                                        src="/img/payment_logo.png"
                                        alt="Payment Logo"
                                        width="100px"
                                        height="30px"
                                        style={{ marginLeft: '10px', verticalAlign: 'middle' }} // Add spacing and align with text
                                   />
                              </label>

                              <label className="custom-radio">
                                   <input
                                        type="radio"
                                        value="Card"
                                        checked={selectedOption === 'Card'}
                                        onChange={handleRadio}
                                   />
                                   <span className="radio-circle"></span>
                                   CREDIT/DEBIT CARD
                                   <img
                                        src="/img/card.png"
                                        alt="Payment Logo"
                                        width="100px"
                                        height="20px"
                                        style={{ marginLeft: '10px', verticalAlign: 'middle' }} // Add spacing and align with text
                                   />
                                   <img
                                        src="/img/rupay.png"
                                        alt="Payment Logo"
                                        width="80px"
                                        height="35px"
                                        style={{ marginLeft: '10px', verticalAlign: 'middle' }} // Add spacing and align with text
                                   />
                              </label>
                         </div>

                         <div className="buy-now">
                              <div className="button">
                                   <div className="button-layer"></div>
                                   <button onClick={handlePlaceOrder}>Place Order</button>
                              </div>
                         </div>
                    </div>
               </div>
               <Footer />
          </>
     )
}
