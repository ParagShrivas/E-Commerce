import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css_file/navbar.css';
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Navbar() {
     const [searchQuery, setSearchQuery] = useState('');
     const email = localStorage.getItem('email');
     const [name, setName] = useState('');
     const navigate = useNavigate();

     useEffect(() => {
          const fetchUserName = async () => {
               try {
                    const response = await fetch(`https://e-commerce-backend-m4ra.onrender.com/users/email/${email}`, {
                         method: 'GET'
                    });
                    const res = await response.json();
                    if (response.ok) {
                         setName(res.fname);
                         localStorage.setItem('user_id', res.user_id)
                    } else {
                         console.error('Error fetching name:', res.message);
                    }
               } catch (error) {
                    console.error('Error:', error);
               }
          };

          if (email) {
               fetchUserName();
          }
     }, [email]);

     useEffect(() => {
          AOS.init({
               duration: 1000
          })
     }, [])

     const handleSearch = async () => {
          if (searchQuery) {
               navigate(`/search?q=${searchQuery}`) //navigate to SearchProducts
          }
     }

     const handleKeyDown = (event) => {
          if (event.key === 'Enter') {
               handleSearch();
          }
     };

     return (
          <>
               <div className="navbar">
                    <nav className="nav">
                         <div className="brand-Logo">
                              <i className='bx bxs-shopping-bag'></i>
                              <strong><span>Dream mall</span></strong>
                         </div>

                         <div className="searchbar">
                              <div className="search">
                                   <input type="text" placeholder="Search"
                                        onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown} />
                                   <button className="search-btn">
                                        <i className='bx bx-search' onClick={() => handleSearch()}></i>
                                   </button>
                              </div>
                         </div>
                         <div className="menu-toggle">
                              <i className='bx bx-menu'></i>
                         </div>

                         <div className="icons">
                              <div className="icon search-icon">
                                   <i className='bx bx-search'></i>
                              </div>

                              <Link to='/user/profile' className='Link'>
                                   <div className="icon">
                                        <i class="fa-regular fa-user"></i>
                                        <span>{name ? name : "Login"}</span>
                                   </div>
                              </Link>

                              <Link to='/user/wishlist' className='Link'>
                                   <div className="icon">
                                        <i className='fa-regular fa-heart'></i>
                                        <span>Wishlist</span>
                                   </div>
                              </Link>

                              <Link to='/user/cart' className='Link'>
                                   <div className="icon">
                                        <i className='fas fa-shopping-cart'></i>
                                        <span>My Cart</span>
                                   </div>
                              </Link>
                         </div>
                    </nav>
               </div>
               <div className='down-menu'>
                    <li className='home-menu'>
                         HOME
                         <ul className='options'>
                              <li className='option'>
                                   <img src="/img/chair.png" alt="" width={'40px'} />
                                   Chair
                              </li>

                              <li className='option'>
                                   <i class="fa-solid fa-couch"></i>
                                   Sofa
                              </li>

                              <li className='option'>
                                   <img src="/img/bed.png" alt="" width={'45px'} />
                                   Bed
                              </li>
                         </ul>

                    </li>
                    <li><div class="category-menu">
                         <div class="select-btn">
                              <span class="sBtn-text">CATEGORIES</span>
                         </div>
                         <ul class="options">
                              <li class="option">
                                   <i class="fa-solid fa-headphones-simple" style={{ color: "#171515;" }}></i>
                                   <span class="option-text">Electronics</span>
                              </li>
                              <li class="option">
                                   <i class="fa-solid fa-shirt" style={{ color: "#E1306C;" }}></i>
                                   <span class="option-text">Fashion</span>
                              </li>
                              <li class="option">
                                   <img src="/img/shoes.png" alt="" width={'40px'} style={{ color: "#1DA1F2;" }} />
                                   <span class="option-text">Shoes</span>
                              </li>
                              <li class="option">
                                   <i class="fa-solid fa-motorcycle" style={{ color: "#0E76A8;" }}></i>
                                   <span class="option-text">Toys</span>
                              </li>
                              <li class="option">
                                   <i class="fa-solid fa-couch" style={{ color: "#1DA1F2;" }}></i>
                                   <span class="option-text">Furniture</span>
                              </li>
                         </ul>
                    </div>
                    </li>
                    <li className='men-menu'>
                         MEN'S
                         <ul className='options'>
                              <li className='option'>
                                   <i class="fa-solid fa-shirt" style={{ color: "#E1306C;" }}></i>
                                   T-shirt
                              </li>

                              <li className='option'>
                                   <img src="/img/jeans.png" alt="" width={'45px'} />
                                   Jeans
                              </li>

                              <li className='option'>
                                   <img src="/img/shoes.png" alt="" width={'45px'} style={{ color: "#1DA1F2;" }} />
                                   Shoes
                              </li>
                         </ul>
                    </li>
                    <li className='women-menu'>WOMEN'S
                         <ul className='options'>
                              <li className='option'>
                                   <img src="/img/dress.png" alt="" width={'40px'} />
                                   Dress
                              </li>

                              <li className='option'>
                                   <img src="/img/meakup.png" alt="" width={'40px'} />
                                   Meakup Kit
                              </li>

                              <li className='option'>
                                   <img src="/img/earing.png" alt="" width={'45px'} />
                                   Jewellery
                              </li>
                         </ul>
                    </li>
                    <li className='electronic-menu'>ELECTRONICS
                         <ul className='options'>
                              <li className='option'>
                                   <i class="fa-solid fa-mobile-screen-button"></i>
                                   Mobile
                              </li>

                              <li className='option'>
                                   <i class="fa-solid fa-laptop"></i>
                                   Laptop
                              </li>

                              <li className='option'>
                                   <i class="fa-solid fa-tv"></i>
                                   Smart TV
                              </li>
                              <li className='option'>
                                   <i class="fa-solid fa-headphones-simple"></i>
                                   Music Devices
                              </li>
                         </ul>
                    </li>
                    <li>SPORTS</li>
                    <li>OFFER</li>
               </div >
          </>
     );
}
