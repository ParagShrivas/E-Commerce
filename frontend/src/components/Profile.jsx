import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../css_file/profile.css'
import Navbar from '../components/Navbar'
import CheckAuth from '../components/CheckAuth'
import Footer from '../components/Footer'
import Dash_Alert from '../components/Dash_Alert'

export default function Profile() {
     CheckAuth();
     const [users, setUsers] = useState([])
     const email = localStorage.getItem('email');
     const user_id = localStorage.getItem('user_id');
     const [orderedProducts, setOrderedProducts] = useState([]);
     const [detail, setDetails] = useState(true);
     const [orders, setOrders] = useState(false);
     const [security, setSecurity] = useState(false);
     const [address, setAddress] = useState(false);
     const [loading, setLoading] = useState(false);
     const [CurrentPassword, setCurrentPassword] = useState('');
     const [NewPassword, setNewPassword] = useState('');
     const [NewPassword2, setNewPassword2] = useState('');
     const [showConfirm, setShowConfirm] = useState(false);
     const [alert, setAlert] = useState(null);
     const navigate = useNavigate();

     const showAlert = (message) => {
          setAlert({ msg: message });
          setTimeout(() => {
               setAlert(null);
          }, 5000);
     };

     //change password
     const save = async (e) => {
          e.preventDefault();

          // Input validation
          if (NewPassword !== NewPassword2) {
               showAlert("New passwords do not match.");
               return;
          }

          const UserData = { email, CurrentPassword, NewPassword, NewPassword2 };

          setLoading(true);
          try {
               const response = await fetch('https://e-commerce-backend-m4ra.onrender.com/login/change_password', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(UserData),
               });

               const result = await response.json();
               if (response.ok) {
                    setLoading(false)
                    showAlert(result.message);
               } else {
                    setLoading(false)
                    showAlert(result.message || 'An error occurred. Please try again.');
                    console.error('Failed:', result.message);
               }
          } catch (error) {
               setLoading(false)
               console.error('Error during password change:', error);
               showAlert('An unexpected error occurred. Please try again later.');
          }
     };

     //user data
     useEffect(() => {
          fetch(`https://e-commerce-backend-m4ra.onrender.com/users/data/${email}`)
               .then((response) => response.json())
               .then((data) => {
                    if (Array.isArray(data)) {
                         setUsers(data);
                    } else {
                         console.error('Expected an array but got:', data);
                         setUsers([]);
                    }
               })
               .catch((error) => console.error('Error fetching users:', error));
     }, [email], []);

     useEffect(() => {
          if (users.length > 0) {
               const user = users[0];
               document.title = `${user.fname} ${user.lname}'s Profile`;
          }
     }, [users]);

     // Fetch order data
     useEffect(() => {
          const fetchOrderedProducts = async () => {
               try {
                    const response = await fetch(`https://e-commerce-backend-m4ra.onrender.com/orders`, {
                         method: 'POST',
                         body: JSON.stringify({ user_id }),
                         headers: {
                              'Content-Type': 'application/json',
                         },
                    });

                    if (!response.ok) {
                         console.error('Error fetching products:', response.statusText);
                         return;
                    }

                    const data = await response.json();

                    if (data.success && Array.isArray(data.data)) {
                         setOrderedProducts(data.data);
                    } else {
                         console.error('Unexpected response format:', data);
                    }
               } catch (error) {
                    console.error('Error fetching products:', error.message);
               }
          };

          if (user_id) { // Ensure user_id exists before making the call
               fetchOrderedProducts();
          }
     }, [user_id]);



     const handleDetails = () => {
          setDetails(true)
          setSecurity(false)
          setAddress(false)
     }

     const handleSecurity = () => {
          setSecurity(true)
          setDetails(false)
          setAddress(false)
          setOrders(false);
     }

     const handleAddress = () => {
          setAddress(true)
          setOrders(false);
          setDetails(false)
          setSecurity(false)
     }

     const handleOrder = () => {
          setOrders(true);
          setAddress(false)
          setDetails(false)
          setSecurity(false)
     }

     const handleConfirmLogout = () => {
          localStorage.removeItem('token')
          localStorage.removeItem('email')
          localStorage.removeItem('user_id')

          setLoading(true)
          setTimeout(() => {
               navigate('/')
          }, 1000);
     }

     return (
          <>
               <Navbar />
               <Dash_Alert alert={alert} />
               {loading && (
                    <div className="overlay">
                         <div className="loader"></div>
                    </div>
               )}
               {showConfirm && (
                    <div className="overlay">
                         <div className="confirm-popup">
                              <h4>Confirm
                                   <i className="fa-solid fa-xmark cross" onClick={() => { setShowConfirm(false) }}></i>
                              </h4>
                              <p>
                                   <i className="fa-solid fa-triangle-exclamation"></i>
                                   Are you sure you want to Logout
                              </p>
                              <button className="con-btn" onClick={handleConfirmLogout}>
                                   Yes
                              </button>
                              <button 
                                   className="con-btn" id='No' onClick={() => setShowConfirm(false)}>
                                   No
                              </button>
                         </div>
                    </div>
               )}
               <h2>Your Account</h2>
               <div className="profile">
                    <div className="profile-option has-scrollbar">
                         <div className="name" onClick={handleDetails}>
                              <button>
                                   <h4>
                                        <span><i class="far fa-hand-peace"></i> Hello,</span><br />
                                   </h4>
                                   <strong>
                                        {users.map((user, index) => (
                                             <p key={index}>{user.fname} {user.lname}</p>
                                        ))}
                                   </strong>
                              </button>
                         </div>
                         <div className="order " onClick={handleOrder}>
                              <button>
                                   {/* <i class="fas fa-es"></i> */}
                                   <h4>Your Order</h4>
                                   <p>Track,Return or Buy Again</p>
                              </button>
                         </div>
                         <div className="security " onClick={handleSecurity}>
                              <button>
                                   <h4>Security</h4>
                                   <p>Change Password</p>
                              </button>
                         </div>
                         <div className="address " onClick={handleAddress}>
                              <button>
                                   <h4>Your Address</h4>
                                   <p>Edit address for orders and gifts</p>
                              </button>
                         </div>
                         <div className="payment ">
                              <button>
                                   <h4>Payment Options</h4>
                                   <p>Edit or add payment methods</p>
                              </button>
                         </div>
                    </div>
               </div>
               {/* profile details */}
               {detail && (
                    <div className="profile">
                         <div className="profile-details">
                              <div className="form">
                                   <div className="photo-container">
                                        <div className='img-area'>
                                             <img src="/img/profile.png" alt="" />
                                        </div>
                                        <div className='profile-buttons'>
                                             <button className='logout-btn' onClick={() => setShowConfirm(true)}>
                                                  <i className="fa-solid fa-right-from-bracket"></i>
                                                  <h4>Logout</h4>
                                             </button>
                                             <button className='edit-btn'>
                                                  <i class="fa-solid fa-pencil"></i>
                                                  <h4>Edit</h4>
                                             </button>
                                        </div>
                                   </div>
                                   <div className="product-form">
                                        <span className="circle one"></span>
                                        <span className="circle two"></span>

                                        <form autoComplete="off">
                                             <h3 className="title">Profile</h3>

                                             <div className="input-container focus">
                                                  <input
                                                       type="text"
                                                       name="first_name"
                                                       className="input "
                                                       value={users.map((user) => user.fname)}
                                                  // onChange={(e) => setProductName(e.target.value)}                                                       
                                                  />
                                                  <label>First Name</label>
                                                  <span>First Name</span>
                                             </div>
                                             <div className="input-container focus">
                                                  <input
                                                       type="text"
                                                       name="last_name"
                                                       className="input "
                                                       value={users.map((user) => user.lname)}
                                                  // onChange={(e) => setProductName(e.target.value)}                                                       
                                                  />
                                                  <label>Last Name</label>
                                                  <span>Last Name</span>
                                             </div>

                                             <div className="input-container focus">
                                                  <input
                                                       type="text"
                                                       name="email"
                                                       className="input "
                                                       value={users.map((user) => user.email)}
                                                  // onChange={(e) => setProductName(e.target.value)}                                                       
                                                  />
                                                  <label>Email </label>
                                                  <span>Email</span>
                                             </div>

                                             <div className="input-container focus">
                                                  <input
                                                       type="text"
                                                       name="mobile_no."
                                                       className="input "
                                                       value={users.map((user) => "+91 " + user.phone_no)} disabled
                                                  // onChange={(e) => setProductName(e.target.value)}                                                       
                                                  />
                                                  <label>Mobile Number </label>
                                                  <span>Mobile Number</span>
                                             </div>

                                             <div className="input-container focus">
                                                  <select
                                                       name="category"
                                                       className="input"
                                                  // value={category}
                                                  // onChange={(e) => setCategory(e.target.value)}
                                                  >
                                                       <option style={{ backgroundColor: '#000' }} value="" >Select Category</option>
                                                       <option style={{ backgroundColor: '#000' }} value="electronics">Male</option>
                                                       <option style={{ backgroundColor: '#000' }} value="fashion">Female</option>
                                                       <option style={{ backgroundColor: '#000' }} value="fashion">Other</option>
                                                  </select>
                                                  <label>Gender</label>
                                                  <span>Gender</span>
                                             </div>

                                             <button type="submit" className="btn">Save</button>
                                        </form>
                                   </div>
                              </div>
                         </div>
                    </div>
               )}

               {/* security passwords */}
               {security && (
                    <><h4 className='profile'>Change Password</h4>
                         <div className="profile security" >
                              <form onSubmit={save} className="form profile-details">
                                   <p>Current Password : </p>
                                   <input className='pass-input' type="text" name="" id="" required
                                        onChange={(e) => setCurrentPassword(e.target.value)} />
                                   <p>New Password : </p>
                                   <input className='pass-input' type="text" name="" id="" required
                                        onChange={(e) => setNewPassword(e.target.value)} />
                                   <p>Re-Enter New Password : </p>
                                   <input className='pass-input' type="password" name="" id="" required
                                        onChange={(e) => setNewPassword2(e.target.value)} />
                                   <button type='submit' className='save-button'>Save</button>
                              </form>
                         </div>
                    </>
               )}

               {/* address */}
               {address && (
                    <div className="Address">
                         <form action="" className='address-form'>
                              <h3>Your Address</h3>
                              <span>First Name</span>
                              <input
                                   type="text"
                                   name="first_name"
                                   className="address-input"
                                   value={users.map((user) => user.fname)}
                                   disabled
                              />
                              <span>Last Name</span>
                              <input
                                   type="text"
                                   name="last_name"
                                   className="address-input"
                                   value={users.map((user) => user.lname)}
                                   disabled
                              />
                              <span style={{ marginLeft: '-37%' }}>Street Address</span>
                              <textarea
                                   type="text"
                                   name="street_add"
                                   className="address-input"
                              />
                              <span style={{ marginLeft: '-46%' }}>City</span>
                              <input
                                   type="text"
                                   name="city"
                                   className="address-input"
                              />
                              <span style={{ marginRight: '2%' }}>Contact</span>
                              <input
                                   type="text"
                                   name="contact"
                                   className="address-input"
                              />
                              <span style={{ marginRight: '3%' }}>Gender</span>
                              <span>
                                   <input style={{ marginLeft: '20%' }}
                                        type="radio"
                                        name="gender"
                                        className="address-input"
                                   />
                                   <p>male</p>
                                   <input style={{ marginLeft: '20%' }}
                                        type="radio"
                                        name="gender"
                                        className="address-input"
                                   />
                                   <p>female</p>
                              </span>
                              <span style={{ marginRight: '2%' }}>Zip Code</span>
                              <input
                                   type="number"
                                   name="contact"
                                   className="address-input"
                              />
                         </form>
                    </div>
               )}

               {/* orders */}
               {orders && (
                    <div className="Cart">
                         <div className="cart-title">
                              <h3>Your Orders</h3>
                         </div>
                         {orderedProducts && orderedProducts.length === 0 ? (
                              <div className="cart-not-found-container">
                                   <img className="shopping-img" src="/img/shopping.png" alt="Shopping" />
                                   <h2 className="shopping-message">Uh-oh, No Order Found</h2>
                                   <Link to="/" className="home-link">
                                        Shop Now
                                   </Link>
                              </div>
                         ) : (
                              <div className="cartItems">
                                   {orderedProducts &&
                                        orderedProducts.map((product, index) => (
                                             <div key={index} className="cartItem">
                                                  <Link
                                                       to={`/product/detail/${product.product_id}/${encodeURIComponent(product.product_name)}`}
                                                       target="_blank"
                                                       className="link"
                                                  >
                                                       <div className="main-images">
                                                            <img
                                                                 className="img active"
                                                                 src={`https://e-commerce-backend-m4ra.onrender.com/products/${product.photoname}`}
                                                                 alt={product.product_name}
                                                            />
                                                       </div>
                                                  </Link>
                                                  <div className="product-order-info">
                                                       <p className="product-name">
                                                            {product.product_name.length > 25
                                                                 ? product.product_name.slice(0, 25) + '...'
                                                                 : product.product_name}
                                                       </p>
                                                       <p className="product-price">₹ {product.total_amount?.toLocaleString('en-IN') || 0}.00</p>
                                                       <p className="product-status">
                                                            <i className="fa-solid fa-circle"></i> {product.status}
                                                       </p>
                                                       <p className="product-review">
                                                            <i className="fas fa-star"></i> Rate & Review Product
                                                       </p>
                                                  </div>

                                             </div>
                                        ))}
                              </div>
                         )}
                    </div>
               )}

               <br />
               <Footer />
          </>
     )
}
