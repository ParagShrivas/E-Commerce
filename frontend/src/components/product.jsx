import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css_file/product.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Dash_Alert from '../components/Dash_Alert';

export default function Product() {

     const [products, setProducts] = useState([]);
     const [likedProducts, setLikedProducts] = useState({});
     const email = localStorage.getItem('email');
     const user_id = localStorage.getItem('user_id');
     const [alert, setAlert] = useState(null);

     const showAlert = (message) => {
          setAlert({ msg: message });
          setTimeout(() => {
               setAlert(null);
          }, 5000);
     };

     useEffect(() => {
          const fetchWishlist = async () => {
               try {
                    const response = await fetch(`http://localhost:1500/wishlist/userLike/${email}`);
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
                    const response = await fetch(`http://localhost:1500/wishlist/${email}/${product_id}`, {
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
          const fetchProducts = async () => {
               try {
                    const response = await fetch('http://localhost:1500/products');
                    const data = await response.json();
                    if (Array.isArray(data)) {
                         setProducts(data);
                    } else {
                         console.error('Expected an array but got:', data);
                    }
               } catch (error) {
                    console.error('Error fetching products:', error);
               }
          };

          fetchProducts();
     }, []);

     useEffect(() => {
          AOS.init({
               duration: 1000
          })
     }, [])

     const AddToCart = async (product_id) => {
          try {
               const response = await fetch(`http://localhost:1500/cart/addToCart`, {
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
          <div>
               <Dash_Alert alert={alert} />
               <main>
                    {/*- CATEGORY*/}
                    <div className="category" data-aos="fade-left">
                         <div className="home-container">
                              <div className="category-item-container has-scrollbar">
                                   <div className="category-item">
                                        <div className="category-img-box">
                                             <img src="./images/icons/dress.svg" alt="dress & frock" width={30} />
                                        </div>
                                        <div className="category-content-box">
                                             <div className="category-content-flex">
                                                  <h3 className="category-item-title">Dress &amp; frock</h3>
                                                  <p className="category-item-amount">(53)</p>
                                             </div>
                                             <a href="#" className="category-btn">Show all</a>
                                        </div>
                                   </div>
                                   <div className="category-item">
                                        <div className="category-img-box">
                                             <img src="./images/icons/coat.svg" alt="winter wear" width={30} />
                                        </div>
                                        <div className="category-content-box">
                                             <div className="category-content-flex">
                                                  <h3 className="category-item-title">Winter wear</h3>
                                                  <p className="category-item-amount">(58)</p>
                                             </div>
                                             <a href="#" className="category-btn">Show all</a>
                                        </div>
                                   </div>
                                   <div className="category-item">
                                        <div className="category-img-box">
                                             <img src="./images/icons/glasses.svg" alt="glasses & lens" width={30} />
                                        </div>
                                        <div className="category-content-box">
                                             <div className="category-content-flex">
                                                  <h3 className="category-item-title">Glasses &amp; lens</h3>
                                                  <p className="category-item-amount">(68)</p>
                                             </div>
                                             <a href="#" className="category-btn">Show all</a>
                                        </div>
                                   </div>
                                   <div className="category-item">
                                        <div className="category-img-box">
                                             <img src="./images/icons/shorts.svg" alt="shorts & jeans" width={30} />
                                        </div>
                                        <div className="category-content-box">
                                             <div className="category-content-flex">
                                                  <h3 className="category-item-title">Shorts &amp; jeans</h3>
                                                  <p className="category-item-amount">(84)</p>
                                             </div>
                                             <a href="#" className="category-btn">Show all</a>
                                        </div>
                                   </div>
                                   <div className="category-item">
                                        <div className="category-img-box">
                                             <img src="./images/icons/tee.svg" alt="t-shirts" width={30} />
                                        </div>
                                        <div className="category-content-box">
                                             <div className="category-content-flex">
                                                  <h3 className="category-item-title">T-shirts</h3>
                                                  <p className="category-item-amount">(35)</p>
                                             </div>
                                             <a href="#" className="category-btn">Show all</a>
                                        </div>
                                   </div>
                                   <div className="category-item">
                                        <div className="category-img-box">
                                             <img src="./images/icons/jacket.svg" alt="jacket" width={30} />
                                        </div>
                                        <div className="category-content-box">
                                             <div className="category-content-flex">
                                                  <h3 className="category-item-title">Jacket</h3>
                                                  <p className="category-item-amount">(16)</p>
                                             </div>
                                             <a href="#" className="category-btn">Show all</a>
                                        </div>
                                   </div>
                                   <div className="category-item">
                                        <div className="category-img-box">
                                             <img src="./images/icons/watch.svg" alt="watch" width={30} />
                                        </div>
                                        <div className="category-content-box">
                                             <div className="category-content-flex">
                                                  <h3 className="category-item-title">Watch</h3>
                                                  <p className="category-item-amount">(27)</p>
                                             </div>
                                             <a href="#" className="category-btn">Show all</a>
                                        </div>
                                   </div>
                                   <div className="category-item">
                                        <div className="category-img-box">
                                             <img src="./images/icons/hat.svg" alt="hat & caps" width={30} />
                                        </div>
                                        <div className="category-content-box">
                                             <div className="category-content-flex">
                                                  <h3 className="category-item-title">Hat &amp; caps</h3>
                                                  <p className="category-item-amount">(39)</p>
                                             </div>
                                             <a href="#" className="category-btn">Show all</a>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
                    {/*- PRODUCT*/}
                    <div className="home-container">
                         <h3 style={{ color: '#545352' }}>Featured Products</h3>
                         <br />
                         <div className="featured-products" data-aos="fade-up">
                              {products.map((product) => (
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
                                                  <img className="img active" src={`http://localhost:1500/products/${product.photoname}`} alt={product.name} />
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
                                        <div className="button">
                                             <div className="button-layer"></div>
                                             <button onClick={() => AddToCart(product.product_id)}>Add To Cart</button>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>
                    {/* deal of the day */}
                    <div className="home-container">
                         <h3 style={{ color: '#545352' }}>Deal Of The Day</h3><br />
                         <div className="deal-day" data-aos="fade-up">
                              <div class="deal-container">
                                   <div class="box one">
                                        <div class="details">
                                             <div class="topic">Description</div>
                                             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque consequatur corporis vitae nobis, ut veniam earum expedita eaque at placeat perferendis unde voluptates explicabo rerum distinctio quis, illo, porro et?</p>
                                             <div class="rating">
                                                  <i class="fas fa-star"></i>
                                                  <i class="fas fa-star"></i>
                                                  <i class="fas fa-star"></i>
                                                  <i class="fas fa-star"></i>
                                                  <i class="far fa-star"></i>
                                             </div>
                                             <div class="price-box">
                                                  <div class="discount">₹1,80,000</div>
                                                  <div class="price">₹1,50,000</div>
                                             </div>
                                        </div>
                                        <div class="button1">
                                             <button>Add To Cart</button>
                                        </div>
                                   </div>
                                   <div class="box two">
                                        <div class="image-box">
                                             <div class="image">
                                                  <img src="images/camera.png" alt="" />
                                             </div>
                                             <div class="info">
                                                  <div class="brand">SONY</div>
                                                  <div class="name">SONY ALPHA A7 KIT</div>
                                                  <div class="shipping">FREE SHIPPING</div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                              <div class="deal-container">
                                   <div class="box one">
                                        <div class="details">
                                             <div class="topic">Description</div>
                                             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque consequatur corporis vitae nobis, ut veniam earum expedita eaque at placeat perferendis unde voluptates explicabo rerum distinctio quis, illo, porro et?</p>
                                             <div class="rating">
                                                  <i class="fas fa-star"></i>
                                                  <i class="fas fa-star"></i>
                                                  <i class="fas fa-star"></i>
                                                  <i class="fas fa-star"></i>
                                                  <i class="far fa-star"></i>
                                             </div>
                                             <div class="price-box">
                                                  <div class="discount">₹79,000</div>
                                                  <div class="price">₹75,000</div>
                                             </div>
                                        </div>
                                        <div class="button1">
                                             <button>Add To Cart</button>
                                        </div>
                                   </div>
                                   <div class="box two">
                                        <div class="image-box">
                                             <div class="image">
                                                  <img src="images/iphone16.png" alt="" style={{ width: '250px', height: '300px' }} />
                                             </div>
                                             <div class="info">
                                                  <div class="brand">APPLE</div>
                                                  <div class="name">APPLE IPHONE 16</div>
                                                  <div class="shipping">FREE SHIPPING</div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
                    {/* blog */}
                    <div className="blog" data-aos="fade-up">
                         <div className="home-container">
                              <div className="blog-container has-scrollbar">
                                   <div className="blog-card">
                                        <a href="#">
                                             <img src="./images/blog-1.jpg" alt="Clothes Retail KPIs 2021 Guide for Clothes Executives" width={300} className="blog-banner" />
                                        </a>
                                        <div className="blog-content">
                                             <a href="#" className="blog-category">Fashion</a>
                                             <a href="#">
                                                  <h3 className="blog-title">Clothes Retail KPIs 2021 Guide for Clothes Executives.</h3>
                                             </a>
                                             <p className="blog-meta">
                                                  By <cite>Mr Admin</cite> / <time dateTime="2022-04-06">Apr 06, 2022</time>
                                             </p>
                                        </div>
                                   </div>
                                   <div className="blog-card">
                                        <a href="#">
                                             <img src="./images/blog-2.jpg" alt="Curbside fashion Trends: How to Win the Pickup Battle." className="blog-banner" width={300} />
                                        </a>
                                        <div className="blog-content">
                                             <a href="#" className="blog-category">Clothes</a>
                                             <h3>
                                                  <a href="#" className="blog-title">Curbside fashion Trends: How to Win the Pickup Battle.</a>
                                             </h3>
                                             <p className="blog-meta">
                                                  By <cite>Mr Robin</cite> / <time dateTime="2022-01-18">Jan 18, 2022</time>
                                             </p>
                                        </div>
                                   </div>
                                   <div className="blog-card">
                                        <a href="#">
                                             <img src="./images/blog-3.jpg" alt="EBT vendors: Claim Your Share of SNAP Online Revenue." className="blog-banner" width={300} />
                                        </a>
                                        <div className="blog-content">
                                             <a href="#" className="blog-category">Shoes</a>
                                             <h3>
                                                  <a href="#" className="blog-title">EBT vendors: Claim Your Share of SNAP Online Revenue.</a>
                                             </h3>
                                             <p className="blog-meta">
                                                  By <cite>Mr Selsa</cite> / <time dateTime="2022-02-10">Feb 10, 2022</time>
                                             </p>
                                        </div>
                                   </div>
                                   <div className="blog-card">
                                        <a href="#">
                                             <img src="./images/blog-4.jpg" alt="Curbside fashion Trends: How to Win the Pickup Battle." className="blog-banner" width={300} />
                                        </a>
                                        <div className="blog-content">
                                             <a href="#" className="blog-category">Electronics</a>
                                             <h3>
                                                  <a href="#" className="blog-title">Curbside fashion Trends: How to Win the Pickup Battle.</a>
                                             </h3>
                                             <p className="blog-meta">
                                                  By <cite>Mr Pawar</cite> / <time dateTime="2022-03-15">Mar 15, 2022</time>
                                             </p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </main >
          </div >
     )
}
