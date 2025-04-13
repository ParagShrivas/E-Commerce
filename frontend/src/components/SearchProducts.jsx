import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import '../css_file/searchProducts.css';

export default function SearchProducts() {
     const [searchParams] = useSearchParams();
     const searchQuery = searchParams.get('q');
     const [searchProducts, setSearchProducts] = useState([]);
     const [likedProducts, setLikedProducts] = useState({});
     const email = localStorage.getItem('email');
     const today = new Date();
     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
     const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

     // Add 5 days to the current date
     const futureDate = new Date(today);
     futureDate.setDate(today.getDate() + 5);

     const futureDayName = days[futureDate.getDay()]; // Get the day name for the future date
     const futureMonth = months[futureDate.getMonth()]; // Get the month name for the future date
     const futureDay = futureDate.getDate();

     const formattedFutureDate = `${futureDayName}, ${futureDay} ${futureMonth}`;

     useEffect(() => {
          const searchResult = async () => {
               try {
                    const response = await fetch(`https://e-commerce-backend-m4ra.onrender.com/products/search_products/${searchQuery}`);
                    const data = await response.json();

                    if (Array.isArray(data)) {
                         setSearchProducts(data);
                    } else {
                         console.error('Expected an array but got:', data);
                         setSearchProducts([]); // Clear products if data is not an array
                    }
               } catch (error) {
                    console.error('Error fetching products:', error);
               }
          };

          if (searchQuery) {
               searchResult();
          }
     }, [searchQuery]);

     useEffect(() => {
          const fetchWishlist = async () => {
               try {
                    const response = await fetch(`https://e-commerce-backend-m4ra.onrender.com/wishlist/userLike/${email}`);
                    const data = await response.json();
                    if (Array.isArray(data)) {
                         const likedProductsMap = {};
                         data.forEach(product => {
                              likedProductsMap[product.product_id] = true;
                         });
                         setLikedProducts(likedProductsMap);
                    } else {
                         console.error('Expected an array but got:', data);
                    }
               } catch (error) {
                    console.error('Error fetching products:', error);
               }
          };

          fetchWishlist();
     }, [email]);

     const toggleLike = (product_id) => {
          setLikedProducts((prev) => ({
               ...prev,
               [product_id]: !prev[product_id],
          }));

          const isLiked = !likedProducts[product_id];
          const wishlist = async () => {
               try {
                    const response = await fetch(`https://e-commerce-backend-m4ra.onrender.com/wishlist/${email}/${product_id}`, {
                         method: 'POST',
                         body: JSON.stringify({ liked: isLiked }), // Include the liked status if necessary
                         headers: {
                              'Content-Type': 'application/json',
                         },
                    });
                    if (!response.ok) {
                         console.error('Error updating wishlist:', response.statusText);
                    }
               } catch (error) {
                    console.error('Error fetching products:', error);
               }
          };

          wishlist();
     };

     return (
          <div>
               <Navbar />
               <div className="search-results-container">
                    <p>Search Results for : {searchQuery}</p><br />
                    <div className="featured-products" data-aos="fade-up">
                         {searchProducts.length > 0 ? (
                              searchProducts.map((product) => (
                                   <div className="product-card" key={product.id}>
                                        <div className="logo-cart">
                                             <img src="images/Logo.png" alt="logo" className='img' />
                                             <i
                                                  className={likedProducts[product.product_id] ? 'bx bxs-heart' : 'bx bx-heart'}
                                                  onClick={() => toggleLike(product.product_id)}
                                                  style={{ color: likedProducts[product.product_id] ? 'red' : 'black' }} // Change color based on liked status
                                             ></i>
                                        </div>
                                        <Link to={`/product/detail/${product.product_id}/${encodeURIComponent(product.product_name)}`}
                                             target='_blank' className='link'>
                                             <div className="main-images">
                                                  <img className="img active" src={`https://e-commerce-backend-m4ra.onrender.com/products/${product.photoname}`} alt={product.name} />
                                             </div>
                                        </Link>
                                        <div className="product-details">
                                             <span className="product_name">{product.product_name.slice(0, 20) + '...'}</span>
                                             <p>{product.description.slice(0, 60) + '...'}</p>
                                             <div className="stars">
                                                  <i class='bx bxs-star' ></i>
                                                  <i class='bx bxs-star' ></i>
                                                  <i class='bx bxs-star' ></i>
                                                  <i class='bx bxs-star' ></i>
                                                  <i class='bx bx-star' ></i>
                                             </div>
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
                                             <div className="price">
                                                  <span className="price_num">₹{product.price}</span>
                                             </div>
                                        </div>
                                        <p className='delivery-date'>
                                             <i class="fa-solid fa-truck"></i>
                                             Standard Delivery by {formattedFutureDate}
                                        </p>
                                   </div>
                              ))
                         ) : (
                              <p>No products found for "{searchQuery}".</p>
                         )}
                    </div>
               </div>
               <Footer />
          </div>
     );
}
