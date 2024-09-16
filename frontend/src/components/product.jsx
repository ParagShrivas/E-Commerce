import React, { useEffect } from 'react'
import '../css_file/product.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Product() {
     useEffect(() => {
          AOS.init({
               duration: 1000
          })
     }, [])

     return (
          <div>
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
                    {/*
      - PRODUCT
    */}
                    <div className="home-container">
                         <h3 style={{ color: '#545352' }}>Featured Products</h3><br />
                         <div className="featured-products" data-aos="fade-up">
                              <a href="/">
                                   <div class="product-card">
                                        <div class="logo-cart">
                                             <img src="images/Logo.png" alt="logo" className='img' />
                                             <i class='bx bx-heart'></i>
                                        </div>
                                        <div class="main-images">
                                             <img id="blue" class="img blue active" src="img/blue.png" alt="shoes" style={{transform: 'rotate(18deg)'}}/>
                                        </div>
                                        <div class="product-details">
                                             <span class="product_name">ADDIDAS GAZE ZX</span>
                                             <p>Lorem ipsum dolor sit lorenm i amet, consectetur adipisicing elit. Eum, ea, ducimus!</p>
                                             <div class="stars">
                                                  <i class='bx bxs-star' ></i>
                                                  <i class='bx bxs-star' ></i>
                                                  <i class='bx bxs-star' ></i>
                                                  <i class='bx bxs-star' ></i>
                                                  <i class='bx bx-star' ></i>
                                             </div>
                                        </div>
                                        <div class="color-price">
                                             <div class="color-option">
                                                  <span class="color">Colour:</span>
                                                  <div class="circles">
                                                       <span class="color-circle blue active" id="blue"></span>
                                                       <span class="color-circle pink " id="pink"></span>
                                                       <span class="color-circle yellow " id="yellow"></span>
                                                  </div>
                                             </div>
                                             <div class="price">
                                                  <span class="price_num">₹2,999</span>
                                             </div>
                                        </div>
                                        <div class="button">
                                             <div class="button-layer"></div>
                                             <button>Add To Cart</button>
                                        </div>
                                   </div></a>
                              <div class="product-card">
                                   <div class="logo-cart">
                                        <img src="images/Logo.png" alt="logo" className='img' />
                                        <i class='bx bx-heart'></i>
                                   </div>
                                   <div class="main-images">
                                        <img id="" class="img active" src="images/jacket.jpg" alt="jacket" />
                                   </div>
                                   <div class="product-details">
                                        <span class="product_name">MEN JACKET</span>
                                        <p>Lorem ipsum dolor sit lorenm i amet, consectetur adipisicing elit. Eum, ea, ducimus!</p>
                                        <div class="stars">
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bx-star' ></i>
                                        </div>
                                   </div>
                                   <div class="color-price">
                                        <div class="color-option">
                                             <span class="color">Colour:</span>
                                             <div class="circles">
                                                  <span class="color-circle blue active" id="blue"></span>
                                                  <span class="color-circle pink " id="pink"></span>
                                                  <span class="color-circle yellow " id="yellow"></span>
                                             </div>
                                        </div>
                                        <div class="price">
                                             <span class="price_num">₹999</span>
                                        </div>
                                   </div>
                                   <div class="button">
                                        <div class="button-layer"></div>
                                        <button>Add To Cart</button>
                                   </div>
                              </div>
                              <div class="product-card">
                                   <div class="logo-cart">
                                        <img src="images/Logo.png" alt="logo" className='img' />
                                        <i class='bx bx-heart'></i>
                                   </div>
                                   <div class="main-images">
                                        <img class="img active" src="images/jewellery.jpg" alt="jewellery" />
                                   </div>
                                   <div class="product-details">
                                        <span class="product_name">ROSE GOLD EARINGS</span>
                                        <p>Lorem ipsum dolor sit lorenm i amet, consectetur adipisicing elit. Eum, ea, ducimus!</p>
                                        <div class="stars">
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bx-star' ></i>
                                        </div>
                                   </div>
                                   <div class="color-price">
                                        <div class="color-option">
                                             <span class="color">Colour:</span>
                                             <div class="circles">
                                                  <span class="color-circle blue active" id="blue"></span>
                                                  <span class="color-circle pink " id="pink"></span>
                                                  <span class="color-circle yellow " id="yellow"></span>
                                             </div>
                                        </div>
                                        <div class="price">
                                             <span class="price_num">₹499</span>
                                        </div>
                                   </div>
                                   <div class="button">
                                        <div class="button-layer"></div>
                                        <button>Add To Cart</button>
                                   </div>
                              </div>
                              <div class="product-card">
                                   <div class="logo-cart">
                                        <img src="images/Logo.png" alt="logo" className='img' />
                                        <i class='bx bx-heart'></i>
                                   </div>
                                   <div class="main-images">
                                        <img class="img active" src="images/watch.jpg" alt="watch" style={{weight:'50px',height:'160px',padding:'15px'}}/>
                                   </div>
                                   <div class="product-details">
                                        <span class="product_name">LUXURY WATCH FOR MEN</span>
                                        <p>Lorem ipsum dolor sit lorenm i amet, consectetur adipisicing elit. Eum, ea, ducimus!</p>
                                        <div class="stars">
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bx-star' ></i>
                                        </div>
                                   </div>
                                   <div class="color-price">
                                        <div class="color-option">
                                             <span class="color">Colour:</span>
                                             <div class="circles">
                                                  <span class="color-circle blue active" id="blue"></span>
                                                  <span class="color-circle pink " id="pink"></span>
                                                  <span class="color-circle yellow " id="yellow"></span>
                                             </div>
                                        </div>
                                        <div class="price">
                                             <span class="price_num">₹1999</span>
                                        </div>
                                   </div>
                                   <div class="button">
                                        <div class="button-layer"></div>
                                        <button>Add To Cart</button>
                                   </div>
                              </div>
                              <div class="product-card">
                                   <div class="logo-cart">
                                        <img src="images/Logo.png" alt="logo" className='img' />
                                        <i class='bx bx-heart'></i>
                                   </div>
                                   <div class="main-images">
                                        <img class="img active" src="images/White_Top.png" alt="top" />
                                   </div>
                                   <div class="product-details">
                                        <span class="product_name">GIRLS WHITE TOP </span>
                                        <p>Lorem ipsum dolor sit lorenm i amet, consectetur adipisicing elit. Eum, ea, ducimus!</p>
                                        <div class="stars">
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bx-star' ></i>
                                        </div>
                                   </div>
                                   <div class="color-price">
                                        <div class="color-option">
                                             <span class="color">Colour:</span>
                                             <div class="circles">
                                                  <span class="color-circle blue active" id="blue"></span>
                                                  <span class="color-circle pink " id="pink"></span>
                                                  <span class="color-circle yellow " id="yellow"></span>
                                             </div>
                                        </div>
                                        <div class="price">
                                             <span class="price_num">₹399</span>
                                        </div>
                                   </div>
                                   <div class="button">
                                        <div class="button-layer"></div>
                                        <button>Add To Cart</button>
                                   </div>
                              </div>
                              <div class="product-card">
                                   <div class="logo-cart">
                                        <img src="images/Logo.png" alt="logo" className='img' />
                                        <i class='bx bx-heart'></i>
                                   </div>
                                   <div class="main-images">
                                        <img class="img active" src="images/shoes.jpg" alt="shoes" />
                                   </div>
                                   <div class="product-details">
                                        <span class="product_name">MEN'S FORMAL SHOES</span>
                                        <p>Lorem ipsum dolor sit lorenm i amet, consectetur adipisicing elit. Eum, ea, ducimus!</p>
                                        <div class="stars">
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bx-star' ></i>
                                        </div>
                                   </div>
                                   <div class="color-price">
                                        <div class="color-option">
                                             <span class="color">Colour:</span>
                                             <div class="circles">
                                                  <span class="color-circle blue active" id="blue"></span>
                                                  <span class="color-circle pink " id="pink"></span>
                                                  <span class="color-circle yellow " id="yellow"></span>
                                             </div>
                                        </div>
                                        <div class="price">
                                             <span class="price_num">₹699</span>
                                        </div>
                                   </div>
                                   <div class="button">
                                        <div class="button-layer"></div>
                                        <button>Add To Cart</button>
                                   </div>
                              </div>
                              <div class="product-card">
                                   <div class="logo-cart">
                                        <img src="images/Logo.png" alt="logo" className='img' />
                                        <i class='bx bx-heart'></i>
                                   </div>
                                   <div class="main-images">
                                        <img class="img active" src="images/heals.jpg" alt="shoes" style={{padding:'30px',width:'190px'}}/>
                                   </div>
                                   <div class="product-details">
                                        <span class="product_name">LOW PUMP HEALS</span>
                                        <p>Lorem ipsum dolor sit lorenm i amet, consectetur adipisicing elit. Eum, ea, ducimus!</p>
                                        <div class="stars">
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bx-star' ></i>
                                        </div>
                                   </div>
                                   <div class="color-price">
                                        <div class="color-option">
                                             <span class="color">Colour:</span>
                                             <div class="circles">
                                                  <span class="color-circle blue active" id="blue"></span>
                                                  <span class="color-circle pink " id="pink"></span>
                                                  <span class="color-circle yellow " id="yellow"></span>
                                             </div>
                                        </div>
                                        <div class="price">
                                             <span class="price_num">₹599</span>
                                        </div>
                                   </div>
                                   <div class="button">
                                        <div class="button-layer"></div>
                                        <button>Add To Cart</button>
                                   </div>
                              </div>
                              <div class="product-card">
                                   <div class="logo-cart">
                                        <img src="images/Logo.png" alt="logo" className='img' />
                                        <i class='bx bx-heart'></i>
                                   </div>
                                   <div class="main-images">
                                        <img class="img active" src="images/hoodie.jpg" alt="shoes" style={{padding:'35px',height:'190px',marginTop:'-10px'}}/>
                                   </div>
                                   <div class="product-details">
                                        <span class="product_name">MEN'S FORMAL SHOES</span>
                                        <p>Lorem ipsum dolor sit lorenm i amet, consectetur adipisicing elit. Eum, ea, ducimus!</p>
                                        <div class="stars">
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bxs-star' ></i>
                                             <i class='bx bx-star' ></i>
                                        </div>
                                   </div>
                                   <div class="color-price">
                                        <div class="color-option">
                                             <span class="color">Colour:</span>
                                             <div class="circles">
                                                  <span class="color-circle blue active" id="blue"></span>
                                                  <span class="color-circle pink " id="pink"></span>
                                                  <span class="color-circle yellow " id="yellow"></span>
                                             </div>
                                        </div>
                                        <div class="price">
                                             <span class="price_num">₹699</span>
                                        </div>
                                   </div>
                                   <div class="button">
                                        <div class="button-layer"></div>
                                        <button>Add To Cart</button>
                                   </div>
                              </div>
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
               </main>
          </div>
     )
}
