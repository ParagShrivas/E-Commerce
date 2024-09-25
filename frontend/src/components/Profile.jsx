import React, { useEffect, useState } from 'react'
import '../css_file/profile.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Profile() {
     const [users, setUsers] = useState([])
     const email = localStorage.getItem('email');
     const [detail, setDetails] = useState(true);

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

     return (
          <>
               <Navbar />
               <h2>Your Account</h2>
               <div className="profile">
                    <div className="profile-option has-scrollbar">
                         <div className="name box">
                              <a href="">
                                   <h4>
                                        <span><i class="far fa-hand-peace"></i> Hello,</span><br />
                                   </h4>
                                   <strong>
                                        {users.map((user, index) => (
                                             <p key={index}>{user.fname} {user.lname}</p>
                                        ))}
                                   </strong>
                              </a>
                         </div>
                         <div className="order box">
                              <a href="">
                                   {/* <i class="fas fa-boxes"></i> */}
                                   <h4>Your Order</h4>
                                   <p>Track,Return or Buy Again</p>
                              </a>
                         </div>
                         <div className="security box">
                              <a href="">
                                   <h4>Security</h4>
                                   <p>Change Password</p>
                              </a>
                         </div>
                         <div className="address box">
                              <a href="">
                                   <h4>Your Address</h4>
                                   <p>Edit address for orders and gifts</p>
                              </a>
                         </div>
                         <div className="payment box">
                              <a href="">
                                   <h4>Payment Options</h4>
                                   <p>Edit or add payment methods</p>
                              </a>
                         </div>
                    </div>
               </div>
               {detail && (
                    <div className="profile">
                         <h4>Your Details</h4>
                         <div className="profile-details">
                              <p>First Name : </p>
                              <input type="text" name="" id="" value={users.map((user) => user.fname)} />
                              <p>Last Name : </p>
                              <input type="text" name="" id="" value={users.map((user) => user.lname)} /> 
                              <p>Email : </p>
                              <input type="email" name="" id="" value={users.map((user) => user.email)} />
                              <p>Mobile Number : </p>
                              <input type="text" name="" id="" value={users.map((user) => "+91 "+user.phone_no)} />
                         </div>
                    </div>
               )}
               <Footer />
          </>
     )
}
