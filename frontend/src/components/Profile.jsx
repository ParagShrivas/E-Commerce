import React, { useEffect, useState } from 'react'
import '../css_file/profile.css'
import Navbar from '../components/Navbar'
import CheckAuth from '../components/CheckAuth'
import Footer from '../components/Footer'
import Dash_Alert from '../components/Dash_Alert'

export default function Profile() {
     CheckAuth();
     const [users, setUsers] = useState([])
     const email = localStorage.getItem('email');
     const [detail, setDetails] = useState(true);
     const [security, setSecurity] = useState(false);
     const [loading, setLoading] = useState(false);
     const [CurrentPassword, setCurrentPassword] = useState('');
     const [NewPassword, setNewPassword] = useState('');
     const [NewPassword2, setNewPassword2] = useState('');
     const [alert, setAlert] = useState(null);

     const showAlert = (message) => {
          setAlert({ msg: message });
          setTimeout(() => {
               setAlert(null);
          }, 5000);
     };

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
               const response = await fetch('http://localhost:1500/login/change_password', {
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


     useEffect(() => {
          fetch(`http://localhost:1500/users/data/${email}`)
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
               document.title = `${user.fname} ${user.lname} Profile`;
          }
     }, [users]);

     const handleDetails = () => {
          setDetails(true)
          setSecurity(false)
     }

     const handleSecurity = () => {
          setSecurity(true)
          setDetails(false)
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
                         <div className="order ">
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
                         <div className="address ">
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
                         <h4>Your Details</h4>
                         <div className="profile-details">
                              <p>First Name : </p>
                              <input type="text" name="" id="" value={users.map((user) => user.fname)} disabled />
                              <i className="fa-solid fa-pencil"></i>

                              <p>Last Name : </p>
                              <input type="text" name="" id="" value={users.map((user) => user.lname)} disabled />
                              <i className="fa-solid fa-pencil"></i>

                              <p>Email : </p>
                              <input type="email" name="" id="" value={users.map((user) => user.email)} disabled />
                              <i className="fa-solid fa-pencil"></i>

                              <p>Mobile Number : </p>
                              <input type="text" name="" id="" value={users.map((user) => "+91 " + user.phone_no)} disabled />
                              <i className="fa-solid fa-pencil"></i>
                         </div>
                    </div>
               )}

               {/* security passwords */}
               {security && (
                    <><h4 className='profile'>Change Password</h4>
                         <div className="profile security" >
                              <form onSubmit={save} className="form profile-details">
                                   <p>Current Password : </p>
                                   <input type="text" name="" id="" required
                                        onChange={(e) => setCurrentPassword(e.target.value)} />
                                   <p>New Password : </p>
                                   <input type="text" name="" id="" required
                                        onChange={(e) => setNewPassword(e.target.value)} />
                                   <p>Re-Enter New Password : </p>
                                   <input type="password" name="" id="" required
                                        onChange={(e) => setNewPassword2(e.target.value)} />
                                   <button type='submit' className='save-button'>Save</button>
                              </form>
                         </div>
                    </>
               )}
               <Footer />
          </>
     )
}
