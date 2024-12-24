import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom';
import '../css_file/thanks_page.css';
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

export default function Thanks_page() {

     const user_id = localStorage.getItem('user_id');
     const location = useLocation();
     const { orderNumber } = location.state || {};

     return (
          <div className='thanks_page'>
               {
                    <Fireworks autorun={{ speed: 5, delay: 500, duration: 1500 }} />
               }
               <div className="cart-not-found-container">
                    <img className="shopping-img" src="/img/shopping.png" alt="" />
                    <h2 className="shopping-message">Thank you for your purchase</h2>
                    <p>We will deliver your order within 5-7 days.</p>
                    <p>Your Order number is #{orderNumber ? orderNumber.join(', #') : 'N/A'}</p>
                    <Link to="/" className="home-link">
                         Continue Shopping
                    </Link>
               </div>
          </div>
     )
}
