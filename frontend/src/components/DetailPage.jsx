import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css_file/ProductDetails.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Dash_Alert from '../components/Dash_Alert'

export default function DetailPage() {
     const { id } = useParams(); // Get the product ID from the route
     const [quantity, setQuantity] = useState(1);
     const [product, setProduct] = useState(null); // Store product data
     const [relatedProduct, setRelatedProduct] = useState([]); // Store related product data
     const [error, setError] = useState(false);    // Store error state
     const [likedProducts, setLikedProducts] = useState({});
     const email = localStorage.getItem('email');
     const user_id = localStorage.getItem('user_id');
     const [alert, setAlert] = useState(null);
     const containerRef = useRef(null); // Use a ref to target the product container

     const showAlert = (message) => {
          setAlert({ msg: message });
          setTimeout(() => {
               setAlert(null);
          }, 5000);
     };

     useEffect(() => {
          // Fetch product details by ID
          const fetchProduct = async () => {
               try {
                    const response = await fetch(`https://e-commerce-backend-m4ra.onrender.com/products/detail/${id}`);
                    if (!response.ok) {
                         throw new Error('Product not found');
                    }
                    const data = await response.json();
                    setProduct(data);
               } catch (error) {
                    setError(true); // Set error state if there's an issue
               }
          };

          //fetch wishlist
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
          fetchProduct();
     }, [id, email]);

     // Set the title when this component is rendered
     useEffect(() => {
          if (product) {
               document.title = product.product_name + " | Dreammall.com";

               //fetch related products by category
               const fetchRelatedProduct = async () => {
                    try {
                         const response = await fetch(`https://e-commerce-backend-m4ra.onrender.com/products/related_products/${product.category}`);
                         if (!response.ok) {
                              throw new Error('Products not found');
                         }
                         const data = await response.json();
                         setRelatedProduct(data);
                    } catch (error) {
                         setError(true); // Set error state if there's an issue
                    }
               };
               fetchRelatedProduct();
          }

     }, [product]);

     // Render 404 page if error occurs
     if (error) {
          return (
               <div className="not-found-container">
                    <h1 className="error-code">404</h1>
                    <h2 className="error-message">Page Not Found</h2>
                    <p>Uh-oh, something went wrong!</p>
                    <Link to="/" className="home-link">
                         Go back to Homepage
                    </Link>
               </div>
          );
     }

     if (!product) {
          return (
               <div className="overlay">
                    <div className="loader"></div>
               </div>
          )
     }

     if (quantity < 1 || quantity > 10) {
          setQuantity(1);
     }

     const toggleLike = (id) => {
          setLikedProducts((prev) => ({
               ...prev,
               [id]: !prev[id],
          }));

          const isLiked = !likedProducts[id];
          const wishlist = async () => {
               try {
                    const response = await fetch(`https://e-commerce-backend-m4ra.onrender.com/wishlist/${email}/${id}`, {
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

     // Function to handle scrolling left
     const scrollLeft = () => {
          containerRef.current.scrollBy({
               left: -300, // Adjust this value for scroll distance
               behavior: 'smooth'
          });
     };

     // Function to handle scrolling right
     const scrollRight = () => {
          containerRef.current.scrollBy({
               left: 300, // Adjust this value for scroll distance
               behavior: 'smooth'
          });
     };

     //Function to handle to Add to cart 
     const AddToCart = async () => {
          try {
               const response = await fetch(`https://e-commerce-backend-m4ra.onrender.com/cart/addToCart`, {
                    method: 'POST',
                    body: JSON.stringify({
                         user_id,
                         product_id: id,
                         quantity
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
          <>
               <Navbar />
               <Dash_Alert alert={alert} />
               <div className='product_page'>
                    <i
                         className={likedProducts[id] ? 'bx bxs-heart like-btn' : 'bx bx-heart like-btn'}
                         onClick={() => toggleLike(id)}
                         style={{ color: likedProducts[id] ? 'red' : 'black' }} // Change color based on liked status
                    ></i>
                    <img src={`https://e-commerce-backend-m4ra.onrender.com/products/${product.photoname}`} alt={product.name} />
                    <div className="product_details">
                         <p>{product.product_name}</p>
                         <div className="stars">
                              {/* Add your rating display logic here */}
                              <i className='bx bxs-star' ></i>
                              <i className='bx bxs-star' ></i>
                              <i className='bx bxs-star' ></i>
                              <i className='bx bxs-star' ></i>
                              <i className='bx bx-star' ></i>
                         </div>
                         <div className="price">
                              <h3>₹ {product.price}</h3>
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
                         </div>
                         <br />
                         <p>Description : </p>
                         <p>{product.description}</p>
                         <div class="quantity-control">
                              <p>Quantity : </p>
                              <button class="quantity-btn" id="decrease" onClick={() => setQuantity(prevQuantity => prevQuantity - 1)}>-</button>
                              <input
                                   type="number"
                                   name="quantity"
                                   id="quantity-input"
                                   value={quantity}
                                   onChange={(e) => setQuantity(e.target.value)}
                                   disabled
                              />
                              <button class="quantity-btn" id="increase" onClick={() => setQuantity(prevQuantity => prevQuantity + 1)}>+</button>
                         </div>
                         <div className="button">
                              <div className="button-layer"></div>
                              <button onClick={AddToCart}>Add To Cart</button>
                         </div>
                    </div>
               </div>
               {/*- RELATED PRODUCT*/}
               <div className="home-container ">
                    <h3 style={{ color: '#545352' }}>Related Products</h3>
                    <br />
                    <div className="featured-products" data-aos="fade-up">
                         <button className="scroll-button left" onClick={scrollLeft}>
                              &#10094;
                         </button> {/* Left scroll button */}

                         <div className='category-item-container has-scrollbar' ref={containerRef}>
                              {relatedProduct.map((product) => (
                                   <Link
                                        to={`/product/detail/${product.product_id}/${encodeURIComponent(product.product_name)}`}
                                        target='_blank'
                                        className='link'
                                        key={product.product_id}  // Key moved here for better performance
                                   >
                                        <div className="product-card">
                                             <div className="logo-cart">
                                                  <img src="/images/Logo.png" alt="logo" className='img' />
                                                  <i
                                                       className={likedProducts[product.product_id] ? 'bx bxs-heart' : 'bx bx-heart'}
                                                       onClick={() => toggleLike(product.product_id)}
                                                       style={{ color: likedProducts[product.product_id] ? 'red' : 'black' }}
                                                  ></i>
                                             </div>
                                             <div className="main-images">
                                                  <img className="img active" src={`https://e-commerce-backend-m4ra.onrender.com/products/${product.photoname}`} alt={product.name} />
                                             </div>
                                             <div className="product-details">
                                                  <span className="product_name">{product.product_name.slice(0, 20) + '...'}</span>
                                                  <p>{product.description.slice(0, 60) + '...'}</p>
                                                  <div className="stars">
                                                       <i className='bx bxs-star' ></i>
                                                       <i className='bx bxs-star' ></i>
                                                       <i className='bx bxs-star' ></i>
                                                       <i className='bx bxs-star' ></i>
                                                       <i className='bx bx-star' ></i>
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
                                                  <button>Add To Cart</button>
                                             </div>
                                        </div>
                                   </Link>
                              ))}
                         </div>

                         <button className="scroll-button right" onClick={scrollRight}>
                              &#10095;
                         </button> {/* Right scroll button */}
                    </div>
               </div>

               <Footer />
          </>
     );
}
