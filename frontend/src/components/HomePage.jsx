import React, { useState, useEffect } from "react";
import "../css_file/HomePage.css";
import Logo from './Logo';
import Navbar from "./Navbar";
import Product from "./product";
import Footer from "./Footer";

const HomePage = () => {
     const [rotate, setRotate] = useState(0);
     const [active, setActive] = useState(1);
     const [hide, setHide] = useState(0);
     const [positionColor, setPositionColor] = useState(0);

     useEffect(() => {
          document.title = "Dream Mall";
     });

     const list = [
          {
               src: "img/slider_images/1.png",
               title: "Apple MacBook Air M2",
               price: "Starting at ₹89,999/-"
          },
          {
               src: "img/slider_images/2.png",
               title: "Comfortable Chair & sofa",
               price: "Starting at ₹8,999/-"
          },
          {
               src: "img/slider_images/3.png",
               title: '43" & Above 4k Smart TV',
               price: "Starting at ₹15,999/-"
          },
          {
               src: "img/slider_images/4.png",
               title: 'Samsung Galaxy S23',
               price: "Starting at ₹44,999/-"
          },
          {
               src: "img/slider_images/5.png",
               title: 'Nike Shoes',
               price: "Starting at ₹1,999/-"
          }
     ];

     const arrayColor = ['#82B9BA', '#F5C069', '#C47EAA', '#9989D0'];

     useEffect(() => {
          activeItem();
     });

     const activeItem = () => {
          const rotateElement = document.querySelector('.bg-rotate');
          rotateElement.style.transform = `rotate(${rotate}deg)`;
          rotateElement.style.backgroundColor = arrayColor[positionColor];

          let remove_hide_active = hide - 1 < 0 ? list.length - 1 : hide - 1;

          document.querySelectorAll('.list .item')[remove_hide_active].classList.remove('hide');
          document.querySelectorAll('.list .item')[remove_hide_active].classList.remove('active');

          document.querySelectorAll('.list .item')[hide].classList.add('hide');
          document.querySelectorAll('.list .item')[active].classList.add('active');

          document.getElementById('next').style.pointerEvents = 'none';
          setTimeout(() => {
               document.getElementById('next').style.pointerEvents = 'unset';
          }, 1700);
     };

     const handlePrevClick = () => {
          setRotate(rotate - 100);
          setPositionColor((positionColor - 1 + arrayColor.length) % arrayColor.length);
          setHide(active);
          setActive((active - 1 + list.length) % list.length);
     };

     const handleNextClick = () => {
          setRotate(rotate + 100);
          setPositionColor((positionColor + 1) % arrayColor.length);
          setHide(active);
          setActive((active + 1) % list.length);
     };


     return (
          <>
               <Navbar />
               <div className="slider_container">
                    <div className="background-rotate">
                         <div className="bg-rotate"></div>
                    </div>

                    <div className="list">
                         {list.map((item, index) => (
                              <div key={index} className={`item ${index === active ? 'active' : ''} ${index === hide ? 'hide' : ''}`}>
                                   <div className="images">
                                        <div className="item_img">
                                             <img src={item.src.replace(/\d+/, index + 2)} alt="" className='img' />
                                        </div>
                                        <div className="item_img">
                                             <img src={item.src} alt="" className='img' />
                                        </div>
                                   </div>
                                   <div className="home-content">
                                        <img src={item.src.replace(/\d+/, index + 1)} alt="" className='img' />
                                        <div className="text">
                                             <h1>{item.title}</h1>
                                             <h3>{item.price}</h3>
                                             <p>*Inclusive of all other Offers</p>
                                             <input type="submit" value="Shop now" className="shop-btn" />
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>

                    <div className="menu">
                         <ul>
                              <li id="prev" onClick={handlePrevClick}>
                                   <i className="fa-solid fa-arrow-left"></i>
                              </li>
                              <li id="next" onClick={handleNextClick}>
                                   <i className="fa-solid fa-arrow-right"></i>
                              </li>
                         </ul>
                    </div>
               </div>
               <Logo />
               <Product />
               <Footer />
          </>
     );
};

export default HomePage;
