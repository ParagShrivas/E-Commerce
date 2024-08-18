import React from 'react';
import '../css_file/navbar.css';

export default function Navbar() {

     return (
          <div className="navbar">
               <nav className="nav">
                    <div className="logo">
                         <i className='bx bxs-shopping-bag'></i>
                         <strong><span>Dream mall</span></strong>
                    </div>

                    <div className="searchbar">
                         <div className="search">
                              <input type="text" placeholder="Search" />
                         </div>

                         <button className="search-btn">
                              <i className='bx bx-search'></i>
                         </button>
                    </div>

                    <div className="menu-toggle">
                         <i className='bx bx-menu'></i>
                    </div>

                    <div className="icons">
                         <div className="icon search-icon">
                              <i className='bx bx-search'></i>
                         </div>

                         <div className="icon">
                              <i className='bx bxs-user'></i>
                              <span>User</span>
                         </div>

                         <div className="icon">
                              <i className='bx bxs-heart'></i>
                              <span>Wishlist</span>
                         </div>

                         <div className="icon">
                              <i className='bx bxs-cart-alt'></i>
                              <span>My Cart</span>
                         </div>
                    </div>
               </nav>
          </div>
     );
}
