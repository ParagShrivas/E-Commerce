import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import '../css_file/wishlist.css';
import Dash_Alert from './Dash_Alert';
import Navbar from './Navbar';
import CheckAuth from './CheckAuth';
import Footer from './Footer';

export default function Wishlist() {
     CheckAuth();
     const [products, setProducts] = useState([]);
     const [likedProducts, setLikedProducts] = useState({});
     const [alert, setAlert] = useState(null);
     const email = localStorage.getItem('email')
     const user_id = localStorage.getItem('user_id');

     useEffect(() => {
          const fetchProducts = async () => {
               try {
                    const response = await fetch(`https://e-commerce-backend-m4ra.onrender.com/wishlist/${email}`);
                    const data = await response.json();
                    if (Array.isArray(data)) {
                         setProducts(data);
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

          fetchProducts();
     }, []);

     //toggle like
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

     useEffect(() => {
          document.title = "My Wishlist";
     });

     const showAlert = (message) => {
          setAlert({ msg: message });
          setTimeout(() => setAlert(null), 3000);
     };

     const AddToCart = async (product_id) => {
          try {
               const response = await fetch(`https://e-commerce-backend-m4ra.onrender.com/cart/addToCart`, {
                    method: 'POST',
                    body: JSON.stringify({
                         user_id,
                         product_id
                    }),
                    headers: {
                         'Content-Type': 'application/json',
                    },
               });

               const data = await response.json();

               if (!response.ok) {
                    console.error('Error Adding Product to cart:', data.message);
                    showAlert(data.message); // Display server message if any issue
               } else {
                    showAlert('Product added to cart successfully!');
               }
          } catch (error) {
               console.error('Error :', error);
          }
     }

     return (
          <><Navbar />
               <div className='wishlist'>
                    <Dash_Alert alert={alert} />
                    <h4>My Wishlist </h4>
                    <div className="featured-products" data-aos="fade-up">
                         {products.map((product) => (
                              <div className="product-card" key={product.id}>
                                   <div className="logo-cart">
                                        <img src="/images/Logo.png" alt="logo" className='img' />
                                        <i
                                             className={likedProducts[product.product_id] ? 'bx bxs-heart' : 'bx bx-heart'}
                                             onClick={() => toggleLike(product.product_id)}
                                             style={{ color: likedProducts[product.product_id] ? 'red' : 'black' }}
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
                                             <i className='bx bxs-star'></i>
                                             <i className='bx bxs-star'></i>
                                             <i className='bx bxs-star'></i>
                                             <i className='bx bxs-star'></i>
                                             <i className='bx bx-star'></i>
                                        </div>
                                   </div>
                                   <div className="color-price">
                                        <div className="color-option">
                                             <span className="color">Colour:</span>
                                             <div className="circles">
                                                  <span className="color-circle blue active" id="blue"></span>
                                                  <span className="color-circle pink" id="pink"></span>
                                                  <span className="color-circle yellow" id="yellow"></span>
                                             </div>
                                        </div>
                                        <div className="price">
                                             <span className="price_num">₹{product.price}</span>
                                        </div>
                                   </div>
                                   <div className="button">
                                        <div className="button-layer"></div>
                                        <button onClick={() => AddToCart(product.product_id)}>Add To Cart</button>
                                   </div>
                              </div>
                         ))}
                    </div>

               </div>
               <Footer/>
          </>
     );
}
